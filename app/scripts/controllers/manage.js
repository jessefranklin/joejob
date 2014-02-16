app.controller('ManageCtrl', ['$rootScope', '$scope', 'jobsService', 'userService', function ($rootScope, $scope, jobsService, userService) {
	'use strict';

	$scope.jobs = {};
	//get all jobs
	//var promise = jobsService.getJobs();
	var x = $scope.user.user_id;
	var promise = jobsService.getAllJobsById(x);

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

