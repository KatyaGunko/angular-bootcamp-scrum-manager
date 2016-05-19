(function() {
  'use strict';

  angular
    .module('app.home')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/home.tmpl.html',
        controller: 'HomeController',
        controllerAs: 'home',
        data: {
          title: 'home_title',
          cssClass: 'home',
          //permissions: {
          //  only: ['user'],
          //  redirectTo: 'login'
          //}
        }
      });
  }

})();


