var c = document.getElementById("invadersCanvas");
var ctx = c.getContext("2d");

setup();
function setup()
{
	c.width = window.innerWidth;
	c.height = window.innerHeight - 150;
}

let player = { x:20, y:c.height-c.height/10, w:50, h:30, color:"green", speed:8 }
let enemies = [];
let playerProjectiles = [];
let enemyProjectiles = [];

let gameData = 
{
	enemiesHorizontal:8, enemiesVerticle:6,
	screenBuffer:20, 
	enemyWidth:30, enemyHeight:30, enemyBuffer:20,
	enemySpeed:2, enemyDrop:25,
	playerProjectileSpeed:8, enemyProjectileSpeed:6,
	playerFireRate:50, playerFireTimer:0,
	enemyFireRate:100, enemyFireTimer:0,
	enemyColors:["red", "orange", "green", "blue", "purple"]
}

let isPlaying = false;

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
	player.x = c.width / 2 - player.w / 2;
	playerProjectiles = [];
	enemyProjectiles = [];
	makeEnemies(gameData.enemiesVerticle, gameData.enemiesHorizontal);
	isPlaying = true;
	gameLoop();
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
		default:
			break;
	}
}

window.onmousedown = function(e)
{
	if(isPlaying)
		fire();
	else start();
}

function fire()
{
	if(gameData.playerFireTimer < gameData.playerFireRate) return;

	playerProjectiles.push(new gameObject(player.x + player.w / 2, player.y, "black", 5, 10));

	gameData.playerFireTimer = 0;
}

function makeEnemies(verticle, horizontal)
{
	enemies = [];
	for(let i = 0; i < verticle; i++)
	{
		for(let j = 0; j < horizontal; j++)
		{
			color = gameData.enemyColors[i % gameData.enemyColors.length]

			var x = (gameData.screenBuffer + ((gameData.enemyBuffer + gameData.enemyWidth) * j));
			var y = (gameData.screenBuffer + ((gameData.enemyBuffer + gameData.enemyHeight) * i));

			enemies.push(new gameObject(x, y, color, gameData.enemyWidth, gameData.enemyHeight));
		}
	}
}

function gameLoop()
{
	if(isPlaying)
	{
		draw();
		update();
		window.requestAnimationFrame(gameLoop);
	} 
}

function draw()
{
	ctx.clearRect(0, 0, c.width, c.height);
	enemies.forEach(x => { drawEnemy(x); });
	drawPlayer();
	drawProjectiles();
}

function drawProjectiles()
{
	playerProjectiles.forEach(x => { drawBrick(x.x, x.y, x.w, x.h, x.color); });
	enemyProjectiles.forEach(x => { drawBrick(x.x, x.y, x.w, x.h, x.color); });
}

function drawPlayer()
{
	drawBrick(player.x, player.y, player.w, player.h, player.color);
	drawBrick(player.x + player.w / 2 - player.w / 10, player.y - 10, player.w / 5, player.h, player.color);
}

function drawEnemy(x)
{
	drawBrick(x.x, x.y, x.w, x.h, x.color);
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
	gameData.playerFireTimer = Math.min(gameData.playerFireTimer + 1, gameData.playerFireRate);
	gameData.enemyFireTimer = Math.max(gameData.enemyFireTimer - 1, 0);
	player.color = (gameData.playerFireTimer < gameData.playerFireRate) ? "blue" : "green";

	updateEnemies();
	updateProjectiles();
	checkLoss();
}

function checkLoss()
{
	let loss = false;
	enemies.forEach(x => { if(x.y + x.h > player.y) loss = true; });
	if(loss) GameOver(false);
	if(enemies.length == 0) GameOver(true);
}

function GameOver(won)
{
	isPlaying = false;
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillStyle = "black";
	ctx.font = "50px Arial";

	var txt = (won) ? "Victory" : "Game Over";
	ctx.fillText(txt, (c.width - ctx.measureText(txt).width) / 2, c.height / 2 - 60);

	ctx.font = "25px Arial";
	ctx.fillText("Click to Play Again", (c.width - ctx.measureText("Click to Play Again").width) / 2, c.height / 2 - 20);
}

function updateProjectiles()
{
	playerProjectiles.forEach(x => 
		{
			x.y -= gameData.playerProjectileSpeed;

			if(x.y < 0) removePlayerProjectile(x);

			enemyProjectiles.forEach(y =>
				{
					if(checkCollision(x,y))
					{
						removePlayerProjectile(x);
						removeEnemyProjectile(y);
					}
				});


			enemies.forEach(y => 
				{
					if(checkCollision(x, y))
					{
						removePlayerProjectile(x);
						removeEnemy(y);
					}
				});
		});

	enemyProjectiles.forEach(x => 
		{
			x.y += gameData.enemyProjectileSpeed;

			if(x.y > c.height) removeEnemyProjectile(x);

			if(checkCollision(x, player))
			{
				GameOver(false);
			}
		});
}

function checkCollision(x, y)
{
	if(x.x + x.w < y.x) return false;
	if(x.x > y.x + y.w) return false;

	if(x.y + x.h < y.y) return false;
	if(x.y > y.y + y.h) return false;

	return true;
}

function removeEnemy(x)
{
	let index = enemies.indexOf(x);
	if (index > -1) {
		enemies.splice(index, 1);
	}
}

function removePlayerProjectile(x)
{
	let index = playerProjectiles.indexOf(x);
	if (index > -1) {
		playerProjectiles.splice(index, 1);
	}
}

function removeEnemyProjectile(x)
{
	let index = enemyProjectiles.indexOf(x);
	if (index > -1) {
		enemyProjectiles.splice(index, 1);
	}
}

function updateEnemies()
{
	if(gameData.enemyFireTimer <= 0)
	{
		var enemy = enemies[Math.floor(Math.random() * enemies.length)];
		enemyProjectiles.push(new gameObject(enemy.x + enemy.w / 2, enemy.y + enemy.h , "red", 5, 10));
		gameData.enemyFireTimer = gameData.enemyFireRate;
	}

	let down = false;
	enemies.forEach(x => 
		{ 
			if(!down && (gameData.enemySpeed > 0 && x.x + x.w > c.width - gameData.screenBuffer) || (gameData.enemySpeed < 0 && x.x < gameData.screenBuffer))
			{ 
				gameData.enemySpeed = -gameData.enemySpeed; 
				down = true;
			}
		});

	if(down)
		enemies.forEach(x => { x.y += gameData.enemyDrop; });
	else
		enemies.forEach(x => { x.x += gameData.enemySpeed; });
}
