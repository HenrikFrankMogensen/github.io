class Asteroids extends Game {
  constructor(x, y, dx, dy, nSize, angle) {
    super();
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.nSize = nSize;
    this.angle = angle;
    this.vecAsteroids = [];
    this.XYObj = {x: 0, y: 0};
    this.vecModelAsteroid = [];
  }

  makeAsteroids() {
    let obj1 = new Asteroids(100, 300, 8, -6, 80, 0);  
    let obj2 = new Asteroids(600, 300, -6, 6, 80, 0);
    this.vecAsteroids.push(obj1);
    this.vecAsteroids.push(obj2);
    return this.vecAsteroids;
  }

  draw() {
    this.vecAsteroids.forEach((ast) => {
      ast.x += ast.dx * 0.1;
      ast.y += ast.dy * 0.1;
      ast.angle += 0.01;
      game.wrapCoordinates(ast.x, ast.y, this.XYObj);
      ast.x = this.XYObj.x;
      ast.y = this.XYObj.y;

      game.drawWireFrameModel(this.vecModelAsteroid,ast.x,ast.y,ast.angle,ast.nSize);
    });

    if(this.vecAsteroids.length === 0 && game.noMoreAsteroids === false) {
      // Big score end of this level.
      game.nScore += 1000;
      game.noMoreAsteroids = true;
      game.resetGame();
    }

    this.checkAsteroidHitPlayer();
  }

  // Called when the game begin
  makeVecModelAsteroids() {
    // Make an empty 2d array to contain the asteroid points.
    let verts = 20; // The number of rows in the 2d array.
    this.vecModelAsteroid = new Array(verts);
    // We know that the cols are 2 per point (x,y).
    for(let i = 0; i < verts; i++) {
      this.vecModelAsteroid[i] = new Array(2);
    }
    // And now the empty 2d array is made.
    // The middle of the astroid is 0.0.
    
    // Because I got 20 secments on the serfice of the circle and
    // the circle i 360 degrees 2PI in radians I want to find the
    // angle between 2 secments:
    let angle = (1/verts) * Math.PI * 2;
    for(let i = 0; i < verts; i++) {
      let radius = Math.random() * 0.4 + 0.8;
      // The calculation of the x of one point of the sarfice of the 
      // circle is: radius * sin of the angle and for the y it is:
      // radius * cos(angle). Forklaring følger.
      this.vecModelAsteroid[i][0] = radius * Math.sin(angle*i);
      this.vecModelAsteroid[i][1] = radius * Math.cos(angle*i);
    }
    //console.log(vecModelAsteroid);
    return this.vecModelAsteroid;
  }

  checkAsteroidHitPlayer() {
    this.vecAsteroids.forEach((a) => {
      if(game.isPointInsideCircle(a.x,a.y, a.nSize, player.x, player.y)&&player.on) {
        
        thrust.loadSound().then(() => {
          thrust.stop();
        });
        bangMedium.loadSound().then(() => {
          bangMedium.play();
        });
        
        game.bDead = true;
        player.on = false;
        game.bDeadTimeOut = 200;
        game.countDown = true;
        game.updateWhenDead();
      }
    });
    if(game.countDown) {
      game.bDeadTimeOut -= 1;
      if(game.bDeadTimeOut === 0) {
        player.on = true;
        game.countDown = false;
      }
    }
  }
}