// Creating map object
var myMap = L.map("map", {
  center: [41.1400, -104.8202],
  zoom: 5
});

// Gray Mapbox background
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// function for choosing the color based on earthquake magnitude
function selectColor(magnitude) {
  if (magnitude >= 5) {
    return "#FF0000";
  }
  else if (magnitude >= 4) {
    return "#FF4600";
  }
  else if (magnitude >= 3) {
    return "#FF7B00";
  }
  else if (magnitude >= 2) {
    return "#FFAF00";
  }
  else if (magnitude >= 1) {
    return "#F7FF00";
  }
  else if (magnitude < 1) {
    return "#6AFF00";
  }
}

// function for determining circle size based on earthquake magnitude
function circleSize(magnitude) {
  return magnitude * 5;
}

// Grabbing the GeoJSON data with d3
d3.json(link, function(data) {

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },

    style: function(feature) {
      return {
        color: "white",
        fillColor: selectColor(feature.properties.mag),
        fillOpacity: 0.5,
        weight: 0.5,
        radius: circleSize(feature.properties.mag)
      };
    }



  }).addTo(myMap);

  

})