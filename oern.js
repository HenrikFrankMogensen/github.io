class Oern {
  constructor(self) {
    this.top = 5;
    this.oernUp = true;
  }

  moveOernDown() {
    this.startIntervalForOernMoveDown();
  }

  startIntervalForOernMoveDown() {
    // Using setInterval to execute a function every 1000 milliseconds (1 second).
    this.intervalId = setInterval(() => {
      this.moveOernDown2();
    }, 1);
  }

  moveOernDown2() {
    this.top++;
    oernPic.style.top = this.top + 'px';
    if(this.top === 100) {
      this.stopInterval();
    }
  }

  stopInterval() {
    // Use clearInterval to stop the interval when needed.
    clearInterval(this.intervalId);
  }
  
  moveOernUp() {
    this.startIntervalForOernMoveUp();
  }

  moveOernUp2() {
    this.top--;
    oernPic.style.top = this.top + 'px';
    if(this.top === 5) {
      this.stopInterval();
    }
  }

  startIntervalForOernMoveUp() {
    this.intervalId = setInterval(() => {
      this.moveOernUp2();
    }, 1);
  }
}