(function() {
  'use strict';

  /**
   *  User class that creates users
   */

  angular.module('app').factory('User', function($rootScope, $http, $q, $localstorage, SERVER_CONFIG, toastr){

    var User = function(options){

      this.id = options.id;
      this.firstName = options.firstName || '';
      this.lastName = options.lastName || '';
      this.email = options.email || '';
      this.admin = options.admin || '';
    };

    User.prototype.doLogin = function(){
      var userObj = this;
      var request = $http.post(SERVER_CONFIG.API + '/signin', {email: userObj.email, password: userObj.password});

      var tempResponse = null;
      request.then(function (response) {
          if (response.status === 200) {
            tempResponse = response.data.user;
            return tempResponse;
          } else {
            return $q.reject(response);
          }
        })
        .then(function(user) {
          if (user && user.id) {
            userObj.id = user.id;
            userObj.firstName = user.firstName || '';
            userObj.lastName = user.lastName || '';
            userObj.email = user.email || '';
            userObj.admin = user.admin || '';

            return userObj;
          } else {
            return $q.reject(user);
          }
        })
        .then(function(userObj) {
          console.log('logging in');
          userObj.setAsCurrentUser();

          $rootScope.$emit('user-logged-in');

          return userObj;
        })
        .catch(function (error) {
          toastr.error('Sign in failed');
        });
    };

    User.prototype.doRegister = function() {
      var userObj = this;
      var request = $http.post(SERVER_CONFIG.API + '/signup', userObj);

      request.then(function (response) {
        if (response.status === 201) {
          console.log('logging in');
          userObj.setAsCurrentUser();

          $rootScope.$emit('user-logged-in');
          return userObj;
        } else {
          return $q.reject(response);
        }
      })
      .catch(function (error) {
        toastr.error('Sign up failed');
      });
    };

    User.prototype.doLogout = function(){
      console.log('logging out');

      this.unsetAsCurrentUser();

      $rootScope.$emit('user-logged-out');
    };

    User.prototype.setAsCurrentUser = function(){

      $localstorage.setObject('SCRUM_user', this);
    };

    User.prototype.unsetAsCurrentUser = function(){

      $localstorage.setObject('SCRUM_user', '');

      $rootScope.$emit('user-logged-out');

    };

    User.prototype.ifCurrentUser = function(){

      console.log('checking if current user');

    };

    return User;

  });

})();
