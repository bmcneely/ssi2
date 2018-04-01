'use strict';

angular.module('eventx')
  .config(function ($stateProvider) {
    $stateProvider
      .state('doc', {
        url: '/doc',
        templateUrl: 'app/doc/doc.html',
        controller: 'DocCtrl'
      });
  });
