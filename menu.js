class Menu {
  constructor(self) {
    this.gameLink = 'Games';
    this.threeLink = '3D Example';
    this.priceLink = 'Prices';
    this.menuUp = true;
    this.menuL1 = document.getElementById('menu1-js');
    this.menuL2 = document.getElementById('menu2-js');
    this.menuL3 = document.getElementById('menu3-js');
    this.posTopLink1 = -88;
    this.posTopLink2 = -75;
    this.posTopLink3 = -62;
    this.counter = 0;
  }

  startIntervalForMenuDown() {
    // Using setInterval to execute a function every 1000 milliseconds (1 second).
    this.intervalId = setInterval(() => {
      this.getMenuDown2();
    }, 1);
  }

  startIntervalForMenuUp() {
    // Using setInterval to execute a function every 1000 milliseconds (1 second).
    this.intervalId = setInterval(() => {
      this.getMenuUp2();
    }, 1);
  }

  stopInterval() {
    // Use clearInterval to stop the interval when needed.
    clearInterval(this.intervalId);
  }

  getMenuDown() {
    this.startIntervalForMenuDown();
  }

  getMenuDown2() {
    this.counter += 1;
    
    this.menuL1.innerHTML = this.gameLink;
    this.menuL2.innerHTML = this.threeLink;
    this.menuL3.innerHTML = this.priceLink;
    this.menuL1.style.top = (this.posTopLink1 + this.counter)+'px';
    this.menuL2.style.top = (this.posTopLink2 + this.counter)+'px';
    this.menuL3.style.top = (this.posTopLink3 + this.counter)+'px';
    if(this.counter === 100) {
      this.menuUp = false;
      this.stopInterval();
    }
  }

  getMenuUp() {
    this.startIntervalForMenuUp();
  }

  getMenuUp2() {
    this.counter -= 1;
    
    this.menuL1.innerHTML = this.gameLink;
    this.menuL2.innerHTML = this.threeLink;
    this.menuL3.innerHTML = this.priceLink;
    this.menuL1.style.top = (this.posTopLink1 + this.counter)+'px';
    this.menuL2.style.top = (this.posTopLink2 + this.counter)+'px';
    this.menuL3.style.top = (this.posTopLink3 + this.counter)+'px';
    if(this.counter === 0) {
      this.menuUp = true;
      this.stopInterval();
    }
  }

}
// menu1 end position = -3 og menu2 end position = 28