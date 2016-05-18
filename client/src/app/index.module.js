(function() {
  'use strict';

  angular
    .module('app', [
      'ngAnimate',
      'ngCookies',
      'ngSanitize',
      'ngMessages',
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'toastr',
      'permission',
      'permission.ui',
      'app.common',
      'app.auth',
      'app.home'
    ]);

})();
