
app.controller('EditCtrl', ['$rootScope', '$scope', '$routeParams', 'geolocation', 'jobsService', function ($rootScope, $scope, $routeParams, geolocation, jobsService) {
	'use strict';

	$scope.idParam = $routeParams.id;

	var jobDetail = jobsService.getJobById($scope.idParam);
	
	jobDetail.then(function(data){
		$scope.job = data;
	}, function(){
    // error response
	});
	var geocoder;
	$scope.editJob = function(){
		geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': $scope.job.location.address}, function(results, status) {
	    if (status === 'OK') {
	      $scope.job.location.lat = results[0].geometry.location.d;
	      $scope.job.location.long = results[0].geometry.location.e;
	  	}
	  	});
		delete $scope.job._id;
		jobsService.editJob($scope.idParam, $scope.job);
	};

}]);

