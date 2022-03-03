//This is breakout code      
var c = document.getElementById("invadersCanvas");
var ctx = c.getContext("2d");

setup();
function setup()
{
	c.width = window.innerWidth;
	c.height = window.innerHeight - 150;

	ctx.font = "65px Arial";
	ctx.fillText("Works Kinda", (c.width - ctx.measureText("Works Kinda").width) / 2, c.height / 2);
}

let player = { x:20, y:c.width-c.width/3*2, w:50, h:30, color:"green", speed:4 }
let gameData = 
{ 
    initEnemiesHorizontal:8, initEnemiesVerticle:6,
    screenBuffer:20, 
    playerWidth:20, playerHeight:15, 
    enemyWidth:15, enemyHeight:15, enemyBuffer:20 
}

let enemySpeed = 4;

let projectiles = [];
let enemies = [];

class gameObject
{
	constructor(x, y, color, width, height)
	{
		this.x = x;
		this.y = y;
		this.color = color;
		this.w = width;
		this.h = height;
	}
}

start();
function start()
{
    enemiesHorizontal = gameData.initEnemiesHorizontal;
    enemiesVerticle = gameData.initEnemiesVerticle;

    makeEnemies(enemiesHorizontal, enemiesVerticle);
}


window.onkeydown = function(e)
{
	switch(e.keyCode)
	{
		case 65:
		case 37:
			player.x = Math.max(player.x - player.speed, gameData.screenBuffer);
			break;
		case 68:
		case 39:
			player.x = Math.min(player.x + player.speed, c.width - gameData.screenBuffer - player.w);
			break;
		case 32:
			fire();
			break;
		default:
			break;
	}
}

function fire()
{

}

function makeEnemies(verticle, horizontal)
{
    enemies = [];
    for(let i = 0; i < verticle; i++)
    {
        for(let j = 0; j < horizontal; j++)
        {
            ctx.beginPath();

			switch(i % 5)
			{
				case 0:
					color = "red";
					break;
				case 1:
					color = "orange";
					break;
				case 2:
					color = "yellow";
					break;
				case 3:
					color = "blue";
					break;
				case 4:
					color = "purple";
					break;
				default:
					color = "black";
					break;
			}

			var x = (gameData.screenBuffer + ((gameData.enemyBuffer + gameData.enemyWidth) * j));
			var y = (gameData.screenBuffer + ((gameData.enemyBuffer + gameData.enemyHeight) * i));
            
            enemies.push(new gameObject(x, y, color, gameData.enemyWidth, gameData.enemyHeight));
        }
    }
}

gameLoop();
function gameLoop()
{
	if(true)
	{
		draw();
		update();
	} 
	window.requestAnimationFrame(gameLoop);
}

function draw()
{
    ctx.clearRect(0, 0, c.width, c.height);
    enemies.forEach(x => { drawEnemy(x); });
	drawPlayer();
}

function drawPlayer()
{
	drawBrick(player.x, player.y, player.w, player.h, player.color);
	drawBrick(player.x + player.w / 2 - player.w / 10, player.y - 10, player.w / 5, player.h, player.color);
}

function drawEnemy(x)
{
	drawBrick(x.x, x.y, x.w, x.h, x.color);
//	drawBrick(x.x, x.y - 4 * x.h / 8, x.w / 11, x.h / 11 * 3, "green");
//	drawBrick(x.x + x.w / 11, x.y - 4 * x.h / 8);
}

function drawBrick(x, y, w, h, color)
{
    ctx.beginPath(); 
	ctx.fillStyle = color; 
	ctx.fillRect(x, y, w, h); 
	ctx.stroke();
}

function update()
{
    updateEnemies();
}

function updateEnemies()
{
    let down = false;
    enemies.forEach(x => 
		{ 
			if(enemySpeed > 0 && x.x + x.w > c.width - gameData.screenBuffer && !down)
			{ 
				enemySpeed = -enemySpeed; 
				down = true;
			}
			else if(enemySpeed < 0 && x.x < gameData.screenBuffer && !down)
			{
				enemySpeed = -enemySpeed; 
				down = true;
			}
		});

   if(down)
    {
        enemies.forEach(x => {
            x.y += 10;
        });
    }
    else
    {
        enemies.forEach(x => {
            x.x += enemySpeed;
        });
    }
}
