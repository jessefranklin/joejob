app.controller('ManageRequestsCtrl', ['$rootScope', '$scope', 'jobsService', 'userService', 'comService', function ($rootScope, $scope, jobsService, userService, comService) {
	'use strict';

	$scope.jobs = {};
	//get all jobs
	//var promise = comService.getAllRequests();
	var userId = $scope.user.user_id;
	var promise = comService.getAllRequestsById(userId);

	promise.then(function(data){
		$scope.requests = data;
	}, function(data){
		// error response
		console.log(data);
	});



	$scope.deleteRequest = function(data){
		//console.log(data);
		comService.deleteRequest(data);
	};

}]);

