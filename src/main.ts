import "./style.css";
import { AppState } from "./types/appState.ts";
import styles from "./main.module.css";
import { HealthBar } from "./components/battleUI/healthbar/healthbar.ts";
import { Application, Assets, Container, Renderer, Sprite } from "pixi.js";
import { rattleEffect } from "./animations/animations.ts";
import { Creature } from "./types/creature.ts";
import { Element } from "./types/element.ts";

const creaturesp1 = [
  "Salamander",
  "Salamander",
  "Salamander",
  "Salamander",
  "Salamander",
  "Salamander",
];

const currentCreatureP1: Creature = {
  name: "Salamander",
  element: Element.FIRE,
};

const currentCreatureP2: Creature = {
  name: "Salamander",
  element: Element.FIRE,
};

/* You could loop over an array and create these but for now its fine this way as it makes referencing them and
    swapping creatures easier for now */
document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */ `
<div id="container" class="${styles.container}"> 
<div id="mainContainer"class="${styles.mainContainer}">
<div class="${styles.player1Creatures}">
  <div class="${styles.teamContainer}">
  
    <div id="teamP1CreatureSymbol1" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP1CreatureSymbol2" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP1CreatureSymbol3" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP1CreatureSymbol4" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP1CreatureSymbol5" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP1CreatureSymbol6" class= "${styles.teamCreatureSymbol}"> </div>
  </div>
    <div class="${styles.creatureStatsContainer}">
      <p id="creatureNamePlayer1" class="${styles.creatureName}"></p>
        <div class="${styles.hpBarContainer}">
          <div id="healthBarPlayer1" class="${styles.healthBarPlayer1}"></div>
          <div id="creatureElementSymbolP1" class="${styles.typeSymbol}"></div>
        </div>
        <div class="column">LEVEL</div>
        <div class="column">TYPE</div>
    </div>
</div>

<div class="${styles.player2Creatures}">
  <div class="${styles.teamContainer}">
    <div id="teamP2CreatureSymbol1" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP2CreatureSymbol2" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP2CreatureSymbol3" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP2CreatureSymbol4" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP2CreatureSymbol5" class= "${styles.teamCreatureSymbol}"> </div>
    <div id="teamP2CreatureSymbol6" class= "${styles.teamCreatureSymbol}"> </div>
  </div>
    <div class="${styles.creatureStatsContainer}">
      <p id="creatureNamePlayer2" class="${styles.creatureName}"></p>
        <div class="${styles.hpBarContainer}">
          <div id="healthBarPlayer2" class="${styles.healthBarPlayer1}"></div>
          <div id="creatureElementSymbolP2" class="${styles.typeSymbol}"></div>
        </div>
        <div class="column">LEVEL</div>
        <div class="column">TYPE</div>
    </div>
</div>



<div id="creaturePlayerOne" class="${styles.player1Creature}">
  <div  class="column">CREATURE PLAYER 1</div>

</div>
<div id="creaturePlayerTwo" class="${styles.player2Creature}">
  <div class="column">CREATURE PLAYER 2</div>
</div>
<div class="${styles.battleLog}">
  <div class="column">BATTLE LOG</div>
</div>
<div class="${styles.actions}">
  <div class="column">ACTIONS</div>
</div>
</div>
</div>
`;

document.addEventListener("DOMContentLoaded", async function () {
  const healthbarPlayer1 = HealthBar(50, 100);
  document.getElementById("healthBarPlayer1")?.appendChild(healthbarPlayer1);
  const healthbarPlayer2 = HealthBar(30, 100);
  document.getElementById("healthBarPlayer2")?.appendChild(healthbarPlayer2);

  //I dont remember why I did it this way
  const currentCreatureNamePlayer1 = "Salamander";
  const creatureNamePlayer1Element = document.getElementById(
    "creatureNamePlayer1"
  );
  if (creatureNamePlayer1Element) {
    creatureNamePlayer1Element.textContent = currentCreatureNamePlayer1;
  }

  const currentCreatureNamePlayer2 = "Salamander";
  const creatureNamePlayer2Element = document.getElementById(
    "creatureNamePlayer2"
  );
  if (creatureNamePlayer2Element) {
    creatureNamePlayer2Element.textContent = currentCreatureNamePlayer2;
  }

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

  container.appendChild(app.canvas);
  app.canvas.className = `${styles["pixi-canvas"]}`;
  const mainContainer = new Container();
  try {
    const asset = await Assets.load("/public/BattleBackground.png"); // Verify path
    const logo = new Sprite(asset);
    logo.anchor.set(0.5);
    logo.label = "logo";
    logo.x = width / 2;
    logo.y = height / 2;
    logo.cursor = "pointer";
    logo.eventMode = "static";

    logo.on("pointerdown", () => {
      console.log("Sprite clicked!");
    });
    //mainContainer.addChild(logo);
    renderPlayerCreature(app);
    renderPlayerCreature(app);
    renderCreatureElementSymbol(app, "P1", currentCreatureP1);
    renderCreatureElementSymbol(app, "P2", currentCreatureP2);
    renderTeamCreatureSymbols(app, "P1", creaturesp1);
    renderTeamCreatureSymbols(app, "P2", creaturesp1);
    app.stage.addChild(mainContainer);
    window.addEventListener("resize", () => handleResize(app));
  } catch (error) {
    console.error("Failed to load asset:", error);
  }
});

async function renderCreatureElementSymbol(
  app: Application,
  player: "P1" | "P2",
  creature: Creature
) {
  const creatureSymbolContainer = new Container();
  const creatureSymbolDiv = document.getElementById(
    `creatureElementSymbol${player}`
  );
  if (!creatureSymbolDiv) {
    console.error("Could not find the creaturePlayerOne div");
    return;
  }
  const divRect = creatureSymbolDiv.getBoundingClientRect();
  creatureSymbolContainer.x = divRect.left;
  creatureSymbolContainer.y = divRect.top;

  try {
    const asset = await Assets.load(`/public/${creature.element}-icon.jpg`);
    const creatureSymbol = new Sprite(asset);

    creatureSymbol.x = 0;
    creatureSymbol.y = 0;
    creatureSymbol.width = divRect.width;
    creatureSymbol.height = divRect.height;

    creatureSymbolContainer.addChild(creatureSymbol);
    app.stage.addChild(creatureSymbolContainer);
  } catch (error) {
    console.error("Failed to load asset:", error);
  }
}

/* Write it so that you can pass the player aswell */
async function renderPlayerCreature(app: Application): Promise<void> {
  const creatureP1Container = new Container();
  const creatureP2Container = new Container();
  const creatureP1Div = document.getElementById("creaturePlayerOne");
  const creatureP2Div = document.getElementById("creaturePlayerTwo");
  if (!creatureP1Div || !creatureP2Div) {
    console.error("Could not find the creaturePlayerOne div");
    return;
  }

  const divRectP1 = creatureP1Div.getBoundingClientRect();
  const divRectP2 = creatureP2Div.getBoundingClientRect();

  creatureP1Container.x = divRectP1.left;
  creatureP1Container.y = divRectP1.top;
  creatureP2Container.x = divRectP2.left;
  creatureP2Container.y = divRectP2.top;

  try {
    const asset = await Assets.load("/public/Salamander.png");
    const creatureP1 = new Sprite(asset);
    const creatureP2 = new Sprite(asset);

    creatureP1.x = 0;
    creatureP1.y = 0;
    creatureP1.width = divRectP1.width;
    creatureP1.height = divRectP1.height;

    //creatureP2.anchor.set(0.5);
    creatureP2.x = 0;
    creatureP2.y = 0;
    creatureP2.width = divRectP2.width;
    creatureP2.height = divRectP2.height;
    //creatureP2.scale.x *= -1;

    creatureP1Container.addChild(creatureP1);
    creatureP2Container.addChild(creatureP2);
    app.stage.addChild(creatureP1Container);
    app.stage.addChild(creatureP2Container);
  } catch (error) {
    console.error("Failed to load asset:", error);
  }
}

function handleResize(app: Application<Renderer>): any {
  const container = document.getElementById("mainContainer");
  if (!container) return;

  const { width, height } = container.getBoundingClientRect();
  app.canvas.style.width = `${width}px`;
  app.canvas.style.height = `${height}px`;

  repositionPixiElements(app);
}

function repositionPixiElements(app: Application) {
  app.stage.children.forEach((container) => {
    if (container instanceof Container && container.children.length > 0) {
      const sprite = container.children[0] as Sprite;

      let targetDivId = "";
      if (sprite.label === "logo") targetDivId = "mainContainer";
      else if (
        sprite.texture.baseTexture.resource?.url?.includes("Salamander")
      ) {
        targetDivId =
          container.x < app.screen.width / 2
            ? "creaturePlayerOne"
            : "creaturePlayerTwo";
      } else if (
        sprite.texture.baseTexture.resource?.url?.includes("flame-icon")
      ) {
        targetDivId = "creatureSymbolP1";
      }

      if (targetDivId) {
        const targetDiv = document.getElementById(targetDivId);
        if (targetDiv) {
          const rect = targetDiv.getBoundingClientRect();
          container.x = rect.left;
          container.y = rect.top;
          sprite.width = rect.width;
          sprite.height = rect.height;
        }
      }
    }
  });
}

/*
@param pass either p1 or p2 for rendering player one or player two 
 */
async function renderTeamCreatureSymbols(
  app: Application,
  player: "P1" | "P2",
  creatures: string[]
): Promise<void> {
  for (let i = 0; i < 6; i++) {
    const container = new Container();
    const div = document.getElementById(`team${player}CreatureSymbol${i + 1}`);

    if (div) {
      const divRect = div.getBoundingClientRect();
      container.x = divRect.left;
      container.y = divRect.top;

      try {
        const asset = await Assets.load(`/public/${creatures[i]}.png`);
        const creatureP1 = new Sprite(asset);

        creatureP1.x = 0;
        creatureP1.y = 0;
        creatureP1.width = divRect.width;
        creatureP1.height = divRect.height;

        container.addChild(creatureP1);
        app.stage.addChild(container);
      } catch (error) {
        console.error("Failed to load asset:", error);
      }
    }
  }
}

function loadCreatureSprite(name: string) {}
