class Buttons extends Game {
  constructor() {
    super();
    this.upKeyDown = false;
    this.leftKeyDown = false;
    this.rightKeyDown = false;
    this.buttonLeft = document.getElementById('btn-left');
    this.buttonThrust = document.getElementById('btn-thrust');
    this.buttonRight = document.getElementById('btn-right');
    this.keyCode = 0;
    this.buttonLeft.addEventListener('touchstart', e => {
      this.keyCode = 37;
    });
    this.buttonLeft.addEventListener('touchend', e => {
      this.keyCode = 0;
    });
    this.buttonThrust.addEventListener('touchstart', e => {
      this.keyCode = 38;
    });
    this.buttonThrust.addEventListener('touchend', e => {
      this.keyCode = 0;
    });
    this.buttonRight.addEventListener('touchstart', e => {
      this.keyCode = 39;
    });
    this.buttonRight.addEventListener('touchend', e => {
      this.keyCode = 0;
    });
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
      }
      console.log(this.upKeyDown, this.rightKeyDown, this.leftKeyDown);
      //this.keyCode = 0;
    });
  }
}