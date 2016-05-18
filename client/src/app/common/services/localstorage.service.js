(function () {

  'use strict';

  angular
      .module('app.common.services')
      .service('$localstorage', $localstorage);

    /** @ngInject */
    function $localstorage ($window) {
      return {
        set: function (key, value) {
          $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        setObject: function (key, value) {
          $window.localStorage[key] = angular.toJson(value);
        },
        getObject: function (key) {
          return angular.fromJson($window.localStorage[key] || '{}');
        },
        removeItem: function (key) {
          $window.localStorage.removeItem(key);
        },
        clearAll: function () {
          $window.localStorage.clear();
        }
      };
    }

})();
