'use strict';

class SidebarController {
  constructor(Auth,$state,$rootScope,$timeout) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    
    //console.log(this.getCurrentUser());
    //console.log(this.getCurrentUser()._id);
    
    //localStorage.setItem("userId", this.getCurrentUser()._id);
    //console.log(localStorage.getItem("userId"));
    $rootScope.$state = $state;
    $timeout(function() {
      $('.event-collapse').sideNav('hide');
    });
  }
}

angular.module('eventx')
  .controller('SidebarController', SidebarController);
