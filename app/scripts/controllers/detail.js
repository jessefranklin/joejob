
app.controller('DetailCtrl', ['$rootScope', '$scope', '$routeParams', '$location', 'geolocation', 'jobsService', 'comService', function ($rootScope, $scope, $routeParams, $location, geolocation, jobsService, comService) {
	'use strict';

	$scope.idParam = $routeParams.id;
	$scope.request = {};
	$scope.jobs = {};

	var jobDetail = jobsService.getJobById($scope.idParam);
	
	jobDetail.then(function(data){
		$scope.jobs = data;
		if($scope.jobs.cost.type === 'perhour'){
			$scope.jobs.cost.amount = $scope.jobs.cost.hours * $scope.jobs.cost.amount;
		}
	}, function(){
    // error response
    $rootScope.$broadcast('connectionFailure');
  });

	var userId = $scope.user.user_id;

	$scope.createRequest = function(){
		$scope.request.jobTitle = $scope.jobs.name;
		$scope.request.jobCategory = $scope.jobs.category;
		$scope.request.jobId = $scope.jobs._id;
		$scope.request.jobOwner = $scope.jobs.owner;
		$scope.request.applicant = userId;
		$scope.request.status = 'owner';
		$scope.request.stage = 1;
		$scope.request.comments = '';
		$scope.request.rating = '';
		$scope.request.cash = $scope.jobs.cost.amount;


		var applyforjob = comService.makeRequest($scope.request);

		applyforjob.then(function(data){
			$location.path('/thankyou/' + $scope.jobs._id);
		}, function(){
	    // error response
	    $rootScope.$broadcast('connectionFailure');
	  });

	}

}]);

