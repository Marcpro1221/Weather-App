//apikey = e6be8d62e5714d6fa8600c9167ab59af
// official website of the API enpoint https://www.weatherbit.io/api/weather-current
//HTTP: http://api.weatherbit.io/v2.0/current
//HTTPS: https://api.weatherbit.io/v2.0/current

import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from "path";
import axios from 'axios';
import { fileURLToPath } from "url";

const API_Key = 'e6be8d62e5714d6fa8600c9167ab59af';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const URL = "http://api.weatherbit.io/v2.0/current?";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', async (req,res)=>{
    const weatherData = await axios.get(`${URL}city=cebu&key=${API_Key}`);
    const data = JSON.stringify(weatherData.data);
    console.log(data);
    res.sendFile(__dirname + '/html/index.html');
});
app.listen(port,(req,res) =>{
    console.log(`Server listening on port ${port}`);
});

/*
1. Create a request to display city name, temperature, wind speed, description of the weather status
2. Figure out how to connect express server to public js file to identify the current weather
 and change the image of the weather according to the status.
3. change the image and code it on js file, to display current weather
4. Responsive web
5. Design
6. (optional) use Location to track the weather
*/