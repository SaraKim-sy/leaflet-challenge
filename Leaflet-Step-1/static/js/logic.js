// Creating map object
var myMap = L.map("map", {
  center: [41.1400, -104.8202],
  zoom: 5
});

// Adding tile layer to the map
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
    return "#FF5700";
  }
  else if (magnitude >= 3) {
    return "#FF9E00";
  }
  else if (magnitude >= 2) {
    return "#FFF600";
  }
  else if (magnitude >= 1) {
    return "#C2FF00";
  }
  else if (magnitude < 1) {
    return "#47FF00";
  }
}

// function for determining circle size based on earthquake magnitude
function circleSize(magnitude) {
  return magnitude * 10;
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
        weight: 0.7,
        radius: circleSize(feature.properties.mag)
      };
    },

    // popups that provide additional information about the earthquake when a marker is clicked.
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`<h6>Earthquake Information</h6><hr><b>Location:</b> ${feature.properties.place}<br><b>Magnitude:</b> ${feature.properties.mag}`)
    }
  }).addTo(myMap);

  //////// Legend ////////
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function() {

    var div = L.DomUtil.create('div', 'legend'),

    categories = [0, 1, 2, 3, 4, 5];
    div.innerHTML = '<b>Magnitude</b><hr>'

    categories.forEach(magnitude => {
      var category = `${magnitude}-${magnitude+1}`;
      if (magnitude >= 5) {
        category = `${magnitude}+`
      }
      div.innerHTML += 
        '<i style="background:' + selectColor(magnitude) + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</i> ' + category + '<br>';

    })

    return div;
    };
    legend.addTo(myMap);

});