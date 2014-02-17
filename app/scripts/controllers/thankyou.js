
app.controller('ThanksCtrl', ['$rootScope', '$scope', '$routeParams', 'geolocation', 'jobsService', 'comService', function ($rootScope, $scope, $routeParams, geolocation, jobsService, comService) {
	'use strict';

	$scope.idParam = $routeParams.id;
	
	var jobDetail = jobsService.getJobById($scope.idParam);
	
	jobDetail.then(function(data){
		$scope.jobs = data;
		
	}, function(){
    // error response
    $rootScope.$broadcast('connectionFailure');
  });

	var userId = $scope.user.user_id;


}]);

