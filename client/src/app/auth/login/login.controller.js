(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(User) {

    var vm = this;

    User.getCurrentUser().doLogout();
    vm.user = User.getCurrentUser();

  }

})();
