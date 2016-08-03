$(document).ready(function(){
	$('h1').css('color', 'red');
});

getLocation();

var x = document.getElementById("map-container");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
}




/*#header
#container
#map-container
#location-name*/
