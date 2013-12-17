'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers','ngMockE2E','ngRoute','ngResource']).
  config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.when('/signin', {templateUrl: 'partials/signin.html', controller: 'UserController'}).
    when('/signup', {templateUrl: 'partials/signup.html', controller: 'UserController'}).
    when('/home', {templateUrl: 'partials/home.html'}).
    when('/activities', {templateUrl: 'partials/activities.html', controller: 'ActivitiesController'}).
    when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: 'DashboardController'}).
    otherwise({redirectTo: '/home'});

    $httpProvider.defaults.headers.common['X-Token']='--auth-token--';
  }]).run(function($httpBackend, _){
          var userRepository = new utils.Repository();
          var activitiesRepository = new utils.Repository();

          userRepository.save({email: 'x', password:'x', fullName: 'Tom'});
          activitiesRepository.save({userId: 101,workoutDate: new Date().setDate(new Date().getDate()-7),activityType: 'Running', duration: 22, calories: 280, distance: 2.2});
          activitiesRepository.save({userId: 101,workoutDate: new Date().setDate(new Date().getDate()-6),activityType: 'Running', duration: 28, calories: 310, distance: 3.2});
          activitiesRepository.save({userId: 101,workoutDate: new Date().setDate(new Date().getDate()-5),activityType: 'Running', duration: 28, calories: 310, distance: 3});
          activitiesRepository.save({userId: 101,workoutDate: new Date().setDate(new Date().getDate()-4),activityType: 'Running', duration: 34, calories: 360, distance: 3});
          activitiesRepository.save({userId: 101,workoutDate: new Date().setDate(new Date().getDate()-2),activityType: 'Running', duration: 25, calories: 290, distance: 2});
          activitiesRepository.save({userId: 101,workoutDate: new Date().setDate(new Date().getDate()-1),activityType: 'Running', duration: 32, calories: 350, distance: 2});
          activitiesRepository.save({userId: 101,workoutDate: new Date(),activityType: 'Running', duration: 22, calories: 200, distance: 1.2});

          $httpBackend.whenPOST('/api/signin').respond(function(method, url, data){
              var request = JSON.parse(data);
              var user = userRepository.find({email: request.email, password: request.password});

              if(user){
                user.authenticated = true;
                return [200, user, {authToken: ''}];
              }
              else{
                  return [200, {authenticated: false, message: 'Sorry, invalid email or password.'}, {}];
              }
          });

          $httpBackend.whenPOST('/api/signup').respond(function(method, url, data){
              var request = JSON.parse(data);
              var searchReslult = userRepository.find({email: request.email});
              if(searchReslult){
                  return [200, {registered: false, message: 'Sorry, user with the email ' + request.email + ' is already registered.'}];
              }
              else{
                userRepository.save(request);
                return [200, {registered: true, message: 'Thank you for signing up.'}];
              }
          });

        $httpBackend.whenGET(/api\/(\d+)\/activity\/statistics/).respond(function(method, url, data){
            var searchResult = url.match(/api\/(\d+)\/activity/);
            var userId = parseInt(searchResult[1]);

            return [200, activitiesRepository.statistics({userId: userId})];
        });

         $httpBackend.whenGET(/api\/(\d+)\/activity/).respond(function(method, url, data){
             var searchResult = url.match(/api\/(\d+)\/activity/);
             var userId = parseInt(searchResult[1]);
             //var user = userRepository.find({id: userId});

             return [200, activitiesRepository.findAll({userId: userId})];
         });

        $httpBackend.whenPOST(/api\/(\d+)\/activity/).respond(function(method, url, data){
            data = JSON.parse(data);
            var searchResult = url.match(/api\/(\d+)\/activity/);
            var userId = parseInt(searchResult[1]);

            data.userId = userId;
            console.log(data);
            var savedActivity = activitiesRepository.save(data);
            return [200, savedActivity];
        });

        $httpBackend.whenGET(/\partials\//).passThrough();
    });
