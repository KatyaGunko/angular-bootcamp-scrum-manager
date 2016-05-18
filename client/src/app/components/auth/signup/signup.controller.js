(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('SignupController', SignupController);

  /** @ngInject */
  function SignupController(usersDataService) {

    var vm = this;

    usersDataService.getCurrentUser().doLogout();
    vm.user = usersDataService.getCurrentUser();
    vm.pageData = {
      confirmPassword: ''
    };

  }

})();
