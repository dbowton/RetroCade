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