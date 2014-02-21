app.controller('EnterCtrl', ['$rootScope', '$scope', '$location', 'jobsService', 'globalFunc', function ($rootScope, $scope, $location, jobsService, globalFunc) {
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

	      if($scope.job.cost.type === 'hr'){
				$scope.job.cost.totalAmount = ($scope.job.cost.hours * $scope.job.cost.amount);
	      } else if ($scope.job.cost.type === 'fixed'){
				$scope.job.cost.totalAmount = $scope.job.cost.amount;
	      }

	      var promise = jobsService.postJob($scope.job);

	      promise.then(function(data){
	      			$location.path('/detail/' + data._id);
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

