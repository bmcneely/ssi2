'use strict';

class LoginController {
  constructor(Auth, $state,$rootScope, $cookies) {
    this.user       = {};
    this.errors     = {};
    this.submitted  = false;
    
    this.Auth   = Auth;
    this.$state = $state;

    //this.user.email = "admin@example.com";
    //this.user.password = "admin";
    $rootScope.$state = $state;
  }
  
  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('main');
        var userId = this.Auth.getCurrentUser()._id;
        localStorage.setItem("userId", userId);
        console.log(localStorage);
      })
      .catch(err => {
        console.log('error');
        console.log(err);
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('eventx')
  .controller('LoginController', LoginController);
