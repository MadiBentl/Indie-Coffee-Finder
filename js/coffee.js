$(document).ready(function(){

});
var map;
function initMap() {
	var myLatLng = {lat: 49.283, lng: -123.120};
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.283, lng: -123.120},
        scrollwheel: false,
        zoom: 6
    });
    var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
    })
};



/*#header
#container
#map-container
#location-name*/
