"use strict";
const express = require("express");
const yelp = require("yelp-fusion");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5500;

app.listen(PORT, function() {
  console.log("listening on port", PORT);
});

app.use(express.static(__dirname + "\\public"));
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

var yelpKey = process.env.yelpKey || keys.yelpKey;
var googleKey = process.env.googleKey || keys.googleKey;

var client = yelp.client(yelpKey);

app.post("/yelp", function(req, res) {
  var searchParams = {
    categories: "",
    latitude: "",
    longitude: "",
    radius: "",
    limit: "50"
  };
  searchParams.categories = req.body.categories;
  searchParams.latitude = req.body.latitude;
  searchParams.longitude = req.body.longitude;
  searchParams.radius = req.body.radius;

  console.log(searchParams);
  client
    .search(searchParams)
    .then(response => {
      var pick = Math.floor(
        Math.random() * response.jsonBody.businesses.length
      );
      res.send(response.jsonBody.businesses[pick]);
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
  res.sendfile("/index.html");
});
