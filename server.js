// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express=require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require("body-Parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port=5500;
app.listen(port,function(){
    console.log(`server is running on port: ${port}`);
});

//<----- GET route ------>//

app.get("/getAllData", getIt);
function getIt(req,res){
    res.send(projectData);
};
//<----- POST route ------>//

app.post("/saveAllData",saveIt);
function saveIt(req,res){
    projectData= req.body;
    res.send(projectData);
};

