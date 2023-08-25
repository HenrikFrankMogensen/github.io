class Player extends Game {
  constructor(x, y, dx, dy, nSize, angle, on = true) {
    super();
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.nSize = nSize;
    this.angle = angle;
    this.on = on;
    this.obj = {x: this.x, y: this.y};
    this.vecMC = [[+0.0,-5.0],[-2,+3],[+2,+3],[-1.8,1.8],[+1.8,1.8],[-0.8,1.8],[0,4],[0.8,1.8]];
    this.vec2p0 = {x: 0, y: 0};
    this.vec2p1 = {x: 0, y: 0};
    this.thrustTick = true;
    this.thrustStopTick = false;
  }

  update() {
    if(this.on) {
      if(key.keyCode === 37) {
        this.angle -= 0.1;
      }
      if(key.keyCode === 39) {
        this.angle += 0.1;
      }
      //console.log(this.player.angle);
      // Thrust
      if(key.keyCode === 38) {
        // ACCELERATION changes VELOCITY (with respect to time)
        this.dx += Math.sin(this.angle) * 2 * 0.2;
        this.dy += -Math.cos(this.angle) * 2 * 0.2;
        if(this.thrustTick) {
          thrust.loadSound().then(() => {
            thrust.play(true);
          });
          this.thrustTick = false;
          this.thrustStopTick = true;
        }
        
      }
      if(key.keyCode === 0) {
        if(this.thrustStopTick) {
          thrust.stop();
          this.thrustStopTick = false;
          this.thrustTick = true;
        }
        
      }
        
    }

    this.x += this.dx * 0.1;
    this.y += this.dy * 0.1;
    game.wrapCoordinates(this.x, this.y, this.obj);
    this.x = this.obj.x;
    this.y = this.obj.y;
  }
  
  keyPressUpdate() {
    key.keyCode = key.whatKey();
    //console.log(key.keyCode);
  }

  addELSpacePressed() {
    document.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        if (!this.spacePressed) {
          // First press
          this.spacePressed = true;
          
          bullets.addBullets();
          this.repeatTimeout = setTimeout(repeatAction, 500); // Adjust the interval as needed
        }
        event.preventDefault(); // Prevent scrolling due to space key
      }
        
    });
    
    document.addEventListener("mousedown", (event) => {
      console.log(key.keyCode);
      if (key.keyCode === 0) {// Forkert keyCode 0 i stedet for 32
        if (!this.spacePressed) {
          // First press
          this.spacePressed = true;
          
          bullets.addBullets();
          this.repeatTimeout = setTimeout(repeatAction, 500); // Adjust the interval as needed
        }
        event.preventDefault(); // Prevent scrolling due to space key
      }
      
    });
    
    document.addEventListener("keyup", (event) => {
      if (event.key === " ") {
        this.spacePressed = false;
        
        clearTimeout(this.repeatTimeout);
      }
    });

    document.addEventListener("mouseup", (event) => {
      if (key.keyCode === 0) {
        this.spacePressed = false;
        
        clearTimeout(this.repeatTimeout);
      }
    });

    function repeatAction() {
      if (this.spacePressed) {
        console.log("Space key held down and repeating action");
        repeatTimeout = setTimeout(repeatAction, 100); // Repeat more frequently as needed
      }
    }
  }

  draw() {
    if(this.on) {
      // Make vecTransformedCoordinates same size as vedMC input 
      const vecTFC = new Array(this.vecMC.length);
      for (let i = 0; i < this.vecMC.length; i++) {
        vecTFC[i] = new Array(2);
      }
      // Rotate
      for(let i = 0; i < this.vecMC.length; i++) {
        vecTFC[i][0] = this.vecMC[i][0]*Math.cos(this.angle)-this.vecMC[i][1]*Math.sin(this.angle);
        vecTFC[i][1] = this.vecMC[i][1]*Math.cos(this.angle)+this.vecMC[i][0]*Math.sin(this.angle);
      }
      // Scale
      for(let i = 0; i < this.vecMC.length; i++) {
        vecTFC[i][0] = vecTFC[i][0] * 4;
        vecTFC[i][1] = vecTFC[i][1] * 4;
      }
      // Translate
      for(let i = 0; i < this.vecMC.length; i++) {
        vecTFC[i][0] = vecTFC[i][0]+this.x;
        vecTFC[i][1] = vecTFC[i][1]+this.y;
      }
      // Draw Closed Polygon
      this.vec2p0.x = vecTFC[0][0];
      this.vec2p0.y = vecTFC[0][1];
      this.vec2p1.x = vecTFC[1][0];
      this.vec2p1.y = vecTFC[1][1];
      game.drawLine(this.vec2p0, this.vec2p1);

      this.vec2p0.x = vecTFC[0][0];
      this.vec2p0.y = vecTFC[0][1];
      this.vec2p1.x = vecTFC[2][0];
      this.vec2p1.y = vecTFC[2][1];
      game.drawLine(this.vec2p0, this.vec2p1);
      
      this.vec2p0.x = vecTFC[3][0];
      this.vec2p0.y = vecTFC[3][1];
      this.vec2p1.x = vecTFC[4][0];
      this.vec2p1.y = vecTFC[4][1];
      game.drawLine(this.vec2p0, this.vec2p1);

      if(key.keyCode === 38) {
        this.vec2p0.x = vecTFC[5][0];
        this.vec2p0.y = vecTFC[5][1];
        this.vec2p1.x = vecTFC[6][0];
        this.vec2p1.y = vecTFC[6][1];
        game.drawLine(this.vec2p0, this.vec2p1);

        this.vec2p0.x = vecTFC[6][0];
        this.vec2p0.y = vecTFC[6][1];
        this.vec2p1.x = vecTFC[7][0];
        this.vec2p1.y = vecTFC[7][1];
        game.drawLine(this.vec2p0, this.vec2p1);
      }
    }
    
    //this.drawDockShip();
  }

  extraShipSetup() {
    let j = 0;
    //console.log(game.ships);
    for(let i = 0; i < game.ships; i++) {
      this.drawDockShip(this.vecMC,27+j,65,0,3);
      j += 20;
    }
  }

  drawDockShip(vecMC, x, y, r, s=4) {
    // Make vecTransformedCoordinates same size as vedMC input 
    const vecTFC = new Array(vecMC.length);
    for (let i = 0; i < vecMC.length; i++) {
      vecTFC[i] = new Array(2);
    }
    // Rotate
    for(let i = 0; i < vecMC.length; i++) {
      vecTFC[i][0] = vecMC[i][0]*Math.cos(r)-vecMC[i][1]*Math.sin(r);
      vecTFC[i][1] = vecMC[i][1]*Math.cos(r)+vecMC[i][0]*Math.sin(r);
    }
    // Scale
    for(let i = 0; i < vecMC.length; i++) {
      vecTFC[i][0] = vecTFC[i][0] * s;
      vecTFC[i][1] = vecTFC[i][1] * s;
    }
    // Translate
    for(let i = 0; i < vecMC.length; i++) {
      vecTFC[i][0] = vecTFC[i][0]+x;
      vecTFC[i][1] = vecTFC[i][1]+y;
    }
    // Draw Closed Polygon
    
    this.vec2p0.x = vecTFC[0][0];
    this.vec2p0.y = vecTFC[0][1];
    this.vec2p1.x = vecTFC[1][0];
    this.vec2p1.y = vecTFC[1][1];
    game.drawLine(this.vec2p0, this.vec2p1);

    this.vec2p0.x = vecTFC[0][0];
    this.vec2p0.y = vecTFC[0][1];
    this.vec2p1.x = vecTFC[2][0];
    this.vec2p1.y = vecTFC[2][1];
    game.drawLine(this.vec2p0, this.vec2p1);
    
    this.vec2p0.x = vecTFC[3][0];
    this.vec2p0.y = vecTFC[3][1];
    this.vec2p1.x = vecTFC[4][0];
    this.vec2p1.y = vecTFC[4][1];
    game.drawLine(this.vec2p0, this.vec2p1);
  }

  checkForDead() {
    if(game.bDead) {
      game.ships -= 1;
      console.log(game.ships);
      if(game.ships === -1) {
        game.gameOver();
        game.gameover = true;
      }
      this.ResetGame2();
    }
  }
}