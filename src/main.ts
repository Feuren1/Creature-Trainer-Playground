import "./style.css";
import { AppState } from "./types/appState.ts";
import styles from "./main.module.css";
import { HealthBar } from "./components/battleUI/healthbar/healthbar.ts";
import { Application, Assets, Container, Sprite } from "pixi.js";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */ `
<div id="container" class="${styles.container}"> 
<div class="${styles.mainContainer}">
<button id="mainButton"></button>
<div class="${styles.player1Creatures}">
  <div class="column">Creatures O O O O O O</div>
    <div class="${styles.creatureStatsContainer}">
      <p id="creatureNamePlayer1" class="${styles.creatureName}"></p>
        <div class="${styles.hpBarContainer}">
          <div id="healthBarPlayer1" class="${styles.healthBarPlayer1}"></div>
          <div class="${styles.typeSymbol}">TYPE SYMBOL</div>
        </div>
    </div>
</div>

<div class="${styles.player2Creatures}">
<div class="column">Creatures O O O O O O</div>
<div id="healthBarPlayer2" class="column"></div>
<div class="column">LEVEL</div>
<div class="column">TYPE</div>
</div>

<div class="${styles.player1Creature}">
  <div class="column">CREATURE PLAYER 1</div>
</div>
<div class="${styles.player2Creature}">
  <div class="column">CREATURE PLAYER 2</div>
</div>
<div class="${styles.battleLog}">
  <div class="column">Bottom Element</div>
</div>
<div class="${styles.actions}">
  <div class="column">Bottom Element</div>
</div>
</div>
</div>
`;

document.addEventListener("DOMContentLoaded", async function () {
  const healthbarPlayer1 = HealthBar(50, 100);
  document.getElementById("healthBarPlayer1")?.appendChild(healthbarPlayer1);

  const healthbarPlayer2 = HealthBar(30, 100);
  document.getElementById("healthBarPlayer2")?.appendChild(healthbarPlayer2);

  const currentCreatureNamePlayer1 = "Salamander";
  const creatureNamePlayer1Element = document.getElementById(
    "creatureNamePlayer1"
  );
  if (creatureNamePlayer1Element) {
    creatureNamePlayer1Element.textContent = currentCreatureNamePlayer1;
  }


  const appDiv = document.getElementById("container");
  if (!appDiv) {
    console.error("Could not find #app div");
    return;
  }
  const { width, height } = appDiv.getBoundingClientRect();

  const app = new Application();
  await app.init({
    width: width,
    height: height, 
    background: '#1b1b1f', 
    resolution: window.devicePixelRatio || 1, 
    autoDensity: true, 
  });

  appDiv.appendChild(app.canvas);

  const mainContainer = new Container();

  try {
    const asset = await Assets.load('/public/Salamander.png'); // Verify path
    const logo = new Sprite(asset);
    logo.anchor.set(0.5);
    logo.label = 'logo';
    logo.x = width / 2; 
    logo.y = height / 2;
    logo.cursor = 'pointer';
    logo.eventMode = 'static';
    
    logo.on('pointerdown', () => {
      console.log('Sprite clicked!');
    });
    mainContainer.addChild(logo);
    app.stage.addChild(mainContainer);

  } catch (error) {
    console.error('Failed to load asset:', error);
  }
  

});