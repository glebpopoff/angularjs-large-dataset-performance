var angularJSBigDataServices = angular.module('angularJSBigDataServices', ['ngResource']);

/**
* Get Data from WS
*/
angularJSBigDataServices.factory('AppDataService',['$http', function ($http) {
	var doRequest = function (datafile) {
	
    var file = (datafile && datafile != '') ? datafile : 'data-file-min.json';
    var url = '/data/' + file + '?' + APP_CACHE_SID;
    window.log('service', 'AppDataService: calling service \'' + url + '\'');
    var promise = $http({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            } // set the headers so angular passing info as form data (not request payload)
        });
        return promise;
    };
    
    return {
        getData: function (datafile) {
            return doRequest(datafile);
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