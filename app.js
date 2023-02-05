const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const PORT = 3000;
//require("dotenv").config();
//const TOKEN="7c87f27beda81ce7572c6851f5631a54";
const app = express();
// Using body parser

app.use(bodyParser.urlencoded({ extended: true }));
// Serving static files
app.use(express.static(__dirname));
app.set("view engine","ejs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=7c87f27beda81ce7572c6851f5631a54&units=metric`;
  https.get(URL, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      if (weatherData.cod === 200) {
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
      
       //res.write(`<H1>temperature is very= ${temperature}</H1>`);
       //res.write(`<h2> </h2>description= ${description}</h2>`);

       //res.write(`icon= ${icon}`);
       res.render("index1",{city:req.body.city,icon:icon,temperature:temperature,description:description});
       //res.send();
        //res.sendfile(__dirname+"/index1.html");
      } 
      else{
        res.render("index2",{city:req.body.city});
      } 
    
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ...`);
});