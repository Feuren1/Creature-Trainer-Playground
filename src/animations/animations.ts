import { Application, Sprite } from "pixi.js";

export function rattleEffect(app: Application, sprite: Sprite){
    let time = 0;
    app.ticker.add(() => {
      time += 0.1; 
      const shakeX = Math.random() * 6 - 3;  
      const shakeY = Math.random() * 6 - 3;  

      sprite.x = shakeX;
      sprite.y = shakeY;
    });
}