// Victoria Wellington
//app to get pictures of seattle city traffic locations and georeference them with google maps

"use strict";


$(document).ready(function(){
	 var mapOptions = {
	          center: { lat: 47.6, lng: -122.3},
	          zoom: 12
	 };
	var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);
	var info = new google.maps.InfoWindow();
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
	 					title: camInfo,
	 					animation: google.maps.Animation.DROP,

	 				});

	 				//do stuff with marker
	 				google.maps.event.addListener(marker, 'click', function() {
	                    map.panTo(marker.getPosition());
	                    var html = '<p>' + camInfo + '</p><img src="' + camPic.url  + '"/>';
	                    infoWindow.setContent(html);
	                    infoWindow.open(map, this); 
                    

              		 });//end of setting up markers
	 				google.maps.event.addListener(map, 'click', function() {
						infoWindow.close();
					});
	 				//make searchable
	 				$('#search').bind('search keyup', function() {
						var search = this.value.toLowerCase();
						if(camInfo.toLowerCase().indexOf(search) < 0) {
							marker.setMap(null);
						} else {
							marker.setMap(map);
						}
					});//end of search settings

	 			});//end of setting up data element

	 			

	 		})//end of success

	 	.fail(function(error){
	 			alert("Unable to access traffic camera data at this time!");
	 		}
	 	);

}) ;


