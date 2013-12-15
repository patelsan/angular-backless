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
    var newActivity = {workoutDate: new Date(), activityType: 'Running'};
    $scope.newActivity = newActivity;
    $scope.activityTypes = ['Running', 'Walking', 'Cycling', 'Hiking', 'Swimming', 'Skating'];  //this could be pulled from the backend

    $scope.save = function(){
      activity.save({}, newActivity);
    };

}]);

ctrlModule.controller('DashboardController', ['$scope','Activity','moment', function($scope, activity, moment){
    $scope.pastActivities = activity.query();

    var data = {
        labels : ["Mon.","Tue.","Wed.","Thu.","Fri.","Sat.","Sun."],
        datasets : [
            {
                fillColor : "#dd4b39",
                strokeColor : "#dd4b39",
                data : [65,59,90,81,56,55,40]
            }
        ]
    }
    var ctx = $("#calories-chart").get(0).getContext("2d");
    var chart = new Chart(ctx).Bar(data);
}]);