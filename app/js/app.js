'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers','ngMockE2E']).
  config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.when('/signin', {templateUrl: 'partials/signin.html', controller: 'UserController'}).
    when('/signup', {templateUrl: 'partials/signup.html', controller: 'UserController'}).
    when('/home', {templateUrl: 'partials/home.html'}).
    when('/activities', {templateUrl: 'partials/activities.html'}).
    otherwise({redirectTo: '/home'});

    $httpProvider.defaults.headers.common['X-Token']='--auth-token--';
  }]).run(function($httpBackend, _){
          var userRepository = [{email: 'x', password: 'y'}];

          $httpBackend.whenPOST('/api/signin').respond(function(method, url, data){
              var request = JSON.parse(data);
              var searchResult = _.findWhere(userRepository, {email: request.email, password: request.password});
              if(searchResult){
                return [200, {authenticated: true, fullName: ''}, {authToken: ''}];
              }
              else{
                  return [200, {authenticated: false, message: 'Sorry, invalid email or password.'}, {}];
              }
          });

        $httpBackend.whenGET(/\partials\//).passThrough();
    });
