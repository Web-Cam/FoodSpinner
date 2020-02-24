$(function() {
  navigator.geolocation.getCurrentPosition(getCoords);

  function getCoords(location) {
    var lat = location.coords.latitude.toString();
    var long = location.coords.longitude.toString();
    handleSubmit(lat, long);
  }

  $("#burgerCheck").click(function() {
    if ($(this).val() === "false") {
      $(this).val("burgers");
    } else if ($(this).val() === "burgers") {
      $(this).val("false");
    }
  });

  $("#tacoCheck").click(function() {
    if ($(this).val() === "false") {
      $(this).val("tacos");
    } else if ($(this).val() === "tacos") {
      $(this).val("false");
    }
  });

  function handleSubmit(lat, long) {
    $("#searchSubmit").click(function() {
      console.clear();

      var categories = [];

      if ($("#burgerCheck").val() === "burgers") {
        categories.push($("#burgerCheck").val());
      }
      if ($("#tacoCheck").val() === "tacos") {
        categories.push($("#tacoCheck").val());
      }
      if (categories.length > 1) {
        randPickCat(categories);
      }

      if (categories.length > 0) {
        setYelpData(lat, long, categories);
      }
    });
  }

  function randPickCat(categories) {
    console.log("more than one category, randomly choosing one...");
    console.log("categories", categories);

    var choosen = categories[Math.floor(Math.random() * categories.length)];
    categories.length = 0;
    categories.push(choosen);
  }

  function rerender(yelpData) {
    $("#resultName").text(yelpData.name);

    $("#img2")
      .attr("src", yelpData.image_url)
      .attr("height", "20%")
      .attr("width", "20%");

    $("#resultAddr1").text(yelpData.location.display_address[0]);
    $("#resultAddr2").text(yelpData.location.display_address[1]);

    $("#rating").text(yelpData.rating);
    $.post(
      "/google",
      {
        key: ""
      },
      function(data) {
        var googleKey = data.key;

        var maps =
          "https://www.google.com/maps/embed/v1/place?q=" +
          yelpData.name +
          "%20" +
          yelpData.location.display_address[0] +
          "&key=" +
          googleKey;

        fixMapsUrl(maps);

        $("#maps").attr("src", maps);
      }
    );
  }

  function setYelpData(lat, long, categories) {
    console.log("category: ", categories);
    $.post(
      "/yelp",
      {
        categories: categories,
        latitude: lat,
        longitude: long
      },
      function(data) {
        yelpData = data;
        console.log("yelpData: ", yelpData);
        rerender(yelpData);
      }
    );
  }
});

function fixMapsUrl(maps) {
  if (maps.includes(" ")) {
    maps = maps.replace(" ", "%20");
    fixMapsUrl(maps);
  } else if (maps.includes(" ") === false) {
    console.log("google maps api url: ", maps);
  }
}
