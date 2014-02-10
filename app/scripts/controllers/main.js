app.controller('MainCtrl', ['$rootScope', '$scope', '$location', 'geolocation', 'jobs', function ($rootScope, $scope, $location, geolocation, jobs) {
	'use strict';

	$scope.coords = {};

	geolocation.getLocation().then(function(data){
		$scope.coords = {
			lat:data.coords.latitude,
			long:data.coords.longitude
		};
	});
	
	var jobList = jobs;
	
	jobList.then(function(data){
		$scope.jobs = data.data;
	});

	var mapOptions = {
		zoom: 14,
		center: new google.maps.LatLng(40.0000, -98.0000),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

	$scope.markers = [];

	var infoWindow = new google.maps.InfoWindow(),
		image = '../img/money.png',
		createMarker = function (info){
			var marker = new MarkerWithLabel({
	            map: $scope.map,
	            position: new google.maps.LatLng(info.location.lat, info.location.long),
	            title: info.name,
	            labelContent: info.name,
				labelAnchor: new google.maps.Point(22, 0),
				labelClass: 'labels',
				labelStyle: {opacity: 0.75}
			});
			marker.content = '<div class="infoWindowContent">' + info.serviceName + '</div>';
        
			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.setContent('<h2>'+info.serviceName+'</h2>'+ info.serviceDesc +'<br /><a href="#/detail/'+info._id+'" class="button">Click</a>');
				infoWindow.open($scope.map, marker);
			});
        
			$scope.markers.push(marker);
    };
    
	jobList.then(function(data){
		$scope.jobs = data.data;
		for (var i = 0, iLength = data.data.length; i < iLength; i++){
			createMarker($scope.jobs[i]);
		}
	});

	$scope.openInfoWindow = function(e, selectedMarker){
		e.preventDefault();
		google.maps.event.trigger(selectedMarker, 'click');
	};
	
}]);

