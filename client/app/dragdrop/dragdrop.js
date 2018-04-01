'use strict';

angular.module('eventx')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dragdrop', {
        url: '/dragdrop',
        templateUrl: 'app/dragdrop/dragdrop.html',
        controller: 'DragdropCtrl',
         authenticate: 'admin, user'
      });
  });
