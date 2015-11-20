var angularJSBigDataApp = angular.module('angularJSBigDataApp', [
										'ngRoute',
										'angularJSBigDataControllers',
                                        'angularJSBigDataServices',
                                        'angularJSBigDataDirectives'
                                     ]);
	                                                 
//setup routing
angularJSBigDataApp.config(['$routeProvider', '$locationProvider', '$resourceProvider',
  function ($routeProvider, $locationProvider,$resourceProvider) {
        $routeProvider.
        when('/', {
            title: 'AngularJS Big Data App | Demo',
            templateUrl: '/ngapp/partials/list.html?' + APP_CACHE_SID,
            controller: 'ListCtrl'
        }).
        //this is important to avoid infinite loop redirect (other NG apps redirect back here on NG 404)
        otherwise({
            redirectTo: '/'
        });

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
}]);

//caching id
var APP_CACHE_SID = (new Date()).getTime();
//set to false to disable console.log
var APP_DEBUG = true; 

//console.log wrapper (disabled in older browsers)
window.log = function () {
    if (!APP_DEBUG) return;
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        console.log('[' + new Date().toUTCString() + '] ' + Array.prototype.slice.call(arguments))
    }
};
