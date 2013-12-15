'use strict';

/* Filters */

var filters = angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);

filters.filter('fromNow', function(){
    return function(date){
        return moment(date).fromNow();
    };
});