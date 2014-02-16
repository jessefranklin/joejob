'use strict';

app.factory('jobsService', ['$rootScope', '$http', '$q', '$angularCacheFactory', function($rootScope, $http, $q, $angularCacheFactory){

  var service = {};

  service.getJobs = function() {
    var deferred = $q.defer(),
        start = new Date().getTime();
   
    $http.get('http://127.0.0.1:3000/jobs/')
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

  service.getJobById = function(id) {

    var deferred = $q.defer(),
        start = new Date().getTime();

    
    $http.get('http://127.0.0.1:3000/jobs/' + id)
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


  service.getAllJobsById = function(id) {

    var deferred = $q.defer(),
        start = new Date().getTime();
    
    $http.get('http://127.0.0.1:3000/myjobs/' + id)
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

  service.postJob = function(data) {

    var deferred = $q.defer(),
        start = new Date().getTime();

    $http.post('http://127.0.0.1:3000/jobs/', data)
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


  service.deleteJob = function(data) {

    var deferred = $q.defer(),
        start = new Date().getTime();

    $http.delete('http://127.0.0.1:3000/jobs/'+data)
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


  service.editJob = function(id, data) {

    var deferred = $q.defer();
    
    $http.put('http://127.0.0.1:3000/jobs/'+id, data)
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
