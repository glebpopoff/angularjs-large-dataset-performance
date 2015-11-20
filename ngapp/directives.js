var angularJSBigDataDirectives = angular.module('angularJSBigDataDirectives', ['ngResource']);

/*
* Directive to format date & time directive
* Usage: <span metro-north-date-formatter="JS-DATE-OBJECT"></span>
*/
angularJSBigDataDirectives.directive('metroNorthDateFormatter', function () {
		
		return {
		  	restrict: "A",
			template: "",
			link: function (scope, element, attrs) {
				var d = new Date(0);
                d.setUTCSeconds(attrs["metroNorthDateFormatter"]);
                var hours = d.getHours();
                var minutes = d.getMinutes();

                var ampm = (hours >= 12) ? 'pm' : 'am';
				hours = hours % 12;
				hours = (hours) ? hours : 12; // the hour '0' should be '12'
				minutes = (minutes < 10) ? '0' + minutes : minutes;
				var strTime = (d.getMonth()+1) + "/" + d.getDate()  + "/"  + d.getFullYear() + ' ' + hours + ':' + minutes + ' ' + ampm;

                element.html(strTime);
			}

        };
});