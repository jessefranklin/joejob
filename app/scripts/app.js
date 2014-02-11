'use strict';
/* jshint unused:false */

var app = angular.module('joejobsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'google-maps',
  'jmdobry.angular-cache',
  'ngAutocomplete',
  'geolocation'
]);



app.config(['$locationProvider', '$routeProvider',function($locationProvider, $routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/detail/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl'
      })
      .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl'
      })
      .when('/add', {
        templateUrl: 'views/enter.html',
        controller: 'EnterCtrl'
      })
      .when('/manage', {
        templateUrl: 'views/manage.html',
        controller: 'ManageCtrl'
      })
      .otherwise({
        redirectTo: '/'
			});
	}]);

app.factory('jobs', ['$http', function($http){
  return $http.get('http://127.0.0.1:3000/jobs');

}]);

app.run(['$window', '$rootScope', '$location', 'globalConfig', function($window, $rootScope, $location, globalConfig){
  // Setting global config variable for root access across app
	$rootScope.globalConfig = globalConfig;

  // Setting rootScope variable for filters
  $rootScope.filters = {};

	// Changes title on page change
	$rootScope.$on('$routeChangeSuccess', function(event, currentRoute) {
		if (currentRoute.$$route !== undefined) {
			$rootScope.title = currentRoute.$$route.title;
		}
	});

  // Adding back button functionality
  $rootScope.$back = function() {
      $window.history.back();
    };
}]);




