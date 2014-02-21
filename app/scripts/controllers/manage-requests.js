app.controller('ManageRequestsCtrl', ['$rootScope', '$scope', '$location', 'jobsService', 'userService', 'comService', function ($rootScope, $scope, $location, jobsService, userService, comService) {
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
			
		}, function(){
	    // error response
			$rootScope.$broadcast('connectionFailure');
		});
	};


	$scope.completedRequest = function(data){

		$scope.request = data;
		var id = data._id;
		$scope.request.status = 'completed';
		$scope.request.stage = 4;

		delete $scope.request._id;

		var comRequest = comService.updateRequest(id, $scope.request);

		comRequest.then(function(data){
			$location.path('/view-requests/' + data._id);
		}, function(){
	    // error response
			$rootScope.$broadcast('connectionFailure');
		});
	};

	$scope.archiveRequest = function(data){
		$scope.request = data;
		var id = data._id;
		$scope.request.status = 'completed';
		console.log($scope.user.user_id);
		if($scope.request.jobOwner === $scope.user.user_id){
			$scope.request.ownerArchive = true;
		} else if ($scope.request.applicant === $scope.user.user_id){
			$scope.request.applicantArchive = true;
		}

		delete $scope.request._id;

		var comRequest = comService.updateRequest(id, $scope.request);
		comRequest.then(function(data){
			
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

