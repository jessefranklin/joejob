app.controller('UserCtrl', ['$rootScope', '$scope', 'userService', 'globalFunc', function ($rootScope, $scope, userService, globalFunc) {
	'use strict';

	$scope.user = {};

	$scope.addUser = function() {
	      var promise = userService.signUp($scope.user);
	      promise.then(function(data){
			}, function(data){
				// error response
				console.log(data);
			});
		};

}]);

