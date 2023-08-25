class Saucer extends Game {
  constructor(x, y, dx, dy, nSize, on) {
    super();
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.nSize = nSize;
    this.on = on;
    this.saucerModel = [[-0.5,-1.5],[+0.5,-1.5],[+1.0,-0.75],[+2.0,-0.75],[+4.0,0.0],[+2.0,+1.0],[-2.0,+1.0],[-4.0,0.0],[-2.0,-0.75],[-1.0,-0.75]];
    this.vec2p0 = {x: 0, y: 0};
    this.vec2p1 = {x: 0, y: 0};
    this.countDown = 600;
    this.soundTricked = false;
    this.shootOn = false;
    this.bullet = new Bullets(0,0,0.5,0.8);
    this.tickBulletHitPlayer = true;
    this.tickSetBulletXY = true;
    this.ObjXYP1 = {x: 200, y: 100}; // Saucer point
    this.ObjXYP2 = {x: 100, y: 200}; // Player point
    this.distanceX = 0;
    this.distanceX = 0;
    this.angle = 0;
    this.magnitude = 0;
    this.saucerHit = false;
  }

  draw() {
    if(this.on) {
      // Make vecTransformedCoordinates same size as vedMC input 
      const vecTFC = new Array(this.saucerModel.length);
      //console.log(vecTFC);
      for (let i = 0; i < this.saucerModel.length; i++) {
        vecTFC[i] = new Array(2);
      }

      // Make the copy of saucerModel
      for(let i = 0; i < this.saucerModel.length; i++) {
        vecTFC[i][0] = this.saucerModel[i][0];
        vecTFC[i][1] = this.saucerModel[i][1];
      }

      // Scale
      for(let i = 0; i < this.saucerModel.length; i++) {
        vecTFC[i][0] = vecTFC[i][0] * this.nSize;
        vecTFC[i][1] = vecTFC[i][1] * this.nSize;
      }
      // Translate
      for(let i = 0; i < this.saucerModel.length; i++) {
        vecTFC[i][0] = vecTFC[i][0] + this.x;
        vecTFC[i][1] = vecTFC[i][1] + this.y;
      }
      //console.log('K');
    
      for(let i = 0; i < 9; i++) {
        this.vec2p0.x = vecTFC[i][0];
        this.vec2p0.y = vecTFC[i][1];
        this.vec2p1.x = vecTFC[i+1][0];
        this.vec2p1.y = vecTFC[i+1][1];
        //console.log(vecTFC[0][0]);
        game.drawLine(this.vec2p0, this.vec2p1, true);
      }
    
      this.vec2p0.x = vecTFC[9][0];
      this.vec2p0.y = vecTFC[9][1];
      this.vec2p1.x = vecTFC[0][0];
      this.vec2p1.y = vecTFC[0][1];
      game.drawLine(this.vec2p0, this.vec2p1, true);

      this.vec2p0.x = vecTFC[9][0];
      this.vec2p0.y = vecTFC[9][1];
      this.vec2p1.x = vecTFC[2][0];
      this.vec2p1.y = vecTFC[2][1];
      game.drawLine(this.vec2p0, this.vec2p1, true);

      this.vec2p0.x = vecTFC[7][0];
      this.vec2p0.y = vecTFC[7][1];
      this.vec2p1.x = vecTFC[4][0];
      this.vec2p1.y = vecTFC[4][1];
      game.drawLine(this.vec2p0, this.vec2p1, true);
    }
  }
  update() {
    if(this.checkSaucerHit()) {
      this.on = false;
      this.saucerHit = true;
      saucerBig.stop();
      bangMedium.loadSound().then(() => {
        bangMedium.play();
      });
    }
    this.countDown -= 1;
    if(this.countDown < 0) {
      if(!this.saucerHit) {
        this.on = true;
      }
      
      this.x += 2;
      if(!this.soundTricked) {
        this.soundTricked = true;
        saucerBig.loadSound().then(() => {
          saucerBig.play(true);
        });
      }
      if(this.x > 850) {
        this.x = -50;
        this.on = false;
        saucerBig.stop();
        this.countDown = 600;
        this.soundTricked = false;
        this.tickSetBulletXY = true;
        this.tickBulletHitPlayer = true;
        if(game.afterBigSaucer) {
          game.afterBigSaucer = false;
        } else {
          game.afterBigSaucer = true;
        }
        this.saucerHit = false;
      }
      if(this.x > 200) {
        if(this.tickSetBulletXY && !this.saucerHit) {
          this.shootOn = true;
          this.bullet.x = this.x;
          this.bullet.y = this.y;
          this.tickSetBulletXY = false;
          this.findShootAngle();
        }
        if(true) {
          if(!(this.bullet.x < 0 || this.bullet.x > 800 || this.bullet.y < 0 || this.bullet.y > 600)) {
            this.bullet.x += this.bullet.dx * 4;
            this.bullet.y += this.bullet.dy * 4;
            game.drawPixel(this.bullet.x, this.bullet.y);
          } else {
            this.bullet.x = -10;
            this.bullet.y = -10;
            this.shootOn = false;
          }
        }
      }
    }
    
    if(this.checkIfBulletHitPlayer() && this.tickBulletHitPlayer && player.on) {
      bangMedium.loadSound().then(() => {
        bangMedium.play();
      });
      game.bDead = true;
      player.on = false;
      game.bDeadTimeOut = 200;
      game.countDown = true;
      game.updateWhenDead();
      this.tickBulletHitPlayer = false;
    }
  }

  checkIfBulletHitPlayer() {
    return game.isPointInsideCircle(player.x, player.y,10,this.bullet.x, this.bullet.y);
  }

  findShootAngle() {
    this.distanceX = player.x - this.x;
    this.distanceY = player.y - this.y;
    // find the magnitude
    this.magnitude = Math.sqrt(this.distanceX * this.distanceX + this.distanceY * this.distanceY);
    // Normalize vector
    this.bullet.dx = this.distanceX/this.magnitude;
    this.bullet.dy = this.distanceY/this.magnitude;
    //console.log(this.distanceX);
    
    //let distanceX = this.ObjXYP2.x - this.ObjXYP1.x;
    //let distanceY = this.ObjXYP2.y - this.ObjXYP1.y;
    //let distanceX = 10;
    //let distanceY = -10;
    //let angle = Math.atan2(distanceY, distanceX)*(180/Math.PI);  
    //this.angle = Math.atan2(this.distanceY, this.distanceX); 
    
    
    
    //console.log(this.angle *(180/Math.PI));  
    //console.log(this.angle);
    //this.bullet.dy = Math.cos(this.angle);
    //this.bullet.dx = Math.sin(this.angle);
  }
  // isPointInsideCircle(cx, cy, radius, bx, by)
  //this.vecBullets.forEach((bullet) => {
  checkSaucerHit() {
    let result = false;
    bullets.vecBullets.forEach((bul) => {
      if(game.isPointInsideCircle(this.x,this.y,20,bul.x,bul.y)) {
        result = true;
      }
    });
    return result;
  }

}