const express = require("express");
const app = express();

const PORT = 5001;

app.use(express.static('public'));
// Middleware
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");	
})

app.get("/surveybooks", (req, res) => {
	res.render("surveybooks");	
})

app.get("/surveytennis", (req, res) => {
	res.render("surveytennis");	
})

app.get("/admin", (req, res) => {
	res.render("admin");	
})

app.listen(PORT, () => {
	console.log("Server Started on:" + PORT);
})

