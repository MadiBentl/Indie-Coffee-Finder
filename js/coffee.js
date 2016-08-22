var latitude= 49.2302,
	longitude= -122.9952;

var map;
var infoWindow;
var service;
var city;

$(document).ready(function(){	
	getLocation();
	initialize();
	
	function getLocation(){
		if(getGeoLocation() != true){
			getLocationWithIP();
			getCity();
		}
	}
	
	function getLocationWithIP() {
	    $.get("http://ipinfo.io", function(location) {
	      console.log(location);
	      
	      $("#location")
	        .append(location.city);
	    }, "jsonp");
	
	  }
	  
	function getCity(){
		$.getJSON("http://www.geoplugin.net/json.gp?jsoncallback=?", function(data) {
			var city = data.geoplugin_city;	
			console.log(data.geoplugin_city);
			$("#location").append(city);
		});
	}
//HTML5 Geolocation Search
	function getGeoLocation(){
		var x = document.getElementById("demo");
		function getGeo() {
		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(showPosition);
		        return true;
		    } else {
		        return false;
		    }
		}
		function showPosition(position) {
		    latitude= position.coords.latitude;
		    longitude= position.coords.longitude; 
		}
	}
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
	    defaultMarker(results[0]);
	}

	function createCafeInfo(result){
		var cafeDetails = {
			name: result.name,
			address: result.formatted_address,
			hours: result.opening_hours.periods[0].open.time + " - " + result.opening_hours.periods[0].close.time
		};
		$("#cafeInfo").html("");
		for (detail in cafeDetails){
			$('<div/>',{
				class: "detail",
				text: cafeDetails[detail]
				}).appendTo("#cafeInfo");
			

			console.log(cafeDetails[detail]);
		}
		
	}
	
	function defaultMarker(cafe){
		createCafeInfo(cafe);
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
	            createCafeInfo(result);
	            infoWindow.setContent(result.name);
	            infoWindow.open(map, marker);
	        });
	    });
	}


      initialize();

});
      /*#header
#container
#map-container
#location-name*/
