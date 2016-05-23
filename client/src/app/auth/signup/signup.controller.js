(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('SignupController', SignupController);

  /** @ngInject */
  function SignupController(User) {

    var vm = this;

    User.getCurrentUser().doLogout();
    vm.user = User.getCurrentUser();
    vm.pageData = {
      confirmPassword: ''
    };

  }

})();
