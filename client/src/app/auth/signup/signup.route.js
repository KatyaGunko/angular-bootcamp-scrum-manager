(function() {
  'use strict';

  angular
    .module('app.auth')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/auth/signup/signup.tmpl.html',
        controller: 'SignupController',
        controllerAs: 'signup',
        data: {
          title: 'signup_title',
          cssClass: 'signup'
        }
      });
  }

})();


