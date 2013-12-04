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
                    $location.path('/dashboard');
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
                    authService.signIn({email: newUser.email, password: newUser.password});
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

ctrlModule.controller('ActivitiesController',['$scope','Activity', 'moment','$filter', function($scope, activity, moment, $filter){
    $scope.workoutDate = new Date();//.toDateString();  //$filter('date')(new Date(), 'MMMM, dd');
    $scope.newActivity = {};

}]);

ctrlModule.controller('DashboardController', ['$scope','Activity','moment', function($scope, activity, moment){
    $scope.pastActivities = activity.query();
}]);