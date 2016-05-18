(function() {
  'use strict';

  angular
    .module('app')
    .run(permissionsConfig);

  /** @ngInject */
  function permissionsConfig(PermissionStore, RoleStore, usersDataService) {

    /**
     * permissions definition
     */

    // checks if user logged in
    PermissionStore
      .definePermission('user-logged-in', function () {
        return !!usersDataService.getCurrentUser().id;
      });

    // checks if user is admin
    PermissionStore
      .definePermission('user-is-admin', function () {
        return !!usersDataService.getCurrentUser().admin;
      });


    /**
     * roles definition
     */

    // user role
    RoleStore
      .defineRole('user',  ['user-logged-in']);

    // admin role
    RoleStore
      .defineRole('admin',  ['user-logged-in', 'user-is-admin']);

  }

})();
