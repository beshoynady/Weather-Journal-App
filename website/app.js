/* Global Variables */
const generate = document.getElementById('generate');
// Create a new date instance dynamically with JS
let d = new Date();
var month= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let newDate = d.getDate() + ' / ' + month[d.getMonth()]+ ' / ' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=c0f74587b7a342204706abffa1c1627e&units=metric";
// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', performAction);


/* Function called by event listener */
function performAction(e) {
    const zipValue = document.getElementById('zip').value;
    const feelingsValue = document.getElementById('feelings').value;
    // console.log(baseURL+zipValue+apiKey)
    getData(baseURL, zipValue, apiKey)
    .then((data) => {
                // console.log(data);
                postData('/add', allDate={
                    "date": newDate,
                    "temp": data.main.temp,
                    "country":data.sys.country,
                    "content": feelingsValue
                })
                updateData();
            }
        )
}

/* Function to GET Web API Data*/
const getData = async (baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + key)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
        // appropriately handle the error
    }
}

/* Function to POST data */
const postData = async (url = '', allDate = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(allDate)
    });
    try {
        const newData = await response.json();
        // console.log(newData);
        return newData;
    } catch (error) {
        console.log(error);
        // appropriately handle the error
    }
}

/* Function to GET Project Data */
const updateData = async () => {
    const req = await fetch('/all');
    try {
        const returnDate = await req.json();
        console.log(returnDate);
        document.getElementById('date').innerHTML = `Date: ${returnDate.date}`;
        document.getElementById('temp').innerHTML = `temp: ${returnDate.temp} Celsius`;
        document.getElementById('country').innerHTML = `country: ${returnDate.country}`;
        document.getElementById('content').innerHTML = `feeling: ${returnDate.content}`
    }
    catch (error) {
        console.log(error);
    }
}