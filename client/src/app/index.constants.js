/* global malarkey:false, moment:false */
(function() {
  'use strict';

  var SERVER_CONFIG = {

    API: '/api'
  };

  angular
    .module('app')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('SERVER_CONFIG', SERVER_CONFIG);

})();
