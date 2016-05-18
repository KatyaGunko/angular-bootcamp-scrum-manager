(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $state, usersDataService) {
    var vm = this;

    vm.currentUser = usersDataService.getCurrentUser();

    $rootScope.$on('user-logged-in', function(){
      $state.go('home');
    });

    $rootScope.$on('user-logged-out', function(){
      usersDataService.setCurrentUser({});
      $state.go('login');
    });
  }
})();
