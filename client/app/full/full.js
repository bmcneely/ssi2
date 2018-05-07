'use strict';

angular.module('eventx')
  .config(function($stateProvider) {
    $stateProvider
      .state('full', {
        url: '/full',
        templateUrl: 'app/full/full.html',
        controller: 'FullController',
        controllerAs: 'full',
        authenticate: 'admin, user'
      });
  });
