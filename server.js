// End Point
const projectData = {};

// Set up express server
const express = require('express');
const app = express();
const path = require('path');

// install CORS and middleware
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('src'));

// Start server
const port = 9091;
app.listen(port, function(){
	console.log("Server started... Port: " + port);
})

app.get("/", (req,res)=>{
	res.sendFile(path.resolve('src/index.html'));
})

app.post("/add", (req,res)=>{
	projectData.previousSearchTerms = req.body.include;
	projectData.cuisine = req.body.cuisine;
})