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
            title: 'AngularJS Big Data App | Large Dataset Demo',
            templateUrl: '/ngapp/partials/landing.html?' + APP_CACHE_SID,
            controller: 'HomeCtrl'
        }).
        when('/data/:size', {
            title: 'AngularJS Big Data App | Large Dataset Demo',
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

//loading indicator interceptor (display the directive)
angularJSBigDataApp.config(function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $rootScope) {
        return {
            'request': function(config) {
                if (config.method == 'GET')
                {
                  $rootScope.$broadcast('loading-started');
                } else
                {
                  $rootScope.$broadcast('saving-started');
                }
                return config || $q.when(config);
            },
            'response': function(response) {
                $rootScope.$broadcast('loading-complete');
                return response || $q.when(response);
            }
        };
    });
});

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
