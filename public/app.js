$(function() {
  navigator.geolocation.getCurrentPosition(getCoords);

  function getCoords(location) {
    var lat = location.coords.latitude.toString();
    var long = location.coords.longitude.toString();
    handleSubmit(lat, long);
  }

  function handleSubmit(lat, long) {
    $("#searchSubmit").click(function() {
      if ($("#search").val() != "") {
        var term = $("#search").val();
        $("#search").val("");

        setYelpData(lat, long, term);
      }
    });

    $("#search").on({
      keydown: function(event) {
        if (event.which === 13 && $("#search").val() != "") {
          var term = $("#search").val();
          $("#search").val("");

          setYelpData(lat, long, term);
        }
      },

      keypress: function(event) {
        if (event.which === 13 && $("#search").val() != "") {
          var term = $("#search").val();
          $("#search").val("");

          setYelpData(lat, long, term);
        }
      }
    });
  }

  function rerender(yelpData) {
    $("#resultName").text(yelpData.name);

    $("img")
      .attr("src", yelpData.image_url)
      .attr("height", "20%")
      .attr("width", "20%");

    $("#resultAddr1").text(yelpData.location.display_address[0]);
    $("#resultAddr2").text(yelpData.location.display_address[1]);

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

  function setYelpData(lat, long, term) {
    $.post(
      "/yelp",
      {
        term: term,
        latitude: lat,
        longitude: long
      },
      function(data) {
        yelpData = data;
        console.log("yelpData", yelpData);
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
    console.log("maps api link", maps);
  }
}
