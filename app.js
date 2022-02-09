const express = require("express");
var path = require("path");

const port = 3000;
const app = express();
app.set('view engine', 'ejs');

app.listen(port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/images", express.static("images"));

app.get("/", function(req, res){
	res.render("index");
});