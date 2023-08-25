class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.nScore = 0;
    this.vec2p0 = {x: 0, y: 0};
    this.vec2p1 = {x: 0, y: 0};
    this.bDead = false
    this.noMoreAsteroids = false;
    this.bDeadTimeOut = 200;
    this.countDown  = true;
    this.extraShip2000 = false;
    this.extraShip8000 = false;
    this.gameover = false;
    this.ships = 3;
    this.beatCountDown = 100;
    this.beat1Next = true;
    this.valueBeat = 0;
    this.afterBigSaucer = false;
  }

  drawPixel(x, y, saucerCall) {
    let XYObjExtra = {x: 0, y: 0};

    if(!saucerCall) {
      this.wrapCoordinates(x, y, XYObjExtra);
      x = XYObjExtra.x;
      y = XYObjExtra.y;
    }

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(x, y, 1, 1);
  }

  wrapCoordinates(x, y, obj) {
    //console.log(x);
    obj.x = x;
    obj.y = y;
    if(x < 0) obj.x = x + 800;
    if(x > 800) obj.x = x - 800;
    if(y < 0) obj.y = y + 600;
    if(y > 600) obj.y = y - 600;
  }

  drawLine(vec2p0, vec2p1, saucerCall = false) {
    
    let m = 0;
    if(vec2p1.x != vec2p0.x) {
      m = (vec2p1.y - vec2p0.y) / (vec2p1.x - vec2p0.x);
    }
    if(vec2p1.x != vec2p0.x && Math.abs(m) <= 1.0) {
      //console.log(m);
      if(vec2p0.x > vec2p1.x) { // Er punkt 0's x værdi > punkt 1's x værdi?
        let temp = this.swap(vec2p0, vec2p1);
        vec2p1.x = temp[0];
        vec2p1.y = temp[1];
        vec2p0.x = temp[2];
        vec2p0.y = temp[3];
        //console.log('punkt0:'+vec2p0.x+', punkt1'+vec2p1.x);
      }
      
      let b = vec2p0.y - m * vec2p0.x;
      for(let x = Math.round(vec2p0.x); x < Math.round(vec2p1.x); x++) {
        const y = m * x + b;
        this.drawPixel(x, Math.round(y), saucerCall);
      }
    } else {
      
      // linie bliver ikke plottet på grund af at punkter er forkert
      // når linien skal plottes. Så ser den det som om at y ikke er
      // < p1 og loopen stopper med det samme.
      if(vec2p0.y > vec2p1.y) { // Er punkt 0's x værdi > punkt 1's x værdi?
        let temp = this.swap(vec2p0, vec2p1);
        vec2p1.x = temp[0];
        vec2p1.y = temp[1];
        vec2p0.x = temp[2];
        vec2p0.y = temp[3];
        //console.log('punkt0:'+vec2p0.x+', punkt1'+vec2p1.x);
      }
      let w = (vec2p1.x - vec2p0.x) / (vec2p1.y - vec2p0.y);
      let p = vec2p0.x - w * vec2p0.y;
      for(let y = Math.round(vec2p0.y); y < Math.round(vec2p1.y); y++) {
        const x = w * y + p;
        this.drawPixel(Math.round(x), y, saucerCall);
      }
    }
  }

  isPointInsideCircle(cx, cy, radius, bx, by) {
    //console.log(Math.sqrt((bx-cx)*(bx-cx) + (by-cy)*(by-cy)));
    return Math.sqrt((bx-cx)*(bx-cx) + (by-cy)*(by-cy)) < radius;
  }

  swap(obj0, obj1) {
    return [obj0.x, obj0.y, obj1.x, obj1.y];
  }

  drawWireFrameModel(vecMC, x, y, r, s=4) {
    // Make vecTransformedCoordinates same size as vedMC input 
    const vecTransformedCoordinates = new Array(vecMC.length);
    for (let i = 0; i < vecMC.length; i++) {
      vecTransformedCoordinates[i] = new Array(2);
    }
    // Rotate
    for(let i = 0; i < vecMC.length; i++) {
      vecTransformedCoordinates[i][0] = vecMC[i][0]*Math.cos(r)-vecMC[i][1]*Math.sin(r);
      vecTransformedCoordinates[i][1] = vecMC[i][1]*Math.cos(r)+vecMC[i][0]*Math.sin(r);
    }
    // Scale
    for(let i = 0; i < vecMC.length; i++) {
      vecTransformedCoordinates[i][0] = vecTransformedCoordinates[i][0] * s;
      vecTransformedCoordinates[i][1] = vecTransformedCoordinates[i][1] * s;
    }
    // Translate
    for(let i = 0; i < vecMC.length; i++) {
      vecTransformedCoordinates[i][0] = vecTransformedCoordinates[i][0]+x;
      vecTransformedCoordinates[i][1] = vecTransformedCoordinates[i][1]+y;
    }
    // Draw Closed Polygon
    for(let i = 0; i < vecMC.length-1; i++) {
      this.vec2p0.x = vecTransformedCoordinates[i][0];
      this.vec2p0.y = vecTransformedCoordinates[i][1];
      this.vec2p1.x = vecTransformedCoordinates[i+1][0];
      this.vec2p1.y = vecTransformedCoordinates[i+1][1];
      this.drawLine(this.vec2p0, this.vec2p1);
    }
    this.vec2p0.x = vecTransformedCoordinates[vecMC.length-1][0];;
    this.vec2p0.y = vecTransformedCoordinates[vecMC.length-1][1];;
    this.vec2p1.x = vecTransformedCoordinates[0][0];;
    this.vec2p1.y = vecTransformedCoordinates[0][1];;
    this.drawLine(this.vec2p0, this.vec2p1);
    
  }

  printScore() {
    this.ctx.font = "25px Verdana";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.nScore, 20, 35);
  }

  resetGame() {
    asteroids.vecAsteroids = [];
    bullets.vecBullets = [];
    let obj2 = new Asteroids(100, 300, 8, -6, 80, 0); 
    let obj3 = new Asteroids(200, 500, -5, 3, 80, 0); 
    let obj4 = new Asteroids(500, 500, -5, 3, 80, 0); 
    asteroids.vecAsteroids.push(obj2);
    asteroids.vecAsteroids.push(obj3);
    asteroids.vecAsteroids.push(obj4);
    player = new Player(400, 300, 0, 0, 0, 0);
    this.bDead = false
    this.noMoreAsteroids = false;
  }

  resetGame2() {
    player = new Player(400, 300, 0, 0, 0, 0, false);
    this.bDead = false
    this.noMoreAsteroids = false;
  }

  gameOver() {
    this.ctx.font = '25px Verdana';
    this.ctx.fillStyle = "white";
    this.ctx.fillText('Game Over', 330, 285);
    this.ctx.fillText('Press Return', 318, 315);
    this.ships = 3;  
    this.extraShip2000 = false;
    this.extraShip8000 = false;
    this.valueBeat = 0;
    player.on = false;         
  }

  startNewGame() {
    asteroids.vecAsteroids = [];
    bullets.vecBullets = [];
    let obj1 = new Asteroids(100, 300, 8, -6, 80, 0); 
    let obj2 = new Asteroids(200, 500, -5, 3, 80, 0); 
    asteroids.vecAsteroids.push(obj1);
    asteroids.vecAsteroids.push(obj2);
    player = new Player(400, 300, 0, 0, 0, 0);
    this.nScore = 0;
    this.bDead = false
    this.noMoreAsteroids = false;
    saucer = new Saucer(-50,100,0,0,6,false);
    saucerLittle = new Saucer(-50,500,0,0,4,false);
    this.afterBigSaucer = false;
  }

  onUserUpdate() {
    if(!this.gameover) {
      this.updateBeat();
      player.draw();
      player.keyPressUpdate();
      player.update();
      player.extraShipSetup();
      bullets.drawAndUpdate();
      asteroids.draw();
      //this.drawPixel(saucer.ObjXYP1.x,saucer.ObjXYP1.y);
      //this.drawPixel(saucer.ObjXYP2.x,saucer.ObjXYP2.y);
      if(!this.afterBigSaucer) {
        saucer.draw();
        saucer.update();
      } else {
        saucerLittle.draw();
        saucerLittle.update();
      }
      this.printScore(); 
    } else {
      this.updateBeat();
      asteroids.draw();    
      this.gameOver();
      this.printScore();
      if(key.keyCode === 13) {
        this.gameover = false;
        this.startNewGame();
      }
    }
    
  }

  updateWhenDead() {
    if(this.bDead) {
      //console.log('was here');
      this.ships -= 1;
      //console.log(player.ships);
      if(this.ships === -1) {
        saucerBig.stop();
        this.gameOver();
        this.gameover = true;
      }
      thrust.loadSound().then(() => {
        thrust.play();
        thrust.stop();
      });
      this.resetGame2();
    }
  }

  updateBeat() {
    this.beatCountDown -= 1;
    if(this.beatCountDown === 0) {
      if(this.beat1Next) {
        beat1.loadSound().then(() => {
          beat1.play();
        });
        this.beatCountDown = 100 - this.valueBeat;
        if(this.beatCountDown < 60) {
          this.beatCountDown = 60;
        }
        this.beat1Next = false;
        this.valueBeat += 3;
        console.log(this.beatCountDown);
      } else {          
        beat2.loadSound().then(() => {
          beat2.play();
        });
        this.beatCountDown = 100 - this.valueBeat;
        if(this.beatCountDown < 60) {
          this.beatCountDown = 60;
        }
        this.beat1Next = true;
      }
    }
  }
}