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
  'geolocation',
  'UserApp'
]);



app.config(['$locationProvider', '$routeProvider',function($locationProvider, $routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        public: true
      })
      .when('/detail/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl',
        public: true
      })
      .when('/thankyou/:id', {
        templateUrl: 'views/thankyou.html',
        controller: 'ThanksCtrl',
        public: true
      })
      .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl',
        public: true
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
      .when('/manage-requests', {
        templateUrl: 'views/manage-requests.html',
        controller: 'ManageRequestsCtrl'
      })
      .when('/manage-jobs-in-progress', {
        templateUrl: 'views/manage-work-requests.html',
        controller: 'ManageRequestsCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        public: true, login: true
      })
      .when('/edit-request/:id', {
        templateUrl: 'views/edit-request.html',
        controller: 'EditCtrl',
        public: true
      })
      .when('/view-request/:id', {
        templateUrl: 'views/view-request.html',
        controller: 'ViewRequestCtrl',
        public: true
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        public: true
      })
      .otherwise({
        redirectTo: '/'
			});
	}]);

app.factory('jobs', ['$http', function($http){
  return $http.get('http://127.0.0.1:3000/jobs');

}]);

app.run(['$window', '$rootScope', '$location', 'globalConfig', 'user', function($window, $rootScope, $location, globalConfig, user){
  
  user.init({appId:'52fadd59e2c0b'});
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




