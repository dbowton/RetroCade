//This is breakout code      
var c = document.getElementById("breakoutCanvas");
var ctx = c.getContext("2d");

setup();
function setup()
{
	c.width = window.innerWidth;
	c.height = window.innerHeight - 100;
}

const BRICKS_HORIZONTAL = 5;
const BRICKS_VERTICAL = 2;

const SCREEN_BUFFER = 20;

const BRICK_BUFFER = 5;
const BRICK_WIDTH = (((c.width - (2 * SCREEN_BUFFER)) / BRICKS_HORIZONTAL) - BRICK_BUFFER)
const BRICK_HEIGHT = ((((c.height / 3) - (2 * SCREEN_BUFFER)) / BRICKS_VERTICAL) - BRICK_BUFFER);

const BALL_RADIUS = 10;
let dx;
let dy;
let ball_x;
let ball_y;

const paddle_width = (c.width / 6);
let paddle_height = (c.height / 24);
let paddle_x = ((c.width / 2) - (paddle_width / 2));
let paddle_y = (c.height - paddle_height - SCREEN_BUFFER);

let isPlaying = false;

let bricks = [];
let working;
class brick
{
	constructor(x, y, color)
	{
		this.x = x;
		this.y = y;
		this.color = color;
		this.w = BRICK_WIDTH;
		this.h = BRICK_HEIGHT;
	}
}

function start()
{
	dx = 6 * ((Math.floor(Math.random() * 45) + 22.5) / 90);
	if(Math.random() >= 0.5) dx = -dx;
	dy = -6;
	ball_x = Math.floor(c.width / 2);
	ball_y = Math.floor((c.height / 4) * 3);
	makeBricks();
	isPlaying = true;
}

gameLoop();
function gameLoop()
{
	if(isPlaying)
	{
		draw();
		update();
	} 
	window.requestAnimationFrame(gameLoop);
}

window.onmousedown = function()
{ 
	isPlaying = false;
	start();
}

window.onmousemove = function(e)
{
	if(isPlaying && e.x >= paddle_width / 2 + SCREEN_BUFFER && e.x <= (c.width - SCREEN_BUFFER) - (paddle_width / 2)) paddle_x = e.x - paddle_width / 2;
}

function update()
{
	moveBall();
	checkCollision();
	checkWin();
}

function checkWin()
{
	if(bricks.length == 0) 
	{
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.font = "50px Arial";
		ctx.fillText("Game Over", (c.width - ctx.measureText("Game Over").width) / 2, c.height / 2 - 60);
		ctx.font = "65px Arial";
		ctx.fillText("Winner", (c.width - ctx.measureText("Winner").width) / 2, c.height / 2);
		isPlaying = false; 
	}
	else if(ball_y > c.height) 
	{ 
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.font = "50px Arial";
		ctx.fillText("Game Over", (c.width - ctx.measureText("Game Over").width) / 2, c.height / 2 - 60);
		ctx.font = "65px Arial";
		ctx.fillText("Loser", (c.width - ctx.measureText("Loser").width) / 2, c.height / 2);
		isPlaying = false; 
	}
}

function draw()
{
	ctx.clearRect(0,0,c.width,c.height);
	bricks.forEach(x => drawBrick(x));
	drawPaddle();
	drawBall();
}

function drawBrick(brick)
{
	ctx.beginPath(); 
	ctx.fillStyle = brick.color; 
	ctx.fillRect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT); 
	ctx.stroke();
	
	ctx.beginPath(); 
	ctx.fillStyle = "black"; 
	ctx.rect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT); 
	ctx.stroke();
}

function moveBall()
{
	if(ball_x < (SCREEN_BUFFER + BALL_RADIUS)) dx = -dx;
	if(ball_x > (c.width - BALL_RADIUS - BALL_RADIUS)) dx = -dx;
	if(ball_y < SCREEN_BUFFER + BALL_RADIUS) dy = -dy;
	
	if(ball_x - BALL_RADIUS >= paddle_x && ball_x + BALL_RADIUS <= paddle_x + paddle_width && ball_y + BALL_RADIUS >= paddle_y && ball_y - BALL_RADIUS < paddle_y + paddle_height)
	{
		dy = -Math.abs(dy);
	}

	ball_x += dx;
	ball_y += dy;
}

function drawPaddle()
{
	ctx.beginPath();
	ctx.fillRect(paddle_x, paddle_y, paddle_width, paddle_height);
	ctx.stroke();
}

function makeBricks()
{
	bricks = [];
	for(let i = 0; i < BRICKS_VERTICAL; i++)
	{
		for(let j = 0; j < BRICKS_HORIZONTAL; j++)
		{
			ctx.beginPath();

			switch(Math.floor(i / 2))
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

			var x = (SCREEN_BUFFER + ((BRICK_BUFFER + BRICK_WIDTH) * j));
			var y = (SCREEN_BUFFER + ((BRICK_BUFFER + BRICK_HEIGHT) * i));

			bricks.push(new brick(x, y, color));
		}
	}
}

function checkCollision()
{
	let working = bricks;
	working.forEach(x =>
		{
			var distX = Math.abs(ball_x - x.x - x.w / 2);
			var distY = Math.abs(ball_y - x.y - x.h / 2);		

			
			if (distX > (x.w / 2 + BALL_RADIUS)) { return; }
			if (distY > (x.h / 2 + BALL_RADIUS)) { return; }
		
			if (distX <= (x.w / 2)) { collided(x); dy = -dy; return; }
			if (distY <= (x.h / 2)) { collided(x); dx = -dx; return; }

			var mx = distX - x.w / 2;
			var my = distY - x.y / 2;

			if(mx * mx + my * my <= (BALL_RADIUS * BALL_RADIUS))
			{
				collided(x); dy = -dy; dx = -dx; return;
			}
		})
}

function collided(brick)
{
	let index = bricks.indexOf(brick);
	if (index > -1) {
		bricks.splice(index, 1);
	}
}

function drawBall()
{
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.arc(ball_x, ball_y, BALL_RADIUS, 0, Math.PI * 2, false);
	ctx.fill();
}