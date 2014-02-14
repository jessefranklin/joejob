app.controller('SigninCtrl', ['$rootScope', '$scope', 'userService', 'globalFunc', function ($rootScope, $scope, userService, globalFunc) {
	'use strict';

	$scope.user = {};

	$scope.Signin = function() {
	      var promise = userService.addUser($scope.user);
	      promise.then(function(data){

			}, function(data){
				// error response
				console.log(data);
			});
		};

}]);

