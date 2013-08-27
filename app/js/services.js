'use strict';

var services = angular.module('myApp.services', []).
  value('version', '0.1');

services.factory('_', function(){
    return window._;
});

services.factory('authService', ['$http','$q', function($http, $q){
    var isSignedIn = false, fullName, authToken;

    var authenticate = function(user){
        var deferred = $q.defer();

        $http.post('/api/signin',user).
            success(function(data){
                console.log(data);
                //ToDo: update the status
                deferred.resolve({authenticated: data.authenticated, message: data.message});
            }).
            error(function(error){
                deferred.resolve({authenticated: false, message: 'Error occurred while authenticating.'});
            });

        return deferred.promise;
    };

    var register = function(user){

    };

    return{
        signIn: function(user){return authenticate(user);},
        signUp: function(user){return register(user);}
    };
}]);
