class Buttons extends Game {
  constructor() {
    super();
    this.upKeyDown = false;
    this.leftKeyDown = false;
    this.rightKeyDown = false;
    this.enterKeyDown = false;
    this.fireBtnActive = false;
    this.buttonLeft = document.getElementById('btn-left');
    this.buttonThrust = document.getElementById('btn-thrust');
    this.buttonRight = document.getElementById('btn-right');
    this.buttonFire = document.getElementById('btn-fire');
    this.keyCode = 0;
    this.buttonLeft.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.leftKeyDown = true;
    });
    this.buttonLeft.addEventListener('touchend', (e) => {
      this.leftKeyDown = false;
    });
    this.buttonThrust.addEventListener('touchstart', e => {
      this.upKeyDown = true;
    });
    this.buttonThrust.addEventListener('touchend', e => {
      this.upKeyDown = false;
    });
    this.buttonRight.addEventListener('touchstart', e => {
      this.rightKeyDown = true;
    });
    this.buttonRight.addEventListener('touchend', e => {
      this.rightKeyDown = false;
    });
    /*
    this.buttonFire.addEventListener('touchstart', e => {
      this.fireBtnActive = true;
    });
    this.buttonFire.addEventListener('touchend', e => {
      this.fireBtnActive = false;     
    });
    */
    document.addEventListener('keydown', e => {
      switch(e.key) {
        case "ArrowUp":
          this.upKeyDown = true;
          break;
        case "ArrowRight":
          this.rightKeyDown = true;
          break;
        case "ArrowLeft":
          this.leftKeyDown = true;
          break;
        case "Enter":
          this.enterKeyDown = true;
          break;
      }
      console.log(this.upKeyDown, this.rightKeyDown, this.leftKeyDown);
      //this.keyCode = e.keyCode;
    });
    document.addEventListener('keyup', e => {
      switch(e.key) {
        case "ArrowUp":
          this.upKeyDown = false;
          break;
        case "ArrowRight":
          this.rightKeyDown = false;
          break;
        case "ArrowLeft":
          this.leftKeyDown = false;
          break;
        case "Enter":
          this.enterKeyDown = false;
      }
      console.log(this.upKeyDown, this.rightKeyDown, this.leftKeyDown);
      //this.keyCode = 0;
    });
  }
}