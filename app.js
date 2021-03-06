const express = require("express");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const http = require("http");
const socket = require("socket.io");
const users = require("./users");
const gbc = require("./gbc");
const crypto = require("crypto");
const fs = require("fs");

function readFile(filename) {
	return JSON.parse(fs.existsSync(filename) ?
		fs.readFileSync(filename).toString() : "{}");
}

async function hash(text) {
	return crypto.createHash("sha256").update(text).digest("hex");
}

async function redirectLogin(req, res, next) {
	if (await users.checkSession(req.cookies.username))
		next();
	else
		res.redirect("/login");
}

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = socket(server, { cors:{ origin:"*" }});

app.set("view engine", "ejs");

server.listen(port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(multer().none());

// static 
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/images", express.static("images"));
app.use("/unityBuilds", express.static("unityBuilds"));
app.use("/roms", express.static("roms"));

app.get(["/", "/home"], redirectLogin, async function (req, res) {
	res.render("home");
});

app.get("/login", async function (req, res) {
	res.render("login");
});

app.post("/login", async function (req, res) {
	const username = req.body.username;
	const password = req.body.password;

	const hashedPassword = await hash(password);

	if (await users.validateUserLogin(username, hashedPassword)) {
		if (!await users.checkSession(username))
			await users.startSession(username);

		if (!req.cookies.username || req.cookies.username != username)
			res.cookie("username", username);

		res.redirect("/home");
	}
	else
		res.redirect("/login?error=error.auth.usernameOrEmailIncorect");

});

app.get("/logout", async function(req, res){
	const username = req.cookies.username;
	res.clearCookie("username");
	users.removeSession(username);
	res.redirect("/login");
});

app.get("/register", async function (req, res) {
	res.render("register");
});

app.post("/register", async function (req, res) {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const confpassword = req.body.confpassword;
	const hashedPassword = await hash(password);

	// validate password
	if (await hash(confpassword) != hashedPassword) {
		res.redirect("/register?error=error.auth.passwordsDontMatch");
		return;
	}

	// validate username
	if (!!await users.getUser(username)) {
		res.redirect("/register?error=error.auth.usernameTaken");
		return;
	}

	// validate email
	if (!!await users.getUserByEmail(email)) {
		res.redirect("/register?error=error.auth.emailTaken");
		return;
	}

	// add user
	users.addUser(username, hashedPassword, email);
	users.startSession(username);
	res.cookie("username", username);
	res.redirect("/home");
});

// get user data
app.get("/userData", redirectLogin, async function (req, res) {
	const username = req.cookies.username;
	const user = await users.getUser(username);
	res.send(user);
});

// get user data for game
app.get("/getGameData/:game", redirectLogin, async function (req, res) {
	const username = req.cookies.username;
	const game = req.params.game;
	const gameData = await users.getGameData(username, game);
	res.send(gameData);
});

// set user data for game
app.post("/setGameData/:game", redirectLogin, async function (req, res) {
	const username = req.cookies.username;
	const game = req.params.game;
	const data = await JSON.parse(await req.body.data);
	users.setGameData(username, game, data);
	res.send("success");
});

app.get("/gameList", redirectLogin, async function (req, res) {
	const gameData = readFile("games.json");
	res.send(gameData);
});

app.get("/games/:game", redirectLogin, async function (req, res, next) {
	const gameName = req.params.game;
	const gameData = readFile("games.json");
	const game = gameData.games.find(e => e.name == gameName);
	if (game != undefined)
		res.render("games/" + game.file);
	else
		next();
});

// gameboy
io.on("connection", async function(soc){
	var gameloop;
	soc.on("createGBCInstance", async function(data){
		gbc.CreateGBCInstance("./roms/" + data.rom, soc.id);

		gameloop = setInterval(doFrame, 1/60);

		async function doFrame()
		{
			soc.emit("frame", {
				screen: await gbc.GetFrame(soc.id),
				audio: await gbc.GetAudio(soc.id)
			});
		}
	});

	soc.on("keydown", async function(data){
		gbc.KeyDown(soc.id, data.key);
	});
	soc.on("keyup", async function(data){
		gbc.KeyUp(soc.id, data.key);
	});

	soc.on("disconnect", async function(){
		gbc.RemoveGBCInstance(soc.id);
		clearInterval(gameloop);
	});
});

// 404 error page
app.use(function (req, res) {
	res.status(404).render("error404", { page: req.url });
});