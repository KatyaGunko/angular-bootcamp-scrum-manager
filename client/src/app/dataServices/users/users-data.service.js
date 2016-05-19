(function() {
  'use strict';

  /**
   *  Service that stores users array info about current user
   */

  /** @ngInject */
  angular.module('app').service('usersDataService' ,usersDataService);

  function usersDataService($rootScope, User, $localstorage) {

    var self = this;
    
    self.getCurrentUser = function(){

      if (!self.currentUser || !self.currentUser.id) {
        var userData;

        try {
          userData = new User($localstorage.getObject('SCRUM_user'));
        } catch(e) {
          $rootScope.$emit('user-logged-out');
        }

        if ( userData && userData.id ) {
          self.currentUser = new User(userData);
          $rootScope.$emit('user-logged-in');
        } else {
          self.currentUser = new User({});
          $rootScope.$emit('user-logged-out');
        }
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

  };

})();
