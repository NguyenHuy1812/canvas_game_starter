/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

let speed = 0;
let canvas = document.getElementById('canvas')
let ctx;
let score = 0
let gameStarted = false


ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;



let bgReady, heroReady, monsterReady, trapReady;
let bgImage, heroImage, trapImage;
var lastIndex = 0;

var monsterImage = ["images/monster1.png", "images/monster2.png", "images/monster3.png", "images/monster4.png", "images/monster5.png"];

let startTime = Date.now();
const SECONDS_PER_ROUND = 120;
console.log(SECONDS_PER_ROUND)

let elapsedTime = 0;

var heroX = canvas.width / 2;
var heroY = canvas.height / 2;
let monsterX = 100;
let monsterY = 100;
let trapX = 50;
let trapY = 50;
let monsterDirectionX = 1;
let monsterDirectionY = 1;
// function randomImageMonster() {
//   var num = Math.floor(Math.random() * 3);
//   return monsterImage[num];
// };
function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/bg-lego.png";

  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/hero.png";

  trapImage = new Image();
  trapImage.onload = function () {
    // show the hero image
    trapReady = true;
  };
  trapImage.src = "images/trap.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = ["images/monster1.png", "images/monster2.png", "images/monster3.png", "images/monster4.png", "images/monster5.png"][Math.floor(Math.random() * 5)]
}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */


/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}


/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  if (gameStarted) {
    if (
      heroX <= (trapX + 32)
      && trapX <= (heroX + 32)
      && heroY <= (trapY + 32)
      && trapY <= (heroY + 32)
    ) {
      alert(' You die ! Try agian later')
      gameStarted = false
      heroX = canvas.width / 2;
      heroY = canvas.height / 2;
      return resetGame()
    }
    // Update the time.
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    console.log(elapsedTime)
    if (SECONDS_PER_ROUND - elapsedTime == 0) {
      alert(' You die ! Try agian later')
      return resetGame()
    }

    if (gameStarted) {
      if (38 in keysDown) { // Player is holding up key
        heroY -= 5;

      }
      if (40 in keysDown) { // Player is holding down key
        heroY += 5;

      }
      if (37 in keysDown) { // Player is holding left key
        heroX -= 5;

      }
      if (39 in keysDown) { // Player is holding right key
        heroX += 5;

      }
    }

    // keysdown


    speed = 3
    if (score > 2 && score <= 10) {
      speed = 6
    }
    if (score > 10 && score < 20) {
      speed = 10
    }

    monsterX = monsterX + monsterDirectionX * speed

    if (monsterX > canvas.width - 32 || monsterX < 0) {
      monsterDirectionX = - monsterDirectionX
    }
    monsterY = monsterY + monsterDirectionY * speed
    if (monsterY > canvas.height || monsterY < 0) {
      monsterDirectionY = - monsterDirectionY
    }

    trapX = trapX + monsterDirectionX * (speed - 2)
    if (trapX > canvas.width - 32 || trapX < 0) {
      monsterDirectionX = - monsterDirectionX
    }
    trapY = trapY + monsterDirectionY * (speed - 2)

    if (trapY > canvas.height || trapY < 0) {
      monsterDirectionY = - monsterDirectionY
    }

    // Check if player and monster collided. Our images
    // are about 32 pixels big.


  }
  if (
    heroX <= (monsterX + 32)
    && monsterX <= (heroX + 32)
    && heroY <= (monsterY + 32)
    && monsterY <= (heroY + 32)
  ) {
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    // update location of hero & monster

    monsterX = Math.round(Math.random() * (canvas.width - 32));
    monsterY = Math.round(Math.random() * canvas.height)
    trapX = Math.round(Math.random() * (canvas.width - 32));
    trapY = Math.round(Math.random() * canvas.height)


    monsterImage.src = ["images/monster1.png", "images/monster2.png", "images/monster3.png", "images/monster4.png", "images/monster5.png"][Math.floor(Math.random() * 5)]
    score = score + 1
  }


  if (score == 20) {
    alert(`congratulation, your elapse time is ${elapsedTime}`)
    return resetGame()

  }
  //

  heroY >= canvas.height ? heroY = 512 : null;
  heroX >= canvas.width ? heroX = 480 : null;
  heroY < 0 ? heroY = 0 : null;
  heroX < 0 ? heroX = 0 : null;

};

/**
 * This function, render, runs as often as possible.
 */

var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);
  }
  if (trapReady) {
    ctx.drawImage(trapImage, trapX, trapY);
  }
  ctx.fillStyle = "red";
  ctx.font = "bold 20px Helvetica, Arial, sans-serif";
  ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 50);
  ctx.fillText(`Score: ${score}`, 20, 100);
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */


var main = function () {
  update();
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

loadImages();
setupKeyboardListeners();
main();


function startGame() {
  gameStarted = true

}
function resetGame() {
  gameStarted = false
  score = 0
  elapsedTime = 0

  monsterX = 100
  monsterY = 100
  startTime = Date.now()
  canvas.width = 512;
  canvas.height = 480;
  trapX = 50;
  trapY = 50;
  heroX = canvas.width / 2;
  heroY = canvas.height / 2;

}
