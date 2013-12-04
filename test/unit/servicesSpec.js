'use strict';

/* jasmine specs for services go here */

describe('authService', function() {
  beforeEach(module('myApp.services'));

  describe('sign-up',function(){
      it('should allow user to sign up', inject(function($injector, $httpBackend){
            var newUser = {name: 'Jack', email: 'jack@nowhere.com', password:'topgun'};
            var auth = $injector.get('authService');

            var signUpPromise = auth.signUp(newUser);
            $httpBackend.flush();

            signUpPromise.then(function(status){
               expect(status.registered).toBe(false);
            });
      }));
  });

  /*
  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  }); */
});
