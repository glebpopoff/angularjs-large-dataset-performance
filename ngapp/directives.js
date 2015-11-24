var angularJSBigDataDirectives = angular.module('angularJSBigDataDirectives', ['ngResource']);

/**
* Loading indicator directive.
* Usage: <div ui-loading-indicator class="well" title="Please wait...loading data."> </div>
*/
angularJSBigDataDirectives.directive("uiLoadingIndicator", function() {
    window.log('directive', 'uiLoadingIndicator: setting up the \'ui-loading-indicator\' directive');
    return {
        restrict : "A",
        template: " ",
        link : function(scope, element, attrs) {
            scope.$on("loading-started", function(e) {
                element.css({"display" : ""});
                //the actual message is passed through the "title" attribute
                element.html("<img src='images/ajax-loader.gif' />&nbsp;Please wait...loading data.");
            });

            scope.$on("saving-started", function(e) {
                element.css({"display" : ""});
                //the actual message is passed through the "title" attribute
                element.html("<img src='images/ajax-loader.gif' />&nbsp;Please wait...saving data.");
            });

            scope.$on("loading-complete", function(e) {
                element.css({"display" : "none"});
            });
        }
    };
});