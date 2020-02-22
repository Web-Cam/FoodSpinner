"use strict";
const express = require("express");
const yelp = require("yelp-fusion");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5500;

app.listen(PORT, function() {
  console.log("listening on port", PORT);
});

app.use(express.static("public"));
app.use(bodyParser.json("keys.json"));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

if (process.env.local != false) {
  var keys = require("./public/keys.json");
}

console.log(typeof process.env.local, process.env.local);

var yelpKey = process.env.yelpKey || keys.yelpKey; //replace with your api key
var googleKey = process.env.googleKey || keys.googleKey;

var client = yelp.client(yelpKey);

app.post("/params", function(req, res) {
  var searchParams = {
    term: "",
    latitude: "",
    longitude: ""
  };
  searchParams.term = req.body.term;
  searchParams.latitude = req.body.latitude;
  searchParams.longitude = req.body.longitude;
  client
    .search(searchParams)
    .then(response => {
      res.send(response.jsonBody.businesses[0]);
    })
    .catch(e => {
      console.log(e);
    });
});

app.post("/keys", function(req, res) {
  res.sendFile("keys.json");
});
