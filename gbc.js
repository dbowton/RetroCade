const gameboy = require("serverboy");
const fs = require("fs");

var instances = [];

async function FindInstance(user)
{
	let foundInstance = instances.find(i => i.name == user);
	if(foundInstance != undefined)
		return foundInstance;
	return false;
}

async function CreateGBCInstance(rom, user)
{
	await RemoveGBCInstance(user);

	let instance = new gameboy();
	instances.push(
		{
			name:user,
			game:instance,
			frameskip: 1,
			keys:[]
		}
	);

	let romdata = fs.readFileSync(rom);
	instance.loadRom(romdata);
}

async function RemoveGBCInstance(user)
{
	let foundInstance = await FindInstance(user);
	if(foundInstance!=false){
		// remove instance
		let index = instances.indexOf(foundInstance);
		instances.splice(index, 1);
	}
}

async function GetFrame(user)
{
	let instance = await FindInstance(user);
	instance.game.pressKeys(instance.keys);
	for(let i = 0; i < instance.frameskip; i++)
		instance.game.doFrame();

	return instance.game.getScreen();
}

async function KeyDown(user, key)
{
	let instance = await FindInstance(user);
	let index = instance.keys.indexOf(key);
	if(index === -1)
		instance.keys.push(key);
}

async function KeyUp(user, key)
{
	let instance = await FindInstance(user);
	let index = instance.keys.indexOf(key);
	if(index !== -1)
		instance.keys.splice(index, 1);
}

module.exports = {
	CreateGBCInstance,
	RemoveGBCInstance,
	GetFrame,
	KeyDown,
	KeyUp
}