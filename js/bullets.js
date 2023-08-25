class Bullets extends Game {
  constructor(x, y, dx, dy) {
    super();
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.vecBullets = [];
  }

  addBullets() {
    if(player.on) {
      let obj1 = new Bullets(player.x, player.y, 50 * Math.sin(player.angle), -50 * Math.cos(player.angle));   
      this.vecBullets.push(obj1);
      //fire.load();
      fire.loadSound().then(() => {
        fire.play();
      });
    }
  }

  drawAndUpdate() {
    let newAsteroids = [];
    this.vecBullets.forEach((bullet) => {
      bullet.x += bullet.dx * 0.1;
      bullet.y += bullet.dy * 0.1;
      game.drawPixel(bullet.x, bullet.y);
      
      asteroids.vecAsteroids.forEach((astr) => {
        //console.log(this.vecAsteroids.length);
        if(game.isPointInsideCircle(astr.x,astr.y, astr.nSize, bullet.x, bullet.y)) {
          // Asteroid hit
          //bangMedium.load();
          bangMedium.loadSound().then(() => {
            bangMedium.play();
          });
          game.nScore += 100;
          bullet.x = - 100;
          if(astr.nSize > 15) {
            // Create two child asteroids
            let angle1 = Math.random() * Math.PI * 2;
            let angle2 = Math.random() * Math.PI * 2;
            newAsteroids.push(new Asteroids(astr.x,astr.y, 10 * Math.sin(angle1), 10 * Math.cos(angle1),astr.nSize/2,0));
            newAsteroids.push(new Asteroids(astr.x,astr.y, 10 * Math.sin(angle2), 10 * Math.cos(angle2),astr.nSize/2,0));
          }
          astr.x = -100;
        }
      });

      if(asteroids.vecAsteroids.length > 0) {
        const filteredAsteroids = asteroids.vecAsteroids.filter((o) => {
          return !(o.x < 0);
        });

        if (filteredAsteroids.length !== asteroids.vecAsteroids.length) {
          asteroids.vecAsteroids.splice(0, asteroids.vecAsteroids.length, ...filteredAsteroids);
        }
      }

      // Remove off screen bullets.
      if(this.vecBullets.length > 0) {
        // Assuming vecBullets is an array of objects with properties x, y
        const filteredBullets = this.vecBullets.filter((o) => {
          return !(o.x < 1 || o.y < 1 || o.x >= 800 || o.y >= 600);
        });

        if (filteredBullets.length !== this.vecBullets.length) {
          this.vecBullets.splice(0, this.vecBullets.length, ...filteredBullets);
        }
      }
      
    });
    newAsteroids.forEach((as) => {
      asteroids.vecAsteroids.push(as);
    });
  }
}