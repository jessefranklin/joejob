app.controller('EnterCtrl', ['$rootScope', '$scope', 'jobsService', function ($rootScope, $scope, jobsService) {
	'use strict';

	$scope.job = {};
	var geocoder;

	$scope.addJob = function() {
		geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': $scope.job.location.address}, function(results, status) {
	    if (status === 'OK') {
	      $scope.job.location.lat = results[0].geometry.location.d;
	      $scope.job.location.long = results[0].geometry.location.e;
	      var promise = jobsService.postJob($scope.job);

	      promise.then(function(data){
					
				}, function(data){
					// error response
					console.log(data);
				});
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});

		

	};


}]);

