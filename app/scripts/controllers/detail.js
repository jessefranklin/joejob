
app.controller('DetailCtrl', ['$rootScope', '$scope', '$routeParams', 'geolocation', 'jobsService', function ($rootScope, $scope, $routeParams, geolocation, jobsService) {
	'use strict';

	$scope.idParam = $routeParams.id;

	var jobDetail = jobsService.getJobById($scope.idParam);
	
	jobDetail.then(function(data){
		$scope.jobs = data;
		if($scope.jobs.cost.type === 'perhour'){
			$scope.jobs.cost.amount = $scope.jobs.cost.hours * $scope.jobs.cost.amount;
		}
	}, function(data){
    // error response
    $rootScope.$broadcast('connectionFailure');
  });

}]);

