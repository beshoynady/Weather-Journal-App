// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 5500;
app.listen(port, () => {
    console.log(`server ${port}`)
})

app.get('/all', (req, res) => {
    res.send(projectData);
    projectData = {};
});

app.post('/add', (req, res) => {
    const newEntery = {
        date: req.body.date,
        temp: req.body.temp,
        country: req.body.country,
        content: req.body.content,
    };
    projectData = newEntery;
    res.send(projectData);
});
