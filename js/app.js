// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

$(document).ready(function(){
	 var mapOptions = {
	          center: { lat: 47.6, lng: -122.3},
	          zoom: 12
	 };
	var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);
	var info = new google.maps.InfoWindow();
	var cams = [];  //list of all cameras as markers
	var infoWindow = new google.maps.InfoWindow();
	$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
	 		.done(function(data){
	 			data.forEach(function(data) {
	 				var placement = {
                        lat: Number(data.location.latitude),
                        lng: Number(data.location.longitude)
	 				}; 
	 				var camInfo = data.cameralabel; 
	 				var camPic = data.imageurl;

	 				var marker = new google.maps.Marker({
	 					position: placement,
	 					map: map,
	 					title: camInfo
	 				});
	 				cams.push(marker);

	 				//do stuff with marker
	 				google.maps.event.addListener(marker, 'click', function() {
                    map.panTo(marker.getPosition());
                    var html = '<p>' + camInfo + '</p><img src="' + camPic.url  + '"/>';
                    infoWindow.setContent(html);
                    infoWindow.open(map, this); 
                    

                });

	 			});//end of setting up data element

	 			

	 		})//end of success

	 	.fail(function(error){
	 			alert("Unable to access traffic camera data at this time!");
	 		}
	 	);

}) ;


