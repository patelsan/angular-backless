'use strict';

/* Directives */


var directives = angular.module('myApp.directives', []);

directives.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

directives.directive('datepicker',['moment',function(moment){
    var definition = {
        require: 'ngModel',
        restrict: 'AE',
        template: '<div class="datepicker-container"></div>',
        link: function(scope, element, attribs, model){
            var pickerElement = $(element.children[0]);
            var picker = pickerElement.datepicker({
                format: 'mm/dd/yyyy'
            });
        }
    };
}]);
