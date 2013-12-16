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
        link: function($scope, element, attribs, model){
            var pickerElement = $(element.children()[0]);
            var picker = pickerElement.datepicker();
            //pickerElement.datepicker('setValue', new Date().toDateString());
            //pickerElement.datepicker('update');
            model.$setViewValue(new Date().toDateString());

            picker.on('changeDate',function(e){
                $scope.$apply(function(){
                    model.$setViewValue(e.date);
                });
            });

            $scope.$watch(function(){
                return model.$modelValue;
            }, function(newVal){
                pickerElement.datepicker('update',newVal);
            });
        }
    };

    return definition;
}]);

directives.directive('timepicker', function(){
    var definition = {
        require: 'ngModel',
        restrict: 'AE',
        link: function($scope, element, attribs, model){
            var pickerElement = $(element);
            var picker = pickerElement.timepicker({
                minuteStep: 5,
                showSeconds: false,
                showMeridian: false
            });

            picker.on('changeTime.timepicker', function(e){
                console.log(e.time.value);
                $scope.$apply(function(){
                    model.$setViewValue(e.time.value);
                });
            });

            $scope.$watch(function(){
                return model.$modelValue;
            }, function(newVal){
                if(!newVal || $scope.$$phase)
                  return;

                pickerElement.timepicker('setTime', newVal);
            });
        }
    };

    return definition;
});

directives.directive('onlyDigits', function () {

    return {
        require: 'ngModel',
        bindAttr: '=',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (!inputValue) return;
                var transformedInput = inputValue.split('').filter(function (s) { return ((s == '.' || !isNaN(s)) && s != ' '); }).join('');
                transformedInput = Number(transformedInput);

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});
