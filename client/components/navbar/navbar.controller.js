'use strict';

class NavbarController {
  //end-non-standard

  constructor(Auth, $location) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.isFullScreen = function(){
     
      if ($location.path() != '/full'){
        return true;
      }
      else {
        return false;
      }
    }
  }
}

angular.module('eventx')
  .controller('NavbarController', NavbarController);
