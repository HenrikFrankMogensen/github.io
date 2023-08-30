class CanvasButton extends Game {
  constructor(x, y, width, height, ctx, canvas, button) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mouseX = 0;
    this.mouseY = 0;
    this.ctx = ctx;
    this.canvas = canvas;
    this.button = button;
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
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
  isInsideButton() {
    //let result = false;
    if(this.button === 'left') {
      return Math.sqrt(Math.abs(this.mouseX-this.x)*Math.abs(this.mouseX-this.x) + Math.abs(this.mouseY-this.y+5)*Math.abs(this.mouseY-this.y+5)) < 30;
    }
    if(this.button === 'thrust') {
      return Math.sqrt(Math.abs(this.mouseX-this.x+5)*Math.abs(this.mouseX-this.x+5) + Math.abs(this.mouseY-this.y)*Math.abs(this.mouseY-this.y)) < 30;
    }
    if(this.button === 'right') {
      return Math.sqrt(Math.abs(this.mouseX-this.x-20)*Math.abs(this.mouseX-this.x-20) + Math.abs(this.mouseY-this.y+5)*Math.abs(this.mouseY-this.y+5)) < 30;
    }
    game.drawPixel(100, 100);
  }
  //const canvasButtonLeft = new CanvasButton(100,505,20,10,ctx,c);
  //const canvasButtonRight = new CanvasButton(680,505,20,10,ctx,c);
  //const canvasButtonThrust = new CanvasButton(375,520,10,20,ctx,c);
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
    this.ctx.moveTo(380, 490);
    this.ctx.lineTo(360, 510);
    this.ctx.lineTo(400, 510);
    this.ctx.fill();
  }
  
}