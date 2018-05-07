'use strict';

(function() {

class FullController {

  constructor($http, $scope, $compile, socket, Auth,CalendarEvent, $cookies, $state,$rootScope) {
    this.$http = $http;

    this.$state = $state;
    $rootScope.$state = $state;
    
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    if (localStorage.getItem("userId") == ''){
      console.log
      //localStorage.setItem("userId", this.getCurrentUser()._id);
    }

    CalendarEvent.query({id: localStorage.getItem("userId")}).$promise.then(response => {
      
      this.events = response;
      socket.syncUpdates('events', this.events);
    });
  }
}

  angular.module('eventx')
    .controller('FullController', FullController);
})();
