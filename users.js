const mongoose = require("mongoose");
const fs = require('fs');

function readFile(filename)
{
	return JSON.parse(fs.existsSync(filename) ?
	 fs.readFileSync(filename).toString() : '{}');
}

const dbInfo = readFile("db.json");

const db = mongoose.connect(dbInfo.uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(function(result)
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

const UserModel = mongoose.model("User", userSchema);

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
	return user.password === password;
}

module.exports = {
	addUser,
	getUser,
	getUserByEmail,
	validateUserLogin
};