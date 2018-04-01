'use strict';

angular.module('eventx')
  .config(function ($stateProvider) {
    $stateProvider
      .state('events', {
        url: '/events',
        templateUrl: 'app/events/events.html',
        controller: 'EventsCtrl',
        authenticate: 'admin, user'
      });
  });
