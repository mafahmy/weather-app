const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const axios = require('axios');

// Start up an instance of app
const app = express();
dotenv.config();

/* Middleware*/

// Cors for cross origin allowance
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("../website"));

/**
 * Fetches weather data for a given zip code.
 * @param {number} zipCode - The zip code to fetch weather data for.
 * @returns {Promise<Object>} The weather data for the given zip code.
 */
const getWeatherData = async (zipCode) => {
  try {
    const { data } = await axios.get(`${process.env.BASE_URL}${zipCode}${process.env.API_KEY}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

/**
 * Handles POST requests to the /get-weather-data endpoint.
 * Validates the zip code in the request body and fetches weather data for it.
 */
app.post('/get-weather-data', async (req, res, next) => {
  try {
    const { zipcode } = req.body;
    // Validate the zip code using a regular expression
    if (!/^\d{5}(-\d{4})?$/.test(zipcode)) {
      return res.status(400).send({ error: 'Invalid zip code' });
    }
    const weatherData = await getWeatherData(zipcode);
    res.send(weatherData);
  } catch (error) {
    next(error);
  }
});

/**
 * Error handling middleware.
 * Logs the error and sends an error response to the client.
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ Error: err });
});

// Setup Server
const port = process.env.Port;
app.listen(port, () => {
  console.log(`The app is running at http://localhost:${port}`);
});


