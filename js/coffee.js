$(document).ready(function(){

});

 /*getLocation();

var location,
	latt,
	lon;
function getLocation() {
    $.get("http://ipinfo.io", function(location) {
      console.log(location);
      
      location= location.city + location.region;
      $('.location')
        .append(location.city + ", ")
        .append(location.region);

    }, "jsonp");

  }
function convertLocation(){
	var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': 'location'}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            latt= results[0].geometry.location.lat();
            lon= results[0].geometry.location.lng();
            console.log(latt + " " + lon) 
          } else {
            alert("Something got wrong " + status);
          }
    });
}

var map;
function initMap() {
	var myLatLng = {lat: latt, lng: lon};
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: latt, lng: lon},
        scrollwheel: false,
        zoom: 6
    });
    var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
    })
};

*/

/*#header
#container
#map-container
#location-name*/
