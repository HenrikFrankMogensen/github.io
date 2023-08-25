class KeyPressed extends Game {
  constructor() {
    super();
    this.addListenerActive = false;
    this.keyCode = 0;
    this.spacePressed = false;
    this.repeatTimeout; 
    this.bLeft = document.getElementById('left-button.js'); 
    this.bRight = document.getElementById('right-button.js'); 
    this.bUp = document.getElementById('up-button.js'); 
    this.bDown = document.getElementById('down-button.js'); 
  }

  whatKey() {
    if(!this.addListenerActive) {
      this.addListenerActive = true;

      document.addEventListener('keydown', e => {
        this.keyCode = e.keyCode;
      });
      document.addEventListener('keyup', e => {
        this.keyCode = 0;
      });
      this.bLeft.addEventListener('mousedown', e => {
        this.keyCode = 37;
      });
      this.bLeft.addEventListener('mouseup', e => {
        this.keyCode = 0;
      });
      this.bRight.addEventListener('mousedown', e => {
        this.keyCode = 39;
      });
      this.bRight.addEventListener('mouseup', e => {
        this.keyCode = 0;
      });
      this.bUp.addEventListener('mousedown', e => {
        this.keyCode = 38;
      });
      this.bUp.addEventListener('mouseup', e => {
        this.keyCode = 0;
      });
      this.bDown.addEventListener('mousedown', e => {
        this.keyCode = 32;
      });
      this.bDown.addEventListener('mouseup', e => {
        this.keyCode = 0;
      });
   
    } 
    return this.keyCode;
  }
    
}