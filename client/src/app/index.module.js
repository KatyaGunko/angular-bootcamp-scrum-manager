(function() {
  'use strict';

  angular
    .module('app', [
      'ngAnimate', '' +
      'ngCookies',
      'ngSanitize',
      'ngMessages',
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'toastr',
      'app.common',
      'app.auth',
      'app.home'
    ]);

})();
