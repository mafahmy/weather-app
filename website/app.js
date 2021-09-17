/* Global Variables */

const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=imperial&appid=23c201ff8b3d5bb7708b00f61531dbcd";

document.getElementById("generate").addEventListener("click", performAction); //click event listener

function performAction() {
  updateUi();

  let zipCode = document.getElementById("zip").value; //getting the value entered of zip code and the feelings
  let feels = document.getElementById("feelings").value;

  getData(baseUrl, zipCode, apiKey) // calling the getData function
    .then(function (data) {
      console.log(data);
      postData("/add", {
        temperature: data.main.temp,
        date: newDate,
        user_response: feels,
      }); // calling the postData function
    })
    .then(function () {
      updateUi();
    });
}
const postData = async (url = "", projectData = {}) => {
  // async function to post data to the server
  console.log(projectData);
  const res = await fetch(url, {
    // waiting to get the url
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData), // convert data into string format
  });

  try {
    const newData = await res.json(); //
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const getData = async (baseUrl, zipCode, apiKey) => {
  //async function to get data
  const res = await fetch(baseUrl + zipCode + apiKey); // calling API using fetch

  try {
    const projectData = await res.json(); //getting the data from API
    console.log(projectData);
    return projectData;
  } catch (error) {
    console.log("error", error);
  }
};
// Create a new date instance dynamically with JS
let d = new Date();
let month = d.getMonth() + 1;
let newDate = month + "." + d.getDate() + "." + d.getFullYear();

const updateUi = async () => {
  // async function for updating the ui
  const res = await fetch("/all"); // calling the server using fetch
  try {
    const allData = await res.json();
    document.getElementById("content").innerHTML = allData.user_response;
    document.getElementById("temp").innerHTML =
      "Temperaure: " + allData.temperature + " F"; // adding data to the page
    document.getElementById("date").innerHTML = "Date: " + newDate;
  } catch (error) {
    console.log("error", error); // catching error
  }
};
