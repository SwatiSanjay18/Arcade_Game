// Enemies our player must avoid
var Enemy = function(name) {
  this.x = 0; // x-coordinate
  this.y = getRandom(65,250); //randomly generated y-coordinate
  this.name = name; //name
  this.sprite = 'images/enemy-bug.png'; // The image/sprite for enemies
};

//this function sets the speed for each of the enemy
//and updates the enemy location
// and resets in case it reaches end of the screen
Enemy.prototype.update = function(dt) {
  this.checkCollision();
  if(this.x >= ctx.canvas.width){
      this.x = 0;
      this.y = getRandom(65,230);
  }else{
    let speedVal =  this.setSpeed(this.name);
    this.x = Math.round(this.x + (speedVal * dt));
  }
};

//this function draws the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//this function set speeds for different bugs
Enemy.prototype.setSpeed = function(name){
  let speed = 0;
  if(name === 'bug1'){
    speed = 120;
  }else if(name === 'bug2'){
    speed = 200;
  }else if(name === 'bug3'){
    speed = 80;
  }else if(name === 'bug4'){
    speed = 50;
  }
  return speed;
}

//this function checks for the collision of the bugs and player
Enemy.prototype.checkCollision = function(){
  if(((this.x - player.x) <= 60) && ((this.x - player.x) >= -60) &&
  ((this.y - player.y) <= 60) && ((this.y - player.y) >= -60)){
    player.initLoc();
  }
}

//Player class
var Player = function(){
  this.x = getRandom(0,400);//x-coordinate
  this.y = getRandom(350,400);//y-coordinate
  this.sprite = 'images/char-boy.png'; //image
};

//this function updates the location
// of the player in case it reaches the ends of the screen
//and when the player reaches the water a dialog is displayed
Player.prototype.update = function(){
  if(this.x >= (ctx.canvas.width - 70)){
      this.x = ctx.canvas.width - 84;
  }else if(this.x <= 0){
    this.x = 0;
  }
  if(this.y >= (ctx.canvas.height - 160)){
    this.y = ctx.canvas.height - 160;
  }else if(this.y <= 0){
    this.y = 0;
    let dialog = document.getElementById('gameDialog');
    dialog.show();
  }
};

//this function draws the players on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//this function moves the player on keypress
Player.prototype.handleInput = function(keyCode) {
  if(keyCode === 'left'){
    this.x = this.x - 30;
  }else if (keyCode === 'right') {
    this.x = this.x + 30;
  }else if (keyCode === 'up') {
    this.y = this.y - 30;
  }else if(keyCode === 'down'){
    this.y = this.y + 30;
  }
};

//this function resets the player to initial location
//when it reaches the water
Player.prototype.initLoc = function(){
  this.x = getRandom(200,400);
  this.y = getRandom(350,400);
}

//Instantiating the player and enemy bugs
//and adding the enemy bugs in allEnemies array
let enemy1 = new Enemy('bug1');
let enemy2 = new Enemy('bug2');
let enemy3 = new Enemy('bug3');
let allEnemies = [enemy1,enemy2,enemy3];
let player = new Player();

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//this function generates a random integer between two numbers
function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//this function closes the Dialog
//and resets the player to initial location
function closeDialog(){
  let dialog = document.getElementById('gameDialog');
  dialog.close();
  player.initLoc();
}
