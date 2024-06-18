//apikey = e6be8d62e5714d6fa8600c9167ab59af
// official website of the API enpoint https://www.weatherbit.io/api/weather-current
//HTTP: http://api.weatherbit.io/v2.0/current
//HTTPS: https://api.weatherbit.io/v2.0/current
// latitute: 10°19'00.8"N | longitude: 123°57'53.6"E
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const API_Key = 'e6be8d62e5714d6fa8600c9167ab59af';
const app = express();
const port = 3000;
const URL = "http://api.weatherbit.io/v2.0/current?";
const dailyURL = "http://api.weatherbit.io/v2.0/forecast/daily?";
const hourlyURL = "http://api.weatherbit.io/v2.0/forecast/hourly?";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

function getDayOfTheWeek(day){
    let dateObject = new Date(day);
    let listofDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayOfTheWeek = dateObject.getDay();
    return listofDays[dayOfTheWeek];
}
function timeStamp(time){
    let currentTime = new Date(time);
    let options = { timeStyle: 'short', hour12: true };
    let timeString = currentTime.toLocaleTimeString('en-US', options);
    return timeString;
}

app.get('/', async (req,res)=>{

    try{
        const weatherData = await axios.get(`${URL}lat=10.304445&lon=123.945883&key=${API_Key}`);
        const dailyData = await axios.get(`${dailyURL}lat=10.304445&lon=123.945883&key=${API_Key}`);
        const hourlyData = await axios.get(`${hourlyURL}lat=10.304445&lon=123.9&key=${API_Key}&hours=5`);
        
        const dataIcon = weatherData.data.data[0].weather.icon;
        const imgIcon = `https://cdn.weatherbit.io/static/img/icons/${dataIcon}.png`;
        
        const timeData = [
            hourlyData.data.data[0].timestamp_local,
            hourlyData.data.data[1].timestamp_local,
            hourlyData.data.data[2].timestamp_local,
            hourlyData.data.data[3].timestamp_local,
            hourlyData.data.data[4].timestamp_local
        ];

        let time = new Date();
        let options = { timeStyle: 'short', hour12: true };
        let timeStrings = time.toLocaleTimeString('en-US', options);
        
        const hours = timeData.map(timeStampString=>timeStamp(timeStampString));
        const listOfHours = {
            hours0:hours[0],
            hours1:hours[1],
            hours2:hours[2],
            hours3:hours[3],
            hours4:hours[4],
        }
        const hourlyTemperatures = {
            hourlyTemp1:hourlyData.data.data[0].temp,
            hourlyTemp2:hourlyData.data.data[1].temp,
            hourlyTemp3:hourlyData.data.data[2].temp,
            hourlyTemp4:hourlyData.data.data[3].temp,
            hourlyTemp5:hourlyData.data.data[4].temp,
        }    
        const daysOfTheWeek = {
            day1:getDayOfTheWeek(dailyData.data.data[0].datetime),
            day2:getDayOfTheWeek(dailyData.data.data[1].datetime),
            day3:getDayOfTheWeek(dailyData.data.data[2].datetime),
            day4:getDayOfTheWeek(dailyData.data.data[3].datetime),
            day5:getDayOfTheWeek(dailyData.data.data[4].datetime),
        }; 
        res.render('pages/index',
            {
                imgIcon:imgIcon,
                data_Current_Weather:weatherData.data.data[0].weather.description, 
                data_Temperature:weatherData.data.data[0].temp,
                data_WindSpeed:weatherData.data.data[0].wind_spd, 
                data_City_Name:weatherData.data.data[0].city_name,
                data_SubTemperature1:dailyData.data.data[1].temp,
                data_current_SubWeather1:dailyData.data.data[1].weather.description,
                data_SubTemperature2:dailyData.data.data[2].temp,
                data_current_SubWeather2:dailyData.data.data[2].weather.description,
                data_SubTemperature3:dailyData.data.data[3].temp,
                data_current_SubWeather3:dailyData.data.data[3].weather.description,
                data_SubTemperature4:dailyData.data.data[4].temp,
                data_current_SubWeather4:dailyData.data.data[4].weather.description,
                listOfHours:listOfHours,
                hourlyTemperatures:hourlyTemperatures,
                actualTime:timeStrings,
                daysOfTheWeek:daysOfTheWeek,
            }
        );
    }catch(error){
        console.log(error);
        res.render('pages/index',{data:error});
    }
});
app.listen(port,(req,res) =>{
    console.log(`Server listening on port ${port}`);
}); 

/*
1.* change time to 12 hours format
2.* getDate() to get the actual time
3.* change goodmorning and goodevening according to the time.
4. change heading to days of the week. //example: Monday, Tuesday, Wednesday etc. //
5. responsive design and UI design.
*/