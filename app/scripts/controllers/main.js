app.controller('MainCtrl', ['$rootScope', '$scope', '$location', 'geolocation', 'jobs', function ($rootScope, $scope, $location, geolocation, jobs) {
	'use strict';

	$scope.coords = {};

	console.log($scope.user);

	geolocation.getLocation().then(function(data){
		$scope.coords = {
			lat:data.coords.latitude,
			long:data.coords.longitude
		};
		$scope.map.setCenter(new google.maps.LatLng($scope.coords.lat, $scope.coords.long));
		//Places Marker where user is
		$scope.marker = new MarkerWithLabel({
			map: $scope.map,
			position: new google.maps.LatLng($scope.coords.lat, $scope.coords.long),
			icon: '../images/you.png',
			labelContent: 'You',
			labelAnchor: new google.maps.Point(16, 0),
			animation: google.maps.Animation.DROP,
			labelClass: 'labels',
			labelStyle: {opacity: 1}
		});
		
	});
	
	var jobList = jobs;
		
	
	jobList.then(function(data){
		$scope.jobs = data.data;
		var total = 0;
		for (var i = 0; i < $scope.jobs.length; i ++){
			total = (total + parseInt($scope.jobs[i].cost.amount));
		}
		$scope.total = total;
	});

	var mapOptions = {
		zoom: 14,
		center: new google.maps.LatLng(0,0),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

	$scope.markers = [];

	var infoWindow = new google.maps.InfoWindow(),
		image = '../images/green-flag.png',
		createMarker = function (info){
			var marker = new MarkerWithLabel({
				map: $scope.map,
				position: new google.maps.LatLng(info.location.lat, info.location.long),
				icon: image,
				title: info.name,
				labelContent: '$'+info.cost.amount,
				labelAnchor: new google.maps.Point(20, 22),
				labelClass: 'label-job',
				labelStyle: {opacity: 1}
			});
			marker.content = '<div class="infoWindowContent">' + info.serviceName + '</div>';
        
			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.setContent('<h4>'+info.serviceName+'</h4>'+ info.serviceDesc +'<br /><a href="#/detail/'+info._id+'" class="button"><i class="icon-plus"></i>Do it</a>');
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
	
	var geocoder;
	$scope.codeAddress = function(){
		geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': $scope.location}, function(results, status) {
			if (status === 'OK') {
				$scope.map.setCenter(results[0].geometry.location);
			}
	    });
	}


}]);

