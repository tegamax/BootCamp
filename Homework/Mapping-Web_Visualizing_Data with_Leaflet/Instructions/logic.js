
  // Create a map object
  var myMap = L.map("map", {
    center: [10, 100],
    zoom: 2,
  });

var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);



var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

// Grab the data with d3
d3.json(url, function(response) {


  // L.circle([response.features[0].geometry.coordinates[1],response.features[0].geometry.coordinates[0]],response.features[0].properties.mag * 15000 )
  // .addTo(myMap);


  // Loop through data
  for (var i = 0; i < response.features.length; i++) {

    // Set the data location property to a variable
    var earthquake = response.features[i]

    // Check for location property
    if (earthquake) {


        // Conditionals for countries points
  var color = "";
  if (earthquake.properties.mag> 6.5) {
    color = "tomato";
  }
  else if (earthquake.properties.mag > 6.0) {
    color = "orange";
  }
  else if (earthquake.properties.mag> 5.5) {
    color= "yellow";
  }
  else if (earthquake.properties.mag> 5.0) {
    color= "limegreen";
  }
  else {
    color= "green";
  }

      // Add circles to map
var circle = L.circle([earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]], {
        fillOpacity: 0.8,
         color: color,
        fillColor: color,
       // Adjust radius
        radius: earthquake.properties.mag * 55000
       }).bindPopup("<h1>" + earthquake.properties.place + "</h1> <hr> <h3>Magnitute: " + earthquake.properties.mag + "</h3>")
        .addTo(myMap);


 }

  
};

var baseMaps = {
  Light: light
  // Dark: dark
};

var overlayMaps = {
  "Earthquakes": circle,
}

L.control.layers(baseMaps, overlayMaps).addTo(myMap);
// function getColor(d) {
//   return d === '> 6.5'  ? "tomato" :
//          d === '6.0'  ? "orange" :
//          d === '5.5' ? "yellow" :
//          d === '5.0' ? "limegreen" :
//                       "green";
// }

// var legend = L.control({position: "bottomleft" });
//     legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend');
//     labels = ['<strong>Categories</strong>'],
//     categories = ['Road Surface','Signage','Line Markings','Roadside Hazards','Other'];

//     for (var i = 0; i < categories.length; i++) {

//             div.innerHTML += 
//             labels.push(
//                 '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
//             (categories[i] ? categories[i] : '+'));

//         }
//         div.innerHTML = labels.join('<br>');
//     return div;
//     };
//     legend.addTo(map);


});





// var legend = L.control({ position: "bottomleft" });
// legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend white maplegend");
//     var limits = circle.options.limits;
//     var colors = circle.options.colors;
//     var labels = [];

//     // Add min & max
//     var legendInfo = "<h4>Average Price</h4>" +
//         "<div class=\"labels\">" +
//         "<div style='font-size:12px;'>" + limits[0] + "</div>" +
//         "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//         labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });
    
//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     div.innerHTML += "<div style='font-size:12px;'>" + (limits[limits.length - 1]).toFixed(2) + "</div>";
        
//     return div;
// };

// // Adding legend to the map
// legend.addTo(myMap);



