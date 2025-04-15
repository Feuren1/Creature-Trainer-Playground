import { Application, Assets, Container, Renderer, Sprite } from "pixi.js";
import { Creature } from "../types/creature";

export class BattleRenderer {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  /*
  @param pass either p1 or p2 for rendering player one or player two 
   */
  async renderTeamCreatureSymbols(
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
          const asset = await Assets.load(`/src/assets/${creatures[i]}.png`);
          const creatureP1 = new Sprite(asset);
  
          creatureP1.x = 0;
          creatureP1.y = 0;
          creatureP1.width = divRect.width;
          creatureP1.height = divRect.height;
  
          container.addChild(creatureP1);
          this.app.stage.addChild(container);
        } catch (error) {
          console.error("Failed to load asset:", error);
        }
      }
    }
  }
  async renderCreatureElementSymbol(player: "P1" | "P2", creature: Creature) {
    const creatureSymbolContainer = new Container();
    const creatureSymbolDiv = document.getElementById(
      `creatureElementSymbol${player}`
    );
    if (!creatureSymbolDiv) {
      console.error("Could not find the creatureP1 div");
      return;
    }
    const divRect = creatureSymbolDiv.getBoundingClientRect();
    creatureSymbolContainer.x = divRect.left;
    creatureSymbolContainer.y = divRect.top;
  
    try {
      const asset = await Assets.load(`/src/assets/${creature.element}-icon.jpg`);
      const creatureSymbol = new Sprite(asset);
  
      creatureSymbol.x = 0;
      creatureSymbol.y = 0;
      creatureSymbol.width = divRect.width;
      creatureSymbol.height = divRect.height;
  
      creatureSymbolContainer.addChild(creatureSymbol);
      this.app.stage.addChild(creatureSymbolContainer);
    } catch (error) {
      console.error("Failed to load asset:", error);
    }
  }
  
  /* Write it so that you can pass the player aswell */
  async renderPlayerCreature(player: "P1" | "P2",creature: Creature): Promise<void> {
    const creatureP1Container = new Container();
    const creatureP1Div = document.getElementById(`creature${player}`);
    if (!creatureP1Div) {
      console.error("Could not find the creatureP1 div");
      return;
    }
  
    const divRectP1 = creatureP1Div.getBoundingClientRect();
    creatureP1Container.x = divRectP1.left;
    creatureP1Container.y = divRectP1.top;
  
    try {
      const asset = await Assets.load(`/src/assets/${creature.name}.png`);
      const creatureP1 = new Sprite(asset);
  
      creatureP1.x = 0;
      creatureP1.y = 0;
      creatureP1.width = divRectP1.width;
      creatureP1.height = divRectP1.height;
  
      creatureP1Container.addChild(creatureP1);
      this.app.stage.addChild(creatureP1Container);
    } catch (error) {
      console.error("Failed to load asset:", error);
    }
  }

  handleResize(app: Application<Renderer>): any {
    const container = document.getElementById("mainContainer");
    if (!container) return;
  
    const { width, height } = container.getBoundingClientRect();
    app.canvas.style.width = `${width}px`;
    app.canvas.style.height = `${height}px`;
  
    this.repositionPixiElements();
  }
  
  repositionPixiElements() {
    this.app.stage.children.forEach((container) => {
      if (container instanceof Container && container.children.length > 0) {
        const sprite = container.children[0] as Sprite;
  
        let targetDivId = "";
        if (sprite.label === "logo") targetDivId = "mainContainer";
        else if (
          sprite.texture.baseTexture.resource?.url?.includes("Salamander")
        ) {
          targetDivId =
            container.x < this.app.screen.width / 2 ? "creatureP1" : "creatureP2";
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
}
