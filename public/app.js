$(function() {
  var lat;
  var long;
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude.toString();
    long = position.coords.longitude.toString();
  });

  $("#searchSubmit").click(function() {
    returnData();
  });

  $("#search").on({
    keydown: function(event) {
      if (event.which === 13) {
        returnData();
        $(this).val("");
      }
    }
  });

  function returnData() {
    $.post(
      "/params",
      {
        term: $("#search").val(),
        latitude: lat,
        longitude: long
      },
      function(data, status) {
        console.log(data);

        $("#resultName").text(data.name);
        //.before("<img src=''></img>");

        $("img")
          .attr("src", data.image_url)
          .attr("height", "20%")
          .attr("width", "20%");

        googleKey = ENV["googleKey"]; //replace with your api key

        var maps =
          "https://www.google.com/maps/embed/v1/place?q=" +
          data.name +
          "%20" +
          data.location.address1 +
          "&key=" +
          googleKey;

        fixMapsUrl(maps);

        $("#resultAddr1").text(data.location.display_address[0]);
        $("#resultAddr2").text(data.location.display_address[1]);

        $("#maps").attr("src", maps);
      }
    );
  }
});

function fixMapsUrl(maps) {
  if (maps.includes(" ")) {
    maps = maps.replace(" ", "%20");
    fixMapsUrl(maps);
  } else if (maps.includes(" ") === false) {
    console.log(maps);
  }
}
