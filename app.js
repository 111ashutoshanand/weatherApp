//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-Parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req, res) {
  var apiKey = "f98ebf7983222c5521d4095617a42de3";
  var query = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      res.write("<h1>Live weatherData</h1>");
      res.write("<h2>" + query + " temperature is " + weatherData.main.temp + " F<sup>0C</sup></h2>");
      res.write("<h3>" + weatherData.weather[0].description + "</h3>");
      res.write("<img src= http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png >");
      res.send();
    });
  });

});

app.listen(3000, function() {
  console.log("Server port number 3000");
});
