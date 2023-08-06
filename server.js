// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors()); 
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 4001;
app.get("/all", (req, res) => {
  //   get route to '/all'
  res.send(projectData); // send it to projectdata
});

app.post("/add", (req, res) => {
  // post route to '/add'
  const { temperature, date, user_response } = req.body;
  projectData = { temperature, date, user_response };
  res.send(projectData);
  console.log(projectData);
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ Error: err });
});

app.listen(port, () => {
  console.log(`app is running on port : ${port}`);
});

