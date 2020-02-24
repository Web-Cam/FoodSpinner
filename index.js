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

if (process.env.local) {
} else {
  var keys = require("./public/keys.json");
}

var yelpKey = process.env.yelpKey || keys.yelpKey; //replace with your api key
var googleKey = process.env.googleKey || keys.googleKey;

var client = yelp.client(yelpKey);

app.post("/yelp", function(req, res) {
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

app.post("/google", function(req, res) {
  var key = {
    key: googleKey
  };
  res.send(key);
});

app.get("/", function(req, res) {
  res.sendfile(__dirname + "/index.html");
});
