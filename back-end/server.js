
// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const axios = require('axios');

// Start up an instance of app
const app = express();
dotenv.config();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("../website"));
/**
 * 
 */
const getWeatherData = async (zipCode) => {
  try {
    const { data } = await axios.get(`${process.env.BASE_URL}${zipCode}${process.env.API_KEY}`);
    console.log(data);
    return data
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}
// console.log(getWeatherData(27804))
app.post('/get-weather-data', async (req, res) => {
  console.log('req.body: ', req.body)
  const { zipCode } = req.body;
  const weatherData = await getWeatherData(zipCode);
  console.log(weatherData);
  res.send(weatherData);
})
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
// Setup Server
const port = process.env.Port;
app.listen(port, () => {
  console.log(`The app is running at http://localhost:${port}`);
});

