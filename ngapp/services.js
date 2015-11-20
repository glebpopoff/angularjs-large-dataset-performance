var angularJSBigDataServices = angular.module('angularJSBigDataServices', ['ngResource']);

/**
* Get Data
*/
angularJSBigDataServices.factory('AppDataService',['$http', function ($http) {
	var doRequest = function (data) {
	
    var url = '/data/data-file-min.json?' + APP_CACHE_SID;
    window.log('service', 'AppDataService: calling service \'' + url + '\'');
    var promise = $http({
            method: 'GET',
            url: url,
            data: data, // pass in data as strings
            headers: {
                'Content-Type': 'application/json'
            } // set the headers so angular passing info as form data (not request payload)
        });
        return promise;
    };
    
    return {
        getData: function (data) {
            return doRequest(data);
        },
    };

}]);

/**
* Data Sharing Service (Singleton Service to share data between two controllers)
*/
angularJSBigDataServices.factory('DataShareService',function($rootScope,$timeout){
  var service = {};
  service.data = false;
  service.setData = function(data){
      this.data = data;
      $timeout(function(){
         $rootScope.$broadcast('data_shared');
      },1);
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});