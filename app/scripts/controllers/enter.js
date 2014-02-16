app.controller('EnterCtrl', ['$rootScope', '$scope', 'jobsService', 'globalFunc', function ($rootScope, $scope, jobsService, globalFunc) {
	'use strict';

	$scope.job = {};
	$scope.categories = globalFunc.categories;
	var geocoder;

	$scope.addJob = function() {
		geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': $scope.job.location.address}, function(results, status) {
	    if (status === 'OK') {
	      $scope.job.location.lat = results[0].geometry.location.d;
	      $scope.job.location.long = results[0].geometry.location.e;
	      $scope.job.owner = $scope.user.user_id;
	      $scope.job.status = 'open';
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

