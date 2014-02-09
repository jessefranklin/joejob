app.controller('ManageCtrl', ['$rootScope', '$scope', 'jobsService', function ($rootScope, $scope, jobsService) {
	'use strict';

	$scope.jobs = {};

	var promise = jobsService.getJobs();

	promise.then(function(data){
		$scope.jobs = data;
	}, function(data){
		// error response
		console.log(data);
	});

	$scope.deleteJob = function(data){
		jobsService.deleteJob(data);
	};

}]);

