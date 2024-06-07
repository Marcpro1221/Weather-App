//apikey = e6be8d62e5714d6fa8600c9167ab59af
//HTTP: http://api.weatherbit.io/v2.0/current
//HTTPS: https://api.weatherbit.io/v2.0/current

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port,(req,res) =>{
    console.log(`Server listening on port ${port}`);
});