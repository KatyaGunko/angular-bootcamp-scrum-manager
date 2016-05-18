(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(usersDataService) {

    var vm = this;

    vm.user = usersDataService.getCurrentUser();

  }

})();
