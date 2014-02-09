
app.controller('EditCtrl', ['$rootScope', '$scope', '$routeParams', 'geolocation', 'jobsService', function ($rootScope, $scope, $routeParams, geolocation, jobsService) {
	'use strict';

	$scope.idParam = $routeParams.id;

	var jobDetail = jobsService.getJobById($scope.idParam);
	
	jobDetail.then(function(data){
		$scope.job = data;
	}, function(){
    // error response
	});

	$scope.editJob = function(){
		delete $scope.job._id;
		jobsService.editJob($scope.idParam, $scope.job);
	};

}]);

