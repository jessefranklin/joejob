
app.controller('DetailCtrl', ['$rootScope', '$scope', '$routeParams', 'geolocation', 'jobsService', function ($rootScope, $scope, $routeParams, geolocation, jobsService) {
	'use strict';

	$scope.idParam = $routeParams.id;

	var jobDetail = jobsService.getJobById($scope.idParam);
	
	jobDetail.then(function(data){
		$scope.jobs = data;
	}, function(data){
    // error response
    $rootScope.$broadcast('connectionFailure');
  });

}]);

