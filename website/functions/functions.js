
/**
 * Fetches weather data from the API for the given parameters.
 * @param {Object} params - The parameters to pass to the API.
 * @param {number} params.zipcode - The zip code to fetch weather data for.
 * @returns {Promise<Object>} A promise that resolves with the weather data.
 */
const getWeatherDataFromApi = (params) => {
    // Make a POST request to the /get-weather-data endpoint
    return fetch('http://localhost:4001/get-weather-data', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then((response) => response.json())
        .then((weatherData) => {
            // Return the weather data
            return weatherData;
        })
        .catch((error) => {
            // Handle errors here
            console.error('ERROR:', error);
            throw error;
        });
};


