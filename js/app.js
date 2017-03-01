// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.minMaxSpeed = [100, 350];
    this.speed = Math.floor(Math.random() * this.minMaxSpeed[1]) + this.minMaxSpeed[0];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x = this.x + this.speed * dt;
    } else {    
        this.x = -100; // this ensures that the enemy appear from the left-hand side of the canvas.
    };
    allEnemies.forEach(function(enemy) {
        enemy.checkCollisions(player.x, player.y);
    });    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player's left/right marging 18px, top margin 64px, bottom margin 32px. 

Enemy.prototype.checkCollisions = function (playerX, playerY) {
    // xDelta measures the absulute distance on the X axis between the enemy and the player.
    var xDelta = Math.abs(this.x - playerX);

    // yDelta measures the absulute distance on the Y axis between the enemy and the player.
    var yDelta = Math.abs(this.y - playerY);

    // This function defines a collision based on the distance between  the player's 
    // and enemies' silhouttes. Specifically, when xDelta and yDelta are below a certain 
    // threshold. For the Y axis, the threshold is 10px (and not 0px) to account for the 
    // fact that the player's and enemies' images will never be perfectly verticallly 
    // aligned. For the X axis, the threshold is the width of the enemy's image (101px) 
    // minus the left margin in the player image (18px).
    if (yDelta < 10 && xDelta < 83) {  // Player top margin: 64px, enemy bottom margin: 28px.
        console.log("COLLISION!"); // DEBUGGING
        return true;
    } else {
        return false;
    };
};


// ----------PLAYER-------------

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    // STUFF HERE
};

Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};

Player.prototype.handleInput = function (dir) {
    if (dir == 'left' && this.x > 0) {
        this.x = this.x - 100;
    }
    if (dir == 'right' && this.x < 400) {
        this.x = this.x + 100;
    }
    if (dir == 'up' && this.y > 0) {
        this.y = this.y - 83;
    }
    if (dir == 'down' && this.y < 403) {
        this.y = this.y + 83;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// var allEnemies = [new Enemy(-100, 62), new Enemy(-100,145), new Enemy(-100,228)];
var player = new Player(200,403);

var enemy1 = new Enemy(-100, 228); // DEBUGGING
var allEnemies = [enemy1] // DEBUGGING

// var enemy1 = new Enemy(-100, 62);
// var enemy2 = new Enemy(-100, 145);
// var enemy3 = new Enemy(-100, 228);
// var allEnemies = [enemy1, enemy2, enemy3];

// enemy1.checkCollisions(player.x, player.y);
// enemy2.checkCollisions(player.x, player.y);
// enemy3.checkCollisions(player.x, player.y);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});