class ButtonPressed extends Game {
  constructor() {
    super();
    this.addListenerActive = false;
    this.keyCode = 0;
    this.spacePressed = false;
    this.repeatTimeout; 
  }

  whatKey() {
    if(!this.addListenerActive) {
      this.addListenerActive = true;
      c.addEventListener('mousedown', (e) => {
        let mousePos = canvasButtonLeft.getMousePos(c,e);
        canvasButtonLeft.mouseX = mousePos.x;
        canvasButtonLeft.mouseY = mousePos.y;
        
        if(canvasButtonLeft.isInsideButton()) {
          this.keyCode = 37;
        }
      });
      c.addEventListener('mouseup', (e) => {
        let mousePos = canvasButtonLeft.getMousePos(c,e);
        canvasButtonLeft.mouseX = mousePos.x;
        canvasButtonLeft.mouseY = mousePos.y;
        
        if(canvasButtonLeft.isInsideButton()) {
          this.keyCode = 0;
        }
      });
      c.addEventListener('mousedown', e => {
        let mousePos = canvasButtonRight.getMousePos(c,e);
        canvasButtonRight.mouseX = mousePos.x;
        canvasButtonRight.mouseY = mousePos.y;
        
        if(canvasButtonRight.isInsideButton()) {
          this.keyCode = 39;
        }
      });
      c.addEventListener('mouseup', e => {
        let mousePos = canvasButtonRight.getMousePos(c,e);
        canvasButtonRight.mouseX = mousePos.x;
        canvasButtonRight.mouseY = mousePos.y;
        
        if(canvasButtonRight.isInsideButton()) {
          this.keyCode = 0;
        }
      });
      c.addEventListener('mousedown', e => {
        let mousePos = canvasButtonThrust.getMousePos(c,e);
        canvasButtonThrust.mouseX = mousePos.x;
        canvasButtonThrust.mouseY = mousePos.y;
        
        if(canvasButtonThrust.isInsideButton()) {
          this.keyCode = 38;
        }
      });
      c.addEventListener('mouseup', e => {
        let mousePos = canvasButtonThrust.getMousePos(c,e);
        canvasButtonThrust.mouseX = mousePos.x;
        canvasButtonThrust.mouseY = mousePos.y;
        
        if(canvasButtonThrust.isInsideButton()) {
          this.keyCode = 0;
        }
      });
      
      document.addEventListener('keydown', e => {
        this.keyCode = e.keyCode;
      });
      document.addEventListener('keyup', e => {
        this.keyCode = 0;
      });
    } 
    return this.keyCode;
  }
  
}