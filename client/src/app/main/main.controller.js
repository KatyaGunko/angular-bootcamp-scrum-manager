(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $state) {
    var vm = this;


    $rootScope.$on('user-logged-in', function(){
      $state.go('home');
    });

    $rootScope.$on('user-logged-out', function(){
      $state.go('login');
    });
  }
})();
