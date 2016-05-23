(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $state, User) {
    var vm = this;

    vm.currentUser = User.getCurrentUser();

    $rootScope.$on('user-logged-in', function() {
      vm.currentUser = User.getCurrentUser();
      $state.go('home');
    });

    $rootScope.$on('user-logged-out', function() {
      vm.currentUser = User.currentUser;
      if ($state.current.name !== 'signup' && $state.current.name !== 'login') {
        $state.go('login');
      }
    });

    $rootScope.$on("loader_show", function () {
      vm.isLoading = true;
    });
    $rootScope.$on("loader_hide", function () {
      vm.isLoading = false;
    });
  }
})();
