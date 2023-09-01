class Buttons extends Game {
  constructor() {
    super();
    this.buttonLeft = document.getElementById('btn-left');
    this.buttonThrust = document.getElementById('btn-thrust');
    this.buttonRight = document.getElementById('btn-right');
    this.keyCode = 0;
    this.buttonLeft.addEventListener('mousedown', e => {
      this.keyCode = 37;
    });
    this.buttonLeft.addEventListener('mouseup', e => {
      this.keyCode = 0;
    });
    this.buttonThrust.addEventListener('mousedown', e => {
      this.keyCode = 38;
    });
    this.buttonThrust.addEventListener('mouseup', e => {
      this.keyCode = 0;
    });
    this.buttonRight.addEventListener('mousedown', e => {
      this.keyCode = 39;
    });
    this.buttonRight.addEventListener('mouseup', e => {
      this.keyCode = 0;
    });
    document.addEventListener('keydown', e => {
      this.keyCode = e.keyCode;
    });
    document.addEventListener('keyup', e => {
      this.keyCode = 0;
    });
  }
}