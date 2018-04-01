'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $rootScope) {
    this.Auth = Auth;
    this.$state = $state;
    $rootScope.$state = $state;
  }

  register(form) {
    console.log('form submit');
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name:     this.user.name,
        email:    this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Account created, redirect to home
        //this.$state.go('main');
        this.errors.other = "Registration Complete!";
        
        var userId = this.Auth.getCurrentUser()._id;
        localStorage.setItem("userId", userId);
        console.log(this.Auth.getCurrentUser());
        console.log(userId);
        console.log(localStorage);
        this.$state.go('main');
      })
      .catch(err => {
        this.errors.other = "";
        err = err.data;
          this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            console.log(error.message);
            //form[field].$setValidity('mongoose', false);
           // this.errors[field] = error.message;
           if (!this.errors.other){
            this.errors.other = error.message;
           } else {
            this.errors.other += error.message;
           }
          
          });
      });
    }
  }
}

angular.module('eventx')
  .controller('SignupController', SignupController);
