(function() {
  'use strict';

  /**
   *  Service that stores users array info about current user
   */

  /** @ngInject */
  angular.module('app').service('usersDataService' ,function (User, $localstorage) {

    var self = this;
    var currentUser = undefined;


    self.getCurrentUser = function(){

      if (!currentUser) {
        var userData = $localstorage.getObject('SCRUM_user');

        currentUser = new User(userData);
      }

      return currentUser;
    };

    self.setCurrentUser = function() {
      console.log('set as current user');
    }

  });

})();
