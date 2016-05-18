(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(usersDataService) {

    var vm = this;

    usersDataService.getCurrentUser().doLogout();
    vm.user = usersDataService.getCurrentUser();

  }

})();
