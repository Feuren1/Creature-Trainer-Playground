import "./style.css";
import styles from "./main.module.css";
import { HealthBar } from "./components/battleUI/healthbar/healthbar.ts";
import { Application, Assets, Container, Renderer, Sprite } from "pixi.js";
import { Creature } from "./types/creature.ts";
import { Element } from "./types/element.ts";
import { io, Socket } from "socket.io-client";
import { BattleService } from "./services/battleService.ts";
import { BattleRenderer } from "./renderer/battleRenderer.ts";

const socket = io("http://localhost:3000");
const battleService: BattleService = new BattleService(socket);
let battleRenderer: BattleRenderer;
const battleLogText: string =
  "THIS IS A BATTLE LOG HE HIT FOR 100 DAMAGE OUCH!!";

const creaturesP1 = [
  "Salamander",
  "Terror",
  "Vulcanmut",
  "Salamander",
  "Salamander",
  "Salamander",
];

const creaturesP2 = [
  "Vulcanmut",
  "Terror",
  "Vulcanmut",
  "Terror",
  "Terror",
  "Terror",
];

const currentCreatureP1: Creature = {
  name: "Salamander",
  element: Element.FIRE,
  level: 50,
  attacks: [
    {
      name: "FireSpin",
      strength: 50,
      element: Element.FIRE,
      id: "",
    },
    {
      name: "TailWhip",
      strength: 50,
      element: Element.GRASS,
      id: "",
    },
    {
      name: "FireBreath",
      strength: 50,
      element: Element.FIRE,
      id: "",
    },
    {
      name: "FireStomp",
      strength: 70,
      element: Element.FIRE,
      id: "",
    },
  ],
  currentHp: 0,
};

const currentCreatureP2: Creature = {
  name: "Terror",
  element: Element.WATER,
  level: 50,
  attacks: [],
  currentHp: 0,
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */ `
<div id="container" class="${styles.container}"> 
<div id="mainContainer"class="${styles.mainContainer}">
<div class="${styles.player1Creatures}">
  <div class="${styles.teamContainerP1}">
    <div id="teamP1CreatureSymbol1" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP1CreatureSymbol2" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP1CreatureSymbol3" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP1CreatureSymbol4" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP1CreatureSymbol5" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP1CreatureSymbol6" class= "${styles.teamCreatureSymbol}"> </div>
  </div>
    <div class="${styles.creatureStatsContainer}">
    <div class="${styles.creatureNameLvlContainer}">
      <p id="creatureNamePlayer1" class="${styles.creatureName}"></p>
      <p id="creatureLevelPlayer1" class="${styles.creatureName}">LEVEL</p>
      </div>
      
        <div class="${styles.hpBarContainer}">
          <div id="healthBarPlayer1" class="${styles.healthBarPlayer1}"></div>
          <div id="creatureElementSymbolP1" class="${styles.typeSymbol}"></div>
        </div>
    </div>
</div>

<div class="${styles.player2Creatures}">
  <div class="${styles.teamContainerP2}">
    <div id="teamP2CreatureSymbol1" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP2CreatureSymbol2" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP2CreatureSymbol3" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP2CreatureSymbol4" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP2CreatureSymbol5" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP2CreatureSymbol6" class= "${styles.teamCreatureSymbol}"> </div>
  </div>
    <div class="${styles.creatureStatsContainer}">
    <div class="${styles.creatureNameLvlContainer}">
      <p id="creatureNamePlayer2" class="${styles.creatureName}"></p>
      <p id="creatureLevelPlayer2" class="${styles.creatureName}">LEVEL</p>
      </div>
        <div class="${styles.hpBarContainer}">
          <div id="healthBarPlayer2" class="${styles.healthBarPlayer1}"></div>
          <div id="creatureElementSymbolP2" class="${styles.typeSymbol}"></div>
        </div>
    </div>
</div>

<div id="creatureP1" class="${styles.player1Creature}">
</div>
<div id="creatureP2" class="${styles.player2Creature}">
</div>
<div class="${styles.battleLog}">
  <p id="batteLogP" class="${styles.batteLogP}"></p>
</div>
  <div class="${styles.actions}">
  </div>
    <div id="creatureAttack1" class="${styles.actionsAttack1}"></div>
    <div id="creatureAttack2" class="${styles.actionsAttack2}"></div>
    <div id="creatureAttack3" class="${styles.actionsAttack3}"></div>
    <div id="creatureAttack4" class="${styles.actionsAttack4}"></div>
    <div id="items" class="${styles.actionsInventory}">INVENTORY</div>
    <div id="options" class="${styles.options}">OPTIONS</div>
</div>
</div>
</div>
`;

document.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("mainContainer");
  if (!container) {
    console.error("Could not find #app div");
    return;
  }

  const { width, height } = container.getBoundingClientRect();

  const app = new Application();
  await app.init({
    width: width,
    height: height,
    background: "#1b1b1f",
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });
  battleRenderer = new BattleRenderer(app);
  container.appendChild(app.canvas);
  app.canvas.className = `${styles["pixi-canvas"]}`;
  const mainContainer = new Container();
  try {
    loadData();
    setAttacks();
    setLevel();
    
    battleRenderer.renderPlayerCreature("P1", currentCreatureP1);
    battleRenderer.renderPlayerCreature("P2", currentCreatureP2);
    battleRenderer.renderCreatureElementSymbol("P1", currentCreatureP1);
    battleRenderer.renderCreatureElementSymbol("P2", currentCreatureP2);
    battleRenderer.renderTeamCreatureSymbols("P1", creaturesP1);
    battleRenderer.renderTeamCreatureSymbols("P2", creaturesP2);
    app.stage.addChild(mainContainer);
    window.addEventListener("resize", () => battleRenderer.handleResize(app));

    
    
  } catch (error) {
    console.error("Failed to load asset:", error);
  }
});





/* Loads the data and injects it into the HTML elements
 */
function loadData() {
  const healthbarPlayer1 = HealthBar(50, 100);
  document.getElementById("healthBarPlayer1")?.appendChild(healthbarPlayer1);
  const healthbarPlayer2 = HealthBar(30, 100);
  document.getElementById("healthBarPlayer2")?.appendChild(healthbarPlayer2);

  const battleLogElement = document.getElementById("batteLogP");
  if (battleLogElement) {
    battleLogElement.innerText = battleLogText;
  }

  const creatureNamePlayer1Element = document.getElementById(
    "creatureNamePlayer1"
  );
  if (creatureNamePlayer1Element) {
    creatureNamePlayer1Element.textContent = currentCreatureP1.name;
  }

  const creatureNamePlayer2Element = document.getElementById(
    "creatureNamePlayer2"
  );
  if (creatureNamePlayer2Element) {
    creatureNamePlayer2Element.textContent = currentCreatureP2.name;
  }
  
}

function setAttacks() {
  const attack1 = document.getElementById("creatureAttack1");
  const attack2 = document.getElementById("creatureAttack2");
  const attack3 = document.getElementById("creatureAttack3");
  const attack4 = document.getElementById("creatureAttack4");
  if (attack1 && attack2 && attack3 && attack4) {
    attack1.textContent = currentCreatureP1.attacks[0].name;
    attack2.textContent = currentCreatureP1.attacks[1].name;
    attack3.textContent = currentCreatureP1.attacks[2].name;
    attack4.textContent = currentCreatureP1.attacks[3].name;
  }
    attack1?.addEventListener("click", () => {
      console.log("CLICKED")
      battleService.sendAttack(currentCreatureP1.attacks[0])
    })
    attack2?.addEventListener("click", () => {
      console.log("CLICKED")
      battleService.sendAttack(currentCreatureP1.attacks[1])
    })
    attack3?.addEventListener("click", () => {
      console.log("CLICKED")
      battleService.sendAttack(currentCreatureP1.attacks[2])
    })
    attack4?.addEventListener("click", () => {
      console.log("CLICKED")
      battleService.sendAttack(currentCreatureP1.attacks[3])
    })
}

function setLevel() {
  const creatureLevelp1 = document.getElementById("creatureLevelPlayer1");
  const creatureLevelp2 = document.getElementById("creatureLevelPlayer2");
  if (creatureLevelp1 && creatureLevelp2) {
    creatureLevelp1.textContent = "LEVEL " + currentCreatureP1.level.toString();
    creatureLevelp2.textContent = "LEVEL " + currentCreatureP1.level.toString();
  }
}
