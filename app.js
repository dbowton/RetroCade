const express = require("express");
var path = require("path");
const users = require("./users");
const crypto = require('crypto');

async function hash(text)
{
	return crypto.createHash('sha256').update(text).digest('hex');
}

const port = 3000;
const app = express();
app.set("view engine", "ejs");

app.listen(port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/images", express.static("images"));

app.get(["/", "/login"], async function(req, res){
	res.render("login");
});

app.post("/login", async function(req, res){
	const username = req.body.username;
	const password = req.body.password;
	const hashedPassword = await hash(password);

	if(users.validateUserLogin(username, password))
		res.redirect("/index");
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
	res.redirect("/login");
});

app.get("/homepageTRIAL", async function(req, res){
	res.render("homepageTRIAL");
});

// 404 error page
app.use(function(req, res){
	res.status(404).render('error404', {page: req.url});
});