
app.controller('ViewRequestCtrl', ['$rootScope', '$scope', '$routeParams', '$location', 'geolocation', 'jobsService', 'comService', function ($rootScope, $scope, $routeParams, $location, geolocation, jobsService, comService) {
	'use strict';

	$scope.idParam = $routeParams.id;
	$scope.request = {};

	var requestDetail = comService.getRequestById($scope.idParam);
	
	requestDetail.then(function(data){
		$scope.request = data;
	}, function(){
    // error response
    $rootScope.$broadcast('connectionFailure');
  });

	//var userId = $scope.user.user_id;

	$scope.updateRequest = function(data){
		if(data === 'Decline') {
			$scope.request.status = 'decline';
			$scope.request.stage = 2;
		} else {
			$scope.request.status = 'accept';
			$scope.request.status = 'applicant';
			$scope.request.stage = 2;
		}

		
		var applyforjob = comService.updateRequest($scope.request);

		applyforjob.then(function(data){
			
		}, function(){
	    // error response
	    $rootScope.$broadcast('connectionFailure');
	  });

	}

}]);

