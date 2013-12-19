'use strict';

var services = angular.module('myApp.services', []).
  value('version', '0.1');

services.factory('_', function(){
    return window._;
});

services.factory('moment', function(){
    return window.moment;
});

services.factory('authService', ['$http','$q', function($http, $q){
    var isSignedIn = false, fullName;
    var fasad = {};

    var authenticate = function(user){
        var deferred = $q.defer();

        $http.post('/api/signin',user).
            success(function(data){
                isSignedIn = data.authenticated;
                fasad.fullName = data.fullName;
                fasad.userId = data.id;

                fasad.isSignedIn = data.authenticated;
                deferred.resolve({authenticated: data.authenticated, message: data.message, name: data.fullName});
            }).
            error(function(error){
                deferred.resolve({authenticated: false, message: 'Error occurred while authenticating.'});
            });

        return deferred.promise;
    };

    var register = function(user){
        var deferred = $q.defer();

        $http.post('/api/signup',user).
            success(function(data) {
                deferred.resolve({registered: data.registered, message: data.message});
            }).
            error(function(error){
                deferred.resolve({registered: false, message: 'Sorry, error occurred while signing up, please try again.'});
            });

        return deferred.promise;
    };

    var logOut = function(){
        isSignedIn = false;
        fasad.isSignedIn = false;
        fullName = '';
    };

    fasad.signIn = function(user){return authenticate(user);};
    fasad.signUp = function(user){return register(user);};
    fasad.logOut = function(){ return logOut()};
    fasad.isSignedIn = false;
    fasad.fullName = '';
    fasad.userId = null;

    return fasad;
}]);

//Models/ Resources
services.factory('Activity', ['$resource','authService', function($resource, authService){
    return $resource('api/:userId/activity', {userId: function(){return authService.userId;}},
        {statistics: {url:'api/:userId/activity/statistics', method: 'GET', params: {userId: function(){return authService.userId;}}, isArray: false}});
}]);
