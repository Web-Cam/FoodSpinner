$(function() {
  var lat;
  var long;
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude.toString();
    long = position.coords.longitude.toString();
  });

  $("#searchSubmit").click(function() {
    $.post(
      "/params",
      {
        term: $("#search").val(),
        latitude: lat,
        longitude: long
      },
      function(data, status) {
        console.log(data);

        $("img")
          .attr("src", data.image_url)
          .attr("height", "20%")
          .attr("width", "20%");

        $("#resultName").text(data.name);

        $("#resultAddr1").text(data.location.display_address[0]);
        $("#resultAddr2").text(data.location.display_address[1]);
      }
    );
  });
});
