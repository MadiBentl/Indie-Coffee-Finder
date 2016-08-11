$(document).ready(function(){

});

var map;
var infoWindow;
var service;

function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(47.53772, -122.1153),
        zoom: 11,
        styles: [
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
        new google.maps.LatLng(47.5204, -122.2047),
        new google.maps.LatLng(47.5986, -122.0672)),
        	keyword: 'park',
			types: ['park']
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
              	alert(status);
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
