app.controller('EnterCtrl', ['$rootScope', '$scope', 'jobsService', function ($rootScope, $scope, jobsService) {
	'use strict';

	$scope.job = {};

	$scope.addJob = function() {
		console.log($scope.job);
		var promise = jobsService.postJob($scope.job);

		promise.then(function(data){
			console.log(data);
		}, function(data){
			// error response
			$rootScope.$broadcast('connectionFailure');
		});
	};
}]);

