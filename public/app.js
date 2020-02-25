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
  
    $("#steakCheck").click(function() {
    if ($(this).val() === "false") {
      $(this).val("steak");
    } else if ($(this).val() === "steak") {
      $(this).val("false");
    }
  });
  
    $("#breakfastCheck").click(function() {
    if ($(this).val() === "false") {
      $(this).val("breakfast");
    } else if ($(this).val() === "breakfast") {
      $(this).val("false");
    }
  });
  
  
      $("#veganCheck").click(function() {
    if ($(this).val() === "false") {
      $(this).val("vegan");
    } else if ($(this).val() === "vegan") {
      $(this).val("false");
    }
  });
       
	   $("#pizzaCheck").click(function() {
    if ($(this).val() === "false") {
      $(this).val("pizza");
    } else if ($(this).val() === "pizza") {
      $(this).val("false");
    }
  });

  
  
  	   $("#chineseCheck").click(function() {
    if ($(this).val() === "false") {
      $(this).val("chinese");
    } else if ($(this).val() === "chinese") {
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
	  if ($("#steakCheck").val() === "steak") {
        categories.push($("#steakCheck").val());
      }
	  if ($("#breakfastCheck").val() === "breakfast") {
        categories.push($("#breakfastCheck").val());
      }
	  if ($("#veganCheck").val() === "vegan") {
        categories.push($("#veganCheck").val());
      }
	  if ($("#pizzaCheck").val() === "pizza") {
        categories.push($("#pizzaCheck").val());
      }
	  if ($("#chineseCheck").val() === "chinese") {
        categories.push($("#chineseCheck").val());
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
          yelpData.alias +
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
    
	radius = $("#displayMiles").text();
	radius *= 1609;
	console.log("category: ", categories);
	console.log("radius: ", radius);

    $.post(
      "/yelp",
      {
        categories: categories,
        latitude: lat,
        longitude: long,
		radius:radius
      },
      function(data) {
        yelpData = data;
        console.log("yelpData: ", yelpData);
		if (yelpData == "" ||yelpData == null ){
	    
		$("#resultName").text("No results for : " + categories +  " food try expanding radius?");
		$("#img2")
      .attr("src", yelpData.image_url)
      .attr("height", "0%")
      .attr("width", "0%");

		$("#resultAddr1").empty();
		$("#resultAddr2").empty();

		$("#rating").empty();
		 $("#maps").attr("src", "");
		}
		else{
        rerender(yelpData);
		}
      }
    );
  }
});

function fixMapsUrl(maps) {
  if (maps.includes(" ")) {
    maps = maps.replace(" ", "%20");
    fixMapsUrl(maps);
  } 
}
