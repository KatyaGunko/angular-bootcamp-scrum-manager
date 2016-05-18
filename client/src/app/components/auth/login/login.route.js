(function() {
  'use strict';

  angular
    .module('app.auth')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/components/auth/login/login.tmpl.html',
        controller: 'LoginController',
        controllerAs: 'login',
        data: {
          title: 'login_title',
          cssClass: 'login'
        }
      });
  }

})();


