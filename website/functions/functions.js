
// Get the form element
const form = document.getElementById('zipcode-form');

// Add an event listener to handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const zipcode = document.getElementById('zipcode').value;

    // Validate the zipcode
    if (!/^\d{5}(-\d{4})?$/.test(zipcode)) {
        alert('Invalid zip code');
        return;
    }

    // Fetch the weather data
    getWeatherDataFromApi({ zipcode })
        .then((data) => {
            // Update the page content with the weather data
            // ...
            console.log(data)
        })
        .catch((error) => {
            // Handle errors here
            console.error('ERROR:', error);
            alert('An error occurred while fetching the weather data');
        });
});




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



