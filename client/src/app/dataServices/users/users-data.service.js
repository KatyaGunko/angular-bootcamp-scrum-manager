(function() {
  'use strict';

  /**
   *  Service that stores users array info about current user
   */

  /** @ngInject */
  angular.module('app').service('usersDataService' ,function ($rootScope, User, $localstorage) {

    var self = this;
    self.currentUser = undefined;


    self.getCurrentUser = function(){

      if (!self.currentUser || !self.currentUser.id) {
        var userData = $localstorage.getObject('SCRUM_user');

        self.currentUser = new User(userData);
        $rootScope.$emit('user-logged-in');
      }

      return self.currentUser;
    };

    self.setCurrentUser = function(user) {
      self.currentUser.id = user.id || '';
      self.currentUser.firstName = user.firstName || '';
      self.currentUser.lastName = user.lastName || '';
      self.currentUser.email = user.email || '';
      self.currentUser.admin = user.admin || false;
    }

  });

})();
