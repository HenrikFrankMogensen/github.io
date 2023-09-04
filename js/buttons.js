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
      this.rightKeyDown = true;
    });
    this.buttonLeft.addEventListener('touchend', e => {
      this.rightKeyDown = false;
    });
    this.buttonThrust.addEventListener('touchstart', e => {
      this.leftKeyDown = true;
    });
    this.buttonThrust.addEventListener('touchend', e => {
      this.leftKeyDown = false;
    });
    this.buttonRight.addEventListener('touchstart', e => {
      this.upKeyDown = true;
    });
    this.buttonRight.addEventListener('touchend', e => {
      this.upKeyDown = false;
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