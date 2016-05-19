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
      vm.currentUser = usersDataService.getCurrentUser();
      $state.go('home');
    });

    $rootScope.$on('user-logged-out', function(){
      usersDataService.setCurrentUser({});

      if ($state.current.name !== 'signup' && $state.current.name !== 'login') {
        $state.go('login');
      }
    });
  }
})();
