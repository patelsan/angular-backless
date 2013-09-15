'use strict';

/* Controllers */
var ctrlModule = angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('NavbarController', ['$scope','$location','authService',function($scope, $location, authService) {
        $scope.routeIs = function (routeName) {
             return $location.path() === routeName;
        };

        $scope.authService = authService;

    }]).controller('UserController', ['$scope','$http', '$location','authService', function($scope, $http, $location, authService){

        $scope.authenticate = function(user){
            authService.signIn(user).then(function(status){
                if(status.authenticated === true){
                    $location.path('/activities');
                    noty({text: 'Successfully logged in.', type:'success', layout:'topRight', timeout: 2000});
                }
                else{
                    $scope.message = status.message;
                }
            });
        };

        $scope.register = function (newUser) {
            authService.signUp(newUser).then(function(status){
                if(status.registered === true){
                    $location.path('/activities');
                    noty({text: 'Successfully signed up.', type:'success', layout:'topRight', timeout: 2000});
                }
                else{
                    $scope.signUpError = status.message;
                };

            });
        };

        $scope.logOut = function () {
            authService.logOut();
        };
    }]);