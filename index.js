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
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const client = yelp.client(
  "1Tqf6RIYHXMtrF_MNnDQ6V4PIgZrIsdK_kJs9XO0A9jCd2JBRli1Dkv6f2vvOCpfRMj-FDvXnI-yGChvbTjQSAe55iRbHyj7CCTZG8FzobUogEU7K8rSAe6rpJZNXnYx"
);

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
