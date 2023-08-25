// Lav en bold der falder ned med jordens tiltrækning. 9,8M/s
// i acceleration. Bolden skal være 0,5 meter i diameter.

//const boldImage = new Image();
//boldImage.src = 'bold.png';

const menu = new Menu();
const oern = new Oern();

const ball = document.getElementById('sphere-js');
const text = document.getElementById('overskrift-js');
const menu1 = document.getElementById('menu1-js');
const menu2 = document.getElementById('menu2-js');
const menu3 = document.getElementById('menu3-js');
const text1 = document.getElementById('text-box-js');
const text2 = document.getElementById('text-box2-js');
const oernPic = document.getElementById('oern-js');
const kranie1 = document.getElementById('webgl');

let yPosition = 8;
let xPosition = 0;
let yVelocity = -10;
let xVelocity = 3;
const gravity = 0.6;
const groundLevel = -12;
let right = true;
let jumping = true;
let gameOver = false;
let gameOverRunning = false;
let begone = false;

ball.style.left = xPosition + 'px';
ball.style.top = yPosition + 'px';

function jump() {
    if (jumping) {
        if (xPosition === 0 && gameOver || gameOverRunning) {
            endingJumping();
            if(yPosition > - 20) {
                yPosition = 8;
                ball.style.top = yPosition + 'px';
                jumping = true;
                gameOverRunning = false;
                begone = false;
                return;
            }
            
            //console.log(gameOverRunning);
        } 
        begone = true;
        yVelocity += gravity; // Apply gravity to the velocity
        if (right) {
            xPosition += xVelocity;
            if (xPosition > 260) {
                right = false;
            }
        } else {
            xPosition -= xVelocity;
            if (xPosition === 0) {
                right = true
            }
        }
        if (yPosition === groundLevel) {
            yVelocity = - 10;
        }
        yPosition += yVelocity; // Update the position with the current velocity
        


        // If the ball reaches the ground, bounce it back up
        if (yPosition >= groundLevel) {
            yPosition = groundLevel;
            yVelocity = -yVelocity * 0.7; // Add some dampening to the bounce
        }
        

        ball.style.left = xPosition + 'px';
        ball.style.top = yPosition + 'px';

        requestAnimationFrame(jump); // Call the function again on the next frame
        
    } else {
        return;
    }
}

function endingJumping() {
    //yPosition = 8;
    //xPosition = 0;
    
    yPosition += yVelocity; // Update the position with the current velocity

    // If the ball reaches the ground, bounce it back up
    if (yPosition >= groundLevel) {
        yPosition = groundLevel;
        yVelocity = -yVelocity * 0.7; // Add some dampening to the bounce
    }
    
    xPosition = 0;
    ball.style.left = xPosition + 'px';
    ball.style.top = yPosition + 'px';
    gameOverRunning = true;
    
    
    //console.log(yPosition);
    gameOver = false; // gør jeg fordi ellers kan det ikke overskues

    //requestAnimationFrame(jump);
}

ball.addEventListener('click', jump);
text.addEventListener('click', () => {
    if(jumping) {
        if (begone) {
            gameOver = true;
        }
        
    } else {
        //gameOver = false;
        jumping = true;
        jump();
    }
    console.log(begone);
    if(!begone) {
        if(menu.menuUp) {
            menu.getMenuDown();
        } else {
            menu.getMenuUp();
        }
    }
    
});
menu1.addEventListener('click', () => {
    text2.style.display = 'none';
    text1.style.display = 'block';
    if(oern.oernUp) {
       
        //menu1.style.color = 'rgb(56,191,63)';
        //oernPic.style.top = '100px';
        oern.moveOernDown();  
        oern.oernUp = false;
    }
});

menu2.addEventListener('click', () => {
    text1.style.display = 'none';
    window.open('asteroids.html', 'blank');
    
});

menu3.addEventListener('click', () => {
    text1.style.display = 'none';
    text2.style.display = 'block';
});
//jump(); // Start the animation loop

