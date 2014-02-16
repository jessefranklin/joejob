'use strict';

app.factory('userService', ['$rootScope', '$http', '$q', '$angularCacheFactory', function($rootScope, $http, $q, $angularCacheFactory){

  var service = {};

  service.getUsers = function() {
    var deferred = $q.defer(),
        start = new Date().getTime();
   
    $http.get('http://127.0.0.1:3000/users/')
      .success(function(data) {
        console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject({
          'status': status,
          'data': data
        });
      });

    return deferred.promise;
  };

  service.signIn = function(data) {

    var deferred = $q.defer(),
        start = new Date().getTime();
        //console.log(data);
    $http.get('http://127.0.0.1:3000/login/', data)
      .success(function(data) {
        console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject({
          'status': status,
          'data': data
        });

        // display 404 if we can't find Id
        $rootScope.$broadcast('pageNotFound');
      });

    return deferred.promise;
  };

  service.signUp = function(data) {

    var deferred = $q.defer(),
        start = new Date().getTime();

    
    $http.post('http://127.0.0.1:3000/users/', data)
       .success(function(data) {
        console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject({
          'status': status,
          'data': data
        });
      });

    return deferred.promise;
  };


  service.deleteUser = function(data) {

    var deferred = $q.defer(),
        start = new Date().getTime();

    $http.delete('http://127.0.0.1:3000/users/'+data)
       .success(function(data) {
        console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject({
          'status': status,
          'data': data
        });
      });

    return deferred.promise;
  };


  service.editUser = function(id, data) {

    var deferred = $q.defer();
    
    $http.put('http://127.0.0.1:3000/users/'+id, data)
       .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject({
          'status': status,
          'data': data
        });
      });

    return deferred.promise;
  };

  return service;
}]);
