import { Application, Sprite } from "pixi.js";

export function rattleEffect(app: Application, sprite: Sprite){
    // Animation logic to make the creature rattle (shake)
    let time = 0;
    app.ticker.add(() => {
      time += 0.1;  // Update time (controls the speed of the shake)
      
      // Apply random offsets for shaking effect
      const shakeX = Math.random() * 6 - 3;  // Random value between -3 and 3 (horizontal shake)
      const shakeY = Math.random() * 6 - 3;  // Random value between -3 and 3 (vertical shake)

      // Apply the shake to the creature's position
      sprite.x = shakeX;
      sprite.y = shakeY;
    });
}