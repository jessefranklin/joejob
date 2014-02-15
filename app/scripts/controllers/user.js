app.controller('UserCtrl', ['$rootScope', '$scope', 'userService', 'globalFunc', function ($rootScope, $scope, userService, globalFunc) {
	'use strict';

	$scope.local = {};

	$scope.addUser = function() {
	      var promise = userService.signUp($scope.local);
	      promise.then(function(data){
			}, function(data){
				// error response
				console.log(data);
			});
		};

}]);

