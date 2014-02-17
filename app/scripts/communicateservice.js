'use strict';

app.factory('comService', ['$rootScope', '$http', '$q', '$angularCacheFactory', function($rootScope, $http, $q, $angularCacheFactory){

  var service = {};
  service.getAllRequests = function() {
    var deferred = $q.defer(),
        start = new Date().getTime();
   
    $http.get('http://127.0.0.1:3000/communicate/')
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

  service.getRequestById = function(id) {

    var deferred = $q.defer(),
        start = new Date().getTime();

    
    $http.get('http://127.0.0.1:3000/communicate/' + id)
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


  service.getAllRequestsById = function(id) {

    var deferred = $q.defer(),
        start = new Date().getTime();
    
    $http.get('http://127.0.0.1:3000/requests/' + id)
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

  service.makeRequest = function(data) {

    var deferred = $q.defer(),
        start = new Date().getTime();

    $http.post('http://127.0.0.1:3000/communicate/', data)
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


  service.deleteRequest = function(id) {

    var deferred = $q.defer(),
        start = new Date().getTime();

    $http.delete('http://127.0.0.1:3000/communicate/'+id)
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


  service.updateRequest = function(id, data) {

    var deferred = $q.defer();
    
    $http.put('http://127.0.0.1:3000/communicate/'+id, data)
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
