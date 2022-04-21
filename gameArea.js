import Level from "./level.js";
import Level1 from "./livelli.js";
import AnimatedObject from "./AnimatedObject.js";
import NinjaSprites from "./NinjaSprites.js";
export default class GameArea {
    
  constructor() {
    document.getElementById('bt').addEventListener('click', this.cGallo);

    this.ninja= new AnimatedObject(NinjaSprites.running,60,60,10,120);
    this.level = new Level(
      32,
      32,
      32,
      32,
      Level1.prato,
      Level1.mare,   
      Level1.ostacoli,
      "PathAndObjects.png",
      512,
      512
    );

    this.canvas = document.getElementById("gameArea");
    this.canvas.width = 1024;
    this.canvas.height = 1024;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(this.updateGameArea, 20); //ogni 20 ms chiamo il metodo updateGameArea
    document.addEventListener("keydown", this.move);
    document.addEventListener("keyup", this.clearmove);
    this.obstaclesVector = this.level.obstaclesVector;
  }
  drawAnimatedObject(gameObject) {
    this.context.drawImage(
      gameObject.image,
      gameObject.x,
      gameObject.y,
      gameObject.width,
      gameObject.height
    );
  }
  clear = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  updateGameArea = () => {
    this.clear();
    this.level.draw(this.context);
     this.obstaclesVector = this.level.obstaclesVector;
    this.ninja.update(this.obstaclesVector)
    this.ninja.draw(this.context) 
   };
    move = e => {
      switch (e.key) {
        case "w":
          this.ninja.speedY = -2;
          break;
        case "s":
          this.ninja.speedY = 2;
          break;
        case "a":
          this.ninja.speedX = -2;
          break;
        case "d":
          this.ninja.speedX = 2;
          break;
      }
    };
  
    clearmove = () => {
      this.ninja.speedX = 0;
      this.ninja.speedY = 0;
    };
 }