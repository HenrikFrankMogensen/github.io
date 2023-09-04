class CanvasButton extends Game {
  constructor() {
    super();
    this.activateLeft = new canvasBtnArea(100,500,100);
    this.activateThrust = new canvasBtnArea(400,500,100);
    this.activateRight = new canvasBtnArea(700,500,100);
    console.log(this.activateLeft.y);
  }

  draw() {
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'green';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    //this.ctx.lineWidth = 4;
    //this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    //console.log(rect);
    //console.log(event);
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  //const canvasW = canvas.getBoundingClientRect().width;
  //const canvasH = canvas.getBoundingClientRect().height;

  calResizePos() {
    this.xResized = this.rX;
    this.yResized = this.rY;
    this.scaleFactorX = c.getBoundingClientRect().width / 800;
    this.scaleFactorY = c.getBoundingClientRect().height / 600;
    this.xResized = this.xResized * this.scaleFactorX;
    this.yResized = this.yResized * this.scaleFactorY;
    
    //console.log(this.xResized);
  }

  isInsideButton() {
    //let result = false;
    if(this.button === 'left') {
      return Math.sqrt(Math.abs(this.mouseX-this.xResized)*Math.abs(this.mouseX-this.xResized) + Math.abs(this.mouseY-this.yResized+5)*Math.abs(this.mouseY-this.yResized+5)) < 30;
    }
    if(this.button === 'thrust') {
      return Math.sqrt(Math.abs(this.mouseX-this.xResized+5)*Math.abs(this.mouseX-this.xResized+5) + Math.abs(this.mouseY-this.yResized)*Math.abs(this.mouseY-this.yResized)) < 30;
    }
    if(this.button === 'right') {
      return Math.sqrt(Math.abs(this.mouseX-this.xResized-20)*Math.abs(this.mouseX-this.xResized-20) + Math.abs(this.mouseY-this.yResized+5)*Math.abs(this.mouseY-this.yResized+5)) < 30;
    }
    game.drawPixel(100, 100);
  }
  
  makeTriangles() {
    this.ctx.beginPath();
    this.ctx.moveTo(80, 510);
    this.ctx.lineTo(100, 490);
    this.ctx.lineTo(100, 530);
    this.ctx.fill();
    this.ctx.moveTo(720,510);
    this.ctx.lineTo(700, 490);
    this.ctx.lineTo(700, 530);
    this.ctx.fill();
    this.ctx.moveTo(390, 490);
    this.ctx.lineTo(370, 510);
    this.ctx.lineTo(410, 510);
    this.ctx.fill();
  }
  
}