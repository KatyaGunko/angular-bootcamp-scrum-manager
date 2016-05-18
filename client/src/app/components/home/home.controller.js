(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(usersDataService, $state) {

    var vm = this;

    vm.currentUser = usersDataService.getCurrentUser();
  }

})();
