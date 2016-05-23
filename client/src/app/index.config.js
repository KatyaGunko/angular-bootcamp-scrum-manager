(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $httpProvider.interceptors.push(function($q, $rootScope) {
      var numLoadings = 0;

      return {
        request: function (config) {

          numLoadings++;

          // Show loader
          $rootScope.$broadcast("loader_show");
          return config || $q.when(config)

        },
        response: function (response) {

          if ((--numLoadings) === 0) {
            // Hide loader
            $rootScope.$broadcast("loader_hide");
          }

          return response || $q.when(response);

        },
        responseError: function (response) {

          if (!(--numLoadings)) {
            // Hide loader
            $rootScope.$broadcast("loader_hide");
          }

          return $q.reject(response);
        }
      };
    });

  }

})();
