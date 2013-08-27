'use strict';

/* Controllers */
var ctrlModule = angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]).controller('UserController', ['$scope','$http', '$location','authService', function($scope, $http, $location, authService){

        $scope.authenticate = function(user){
            authService.signIn(user).then(function(status){
                if(status.authenticated === true){
                    $location.path('/activities');
                    noty({text: 'Successfully logged in.', type:'success', layout:'topRight'});
                }
                else{
                    $scope.message = status.message;
                }
            });
        };
    }]);