var latitude= 49.2302,
	longitude= -122.9952;

var map;
var infoWindow;
var service;

/*$(document).ready(function(){
	getlocation();
	
	function getlocation() {
	    $.get("http://ipinfo.io", function(location) {
	      console.log(location);
	      
	      $("#location")
	        .append(location.city);
	    }, "jsonp");
	
	  }

});*/

$.getJSON('https://freegeoip.net/json/') 
     .done (function(location)
     {
          $('#location').append(location.city);
          latitude= location.latitude;
          longitude= location.longitude;
          console.log(latitude + ", " + longitude);
          console.log(location);
     });
     
function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 11,
		scaleControl: false,
		scrollwheel: false,
		disableDoubleClickZoom: true,
        styles: [
	        {
		        featureType: 'all',
	            stylers:[
		            {saturation: -40}
	            ]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [
                { hue: 'white' },
                { saturation: 30 }
              ]
            },
            {featureType: 'poi',
	            elementType: 'labels',
	            stylers:[
		            {visibility: 'off'}
	            ]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [
                { lightness: 100 },
                { visibility: 'simplified' }
              ]
            },
            {
              stylers: [
                { visibility: 'simplified' }
              ]
            },
            {
              elementType: 'labels',
              stylers: [
                { visibility: 'on' }
              ]
            }
        ]
    });

    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
}

function performSearch() {
    var request = {
        bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng((latitude - 0.3), (longitude - 0.3)),
        new google.maps.LatLng((latitude + 0.3), (longitude + 0.3))),
        	keyword: 'cafe',
			types: ['cafe']
        };
    service.radarSearch(request, callback);
}

function callback(results, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
    }
    for (var i = 0, result; result = results[i]; i++) {
        createMarker(result);
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/yellow-dot.png'
    });

    google.maps.event.addListener(marker, 'click', function() {
        service.getDetails(place, function(result, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
			  	return;
            }
            infoWindow.setContent(result.name);
            infoWindow.open(map, marker);
        });
    });
}


      initialize();
      /*#header
#container
#map-container
#location-name*/
