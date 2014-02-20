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

	$scope.request = {};
	$scope.confirmRequest = function(data){
		$scope.request = data;
		var id = data._id;
		$scope.request.status = 'confirmed';
		$scope.request.stage = 3;

		delete $scope.request._id;

		var comRequest = comService.updateRequest(id, $scope.request);

		comRequest.then(function(data){
			console.log(data);
		}, function(){
	    // error response
			$rootScope.$broadcast('connectionFailure');
		});
	};

	$scope.archiveRequest = function(){
		$scope.request.status = 'archive';
		if($scope.request.jobOwner === user.user_id){
			$scope.request.ownerArchive = true;
		} else if ($scope.request.applicant === user.user_id){
			$scope.request.applicantArchive = true;
		}

		delete $scope.request._id;

		var comRequest = comService.updateRequest($scope.idParam, $scope.request);
		comRequest.then(function(data){
			$location.path('/manage-requests/');
		}, function(){
	    // error response
	    $rootScope.$broadcast('connectionFailure');
	  });
	};


	$scope.deleteRequest = function(data){
		//console.log(data);
		comService.deleteRequest(data);
	};

}]);

