'use strict';

describe('Controller: FullController', function() {

  // load the controller's module
  beforeEach(module('eventx'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var FullController;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    FullController = $controller('FullController', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the controller', function() {
    $httpBackend.flush();
    expect(FullController.awesomeThings.length).toBe(4);
  });
});
