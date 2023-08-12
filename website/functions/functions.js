
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

    // Fetch the weather data and update UI
    updateWeatherDataUi(zipcode);


});

/**
 * Updates the weather data UI with data fetched from the API.
 * @param {string} zipcode - The zipcode to fetch weather data for.
 */
const updateWeatherDataUi = async (zipcode) => {
    // Fetch the weather data from the API
    await getWeatherDataFromApi({ zipcode })
        .then((data) => {
            // Check if data was returned

            // Update the page content with the weather data
            document.getElementById('temperature').textContent = `${data.main.temp} F`;
            document.getElementById('maxTemp').textContent = `${data.main.temp_max} F`;
            document.getElementById('minTemp').textContent = `${data.main.temp_min} F`;
            document.getElementById('feelsLike').textContent = `${data.main.feels_like} F`;
            document.getElementById('humidity').textContent = `${data.main.humidity} %`;
            document.getElementById('windSpeed').textContent = `${data.wind.speed} m/hr`;
            document.getElementById('cityName').innerText = `${data.name}`;

            // Show the weather-data-container
            const weatherDataContainer = document.querySelector('.weather-data-container');
            weatherDataContainer.style.display = 'flex';
            weatherDataContainer.scrollIntoView({ behavior: 'auto' });

            // Add an event listener to the close button
            document.querySelector('.close-button').addEventListener('click', () => {
                // Hide the weather-data-container and clear the zipcode input field
                document.querySelector('.weather-data-container').style.display = 'none';
                document.getElementById('zipcode').value = '';
            });

        })
        .catch((error) => {
            // Handle errors here
            alert('An error occurred while fetching data and adding it to the UI');
        });
};


/**
 * Fetches weather data from the API for the given parameters.
 * @param {Object} params - The parameters to pass to the API.
 * @param {number} params.zipcode - The zip code to fetch weather data for.
 * @returns {Promise<Object>} A promise that resolves with the weather data.
 */
const getWeatherDataFromApi = async (params) => {
    // Make a POST request to the /get-weather-data endpoint
    try {
        const response = await fetch('http://localhost:4001/get-weather-data', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        // Handle errors here
        console.error('ERROR:', error);
        throw error;
    }
};



