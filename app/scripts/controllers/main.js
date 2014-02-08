app.controller('MainCtrl', ['$rootScope', '$scope', 'geolocation', 'jobs', function ($rootScope, $scope, geolocation, jobs) {
	'use strict';

	$scope.coords = {};

	geolocation.getLocation().then(function(data){
		$scope.coords = {
			lat:data.coords.latitude,
			long:data.coords.longitude
		};

		$scope.map.center = {
			latitude: data.coords.latitude,
			longitude: data.coords.longitude
		};
	});
	
	var jobList = jobs;
	
	jobList.then(function(data){
		$scope.jobs = data.data;

		for(var i = 0, iLength = data.data.length; i < iLength; i++) {
			$scope.map.markers.push({
				name: $scope.jobs[i].serviceDesc,
				latitude: $scope.jobs[i].location.lat,
				longitude: $scope.jobs[i].location.long
			});
			//$scope.map.click.push('gotoDetailView($scope.jobs[i]._id)');
		}
	});

	$scope.map = {
			center: {
				latitude: 44,
				longitude: -75
			},
			markers:[],
			zoom: 14
		};


	$scope.gotoDetailView = function(){
		alert();
	};

}]);

