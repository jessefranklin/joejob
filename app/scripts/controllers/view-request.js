
app.controller('ViewRequestCtrl', ['$rootScope', '$scope', '$window', '$routeParams', '$location', 'geolocation', 'jobsService', 'comService', function ($rootScope, $scope, $window, $routeParams, $location, geolocation, jobsService, comService) {
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


	$scope.rating = 5;

	$scope.saveRatingToServer = function(rating) {
		//console.log('Rating' + rating);
		$scope.request.rating = rating;
	};

	$scope.completeRequest = function(){
		$scope.request.status = 'completed';
		$scope.request.stage = 3;
		delete $scope.request._id;

		var comRequest = comService.updateRequest($scope.idParam, $scope.request);
		comRequest.then(function(data){
			$location.path('/manage-requests/');
		}, function(){
	    // error response
	    $rootScope.$broadcast('connectionFailure');
	  });
	};

	//var userId = $scope.user.user_id;

	$scope.updateRequest = function(data){
		if(data === 'decline') {
			$scope.request.status = 'decline';
			$scope.request.stage = 2;
		} else {
			$scope.request.status = 'approved';
			$scope.request.stage = 2;
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

}]);

