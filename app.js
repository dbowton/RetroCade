const express = require("express");
const cookieParser = require('cookie-parser');
const users = require("./users");
const crypto = require("crypto");

async function hash(text)
{
	return crypto.createHash("sha256").update(text).digest("hex");
}

async function redirectLogin(req, res, next)
{
	if(await users.checkSession(req.cookies.username))
		next();
	else
		res.redirect("/login");
	
}

const port = 3000;
const app = express();
app.set("view engine", "ejs");

app.listen(port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// static 
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/images", express.static("images"));

app.get(["/", "/login"], async function(req, res){
	res.render("login");
});

app.post("/login", async function(req, res){
	const username = req.body.username;
	const password = req.body.password;

	if(await users.checkSession(req.cookies.username))
	{
		res.redirect("/home");
		return;
	}

	const hashedPassword = await hash(password);

	if(users.validateUserLogin(username, hashedPassword))
	{
		await users.startSession(username);
		res.cookie("username", username);
		res.redirect("/home");
	}
	else
		res.redirect("/login?error=error.auth.usernameOrEmailIncorect");
	
});

app.get("/register", async function(req, res){
	res.render("register");
});

app.post("/register", async function(req, res){
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const confpassword = req.body.confpassword;
	const hashedPassword = await hash(password);
	
	// validate password
	if(await hash(confpassword) != hashedPassword){
		res.redirect("/register?error=error.auth.passwordsDontMatch");
		return;
	}

	// validate username
	if(!!await users.getUser(username)){
		res.redirect("/register?error=error.auth.usernameTaken");
		return;
	}

	// validate email
	if(!!await users.getUserByEmail(email)){
		res.redirect("/register?error=error.auth.emailTaken");
		return;
	}
	
	// add user
	users.addUser(username, hashedPassword, email);
	users.startSession(username);
	res.cookie("username", username);
	res.redirect("/home");
});

app.get("/home", redirectLogin, async function(req, res){
	res.render("home");
});

// 404 error page
app.use(function(req, res){
	res.status(404).render('error404', {page: req.url});
});