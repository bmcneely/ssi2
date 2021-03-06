'use strict';

(function() {

class MainController {

  constructor($http, $scope, $compile, socket, Auth,CalendarEvent, $cookies) {
    this.$http = $http;

    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    if (localStorage.getItem("userId") == ''){

      //localStorage.setItem("userId", this.getCurrentUser()._id);
    }

    CalendarEvent.query({id: localStorage.getItem("userId")}).$promise.then(response => {
      //console.log('initial event');
      this.events = response;
      socket.syncUpdates('events', this.events);
    });
  }
}

  angular.module('eventx')
    .controller('MainController', MainController);
})();
