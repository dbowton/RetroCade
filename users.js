const mongoose = require("mongoose");
const fs = require("fs");

function readFile(filename)
{
	return JSON.parse(fs.existsSync(filename) ?
	 fs.readFileSync(filename).toString() : "{}");
}

const dbInfo = readFile("db.json");
mongoose.connect(dbInfo.uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(function(result)
{
	console.log("connected to db");
}).catch(function(err)
{
	console.log("failed to connect to the db");
	console.error(err);
});

const userSchema = mongoose.Schema({
	username: String,
	password: String,
	email: String,
	gameInfo: [{game:String, data:Object}]
});

const sessionSchema = mongoose.Schema({
	sessionID: String,
	username: String,
	timeout: Date
});

const UserModel = mongoose.model("User", userSchema);
const SessionModel = mongoose.model("Session", sessionSchema);

async function addUser(username, password, email)
{
	const user = new UserModel({
		username: username, 
		password: password, 
		email: email
	});

	const userInfo = await user.save();

	return userInfo;
}

async function startSession(username)
{
	if(await checkSession())
		return await SessionModel.find({username: username});
	
	let timeoutTime = new Date(Date.now());
	timeoutTime.setSeconds(timeoutTime.getSeconds() + 20000);

	const session = new SessionModel({
		username: username, 
		sessionID: "",
		timeout: timeoutTime
	});

	const sessionInfo = await session.save();

	return sessionInfo;
}

async function removeSession(username)
{
	SessionModel.remove({username: username});
}

async function checkSession(username)
{
	const session = await SessionModel.find({username: username});
	if(!!session.length)
	{
		if(session.timeout > Date.now())
		{
			removeSession(username);
			return false;
		}
		else
		{
			let timeoutTime = new Date(Date.now());
			timeoutTime.setSeconds(timeoutTime.getSeconds() + 20000);

			SessionModel.updateOne(
				{username: username},
				{$set: {timeout: timeoutTime}},
				function(err){
					if(err) console.log(err);
				}
			);
		}
	}
	else
	{
		return false;
	}

	return true;
}

async function getUser(username)
{
	const users = await UserModel.find({username: username});
	return users[0];
}

async function getUserByEmail(email)
{
	const users = await UserModel.find({email: email});
	return users[0];
}

async function validateUserLogin(username, password)
{
	const user = await getUser(username);
	if(!user)
		return false;
	return password == user.password;
}

async function getGameData(username, game)
{
	let gameInfo = (await UserModel.findOne({username:username})).gameInfo.find(e=>e.game==game);
	if(gameInfo != undefined)
		return gameInfo.data;
	return undefined;
}

async function setGameData(username, game, data)
{
	UserModel.findOne({username:username}).then(async function(result){
		let gameFound = await getGameData(username, game);
		if(gameFound == undefined)
			result.gameInfo.push({game:game, data:data});
		else
			result.gameInfo.find(e=>e.game==game).data = data;

		
		result.save();
	});
}

module.exports = {
	startSession,
	removeSession,
	checkSession,
	addUser,
	getUser,
	getUserByEmail,
	validateUserLogin,
	getGameData,
	setGameData
};