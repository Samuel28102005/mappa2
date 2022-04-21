export default class AnimatedObject {
    speedX = 0;
    speedY = 0;
    width = 60;
    height = 60;
    x = 10;
    y = 120;
    imageList = [];
    contaFrame = 0;
    actualFrame = 0;
    tryX = 0;
    tryY = 0;
    collision = true;
  
    constructor(imageUrlList, width, height, x, y) {
      this.loadImages(imageUrlList);
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
    }
  
    update(obstacleVector) {
      this.tryY = this.y + this.speedY;
      this.tryX = this.x + this.speedX;
  
      //Prima di spostarmi realmente verifico che non ci siano collisioni
      let collision = false;
  
      let objectsaved;
  
      try {
        for (let object of obstacleVector) {
          if (collision == false) {
            collision = this.crashWith(object);
          }
          if (collision) { objectsaved = object; throw 'Break'; }
        }
      }
      catch (e) {
  
      }
  
      if (!collision) {
        this.x = this.tryX;
        this.y = this.tryY;
        this.collision = false;
      }
      else {
        console.log(objectsaved);
        this.collision = true;
      }
  
      if (this.speedX != 0 || this.speedY != 0) this.contaFrame++;
      if (this.contaFrame == 3) {
        this.contaFrame = 0;
        this.actualFrame = (1 + this.actualFrame) % this.imageList.length;
        this.image = this.imageList[this.actualFrame];
      }
    }
  
    crashWith(otherobj) {
      var myleft = this.tryX;
      var myright = this.tryX + this.width;
      var mytop = this.tryY;
      var mybottom = this.tryY + this.height;
      var otherleft = otherobj.x;
      var otherright = otherobj.x + otherobj.width;
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + otherobj.height;
      var crash = true;
  
      //Collisioni con il bordo
       if (mytop < 0 || mybottom > 1024 || myleft < 0 || myright > 1024) {
        return true;
      }
  
      //NON HO COLLISIONI
      if (
        mybottom < othertop ||
        mytop > otherbottom ||
        myright < otherleft ||
        myleft > otherright
      ) {
        return false;
      } //HO COLLISIONI
      else {
        return true;
      }
    }
  
    loadImages(imageUrlList) {
      for (let imgPath of imageUrlList) {
        var img = new Image(this.width, this.height);
        img.src = imgPath;
        this.imageList.push(img);
      }
      this.image = this.imageList[this.actualFrame];
    }
    draw(context) {
      if (this.collision) context.fillRect(this.x, this.y, this.width - 20, this.height - 20);
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    /*jump() {
      this.gravitySpeed = -this.jumpForce;
    }*/
  }