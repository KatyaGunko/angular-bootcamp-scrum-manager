 (function() {
  'use strict';

  /**
   *  User class that creates users
   */

  angular.module('app').factory('User', function($rootScope, $http, $q, $localstorage, SERVER_CONFIG, toastr){

    /**
     *  Constructor
     */
    var User = function(options) {
      this.id = options.id;
      this.firstName = options.firstName || '';
      this.lastName = options.lastName || '';
      this.email = options.email || '';
      this.admin = options.admin || '';
    };


    /**
     *  User login method
     */
    User.prototype.doLogin = function(){
      var userObj = this;
      var request = $http.post(SERVER_CONFIG.API + '/signin', {email: userObj.email, password: userObj.password});

      var tempResponse = null;
      request.then(function (response) {
          if (response.status === 200) {
            tempResponse = response.data.user;
            delete tempResponse.password;
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


    /**
     *  User sign up method
     */
    User.prototype.doRegister = function() {
      var userObj = this;
      var request = $http.post(SERVER_CONFIG.API + '/signup', userObj);

      request.then(function (response) {
        if (response.status === 201) {
          userObj.doLogin();
          return userObj;
        } else {
          return $q.reject(response);
        }
      })
      .catch(function (error) {
        toastr.error('Sign up failed');
      });
    };


    /**
     *  User log out method
     */
    User.prototype.doLogout = function(){
      console.log('logging out');
      this.unsetAsCurrentUser();
      $rootScope.$emit('user-logged-out');
    };


    /**
     *  Setting user as current user and saving to localstorage
     */
    User.prototype.setAsCurrentUser = function(){

      $localstorage.setObject('SCRUM_user', this);

      User.currentUser.id = this.id || '';
      User.currentUser.firstName = this.firstName || '';
      User.currentUser.lastName = this.lastName || '';
      User.currentUser.email = this.email || '';
      User.currentUser.admin = this.admin || false;
    };


    /**
     *  Making user not a current user and deleting from localstorage
     */
    User.prototype.unsetAsCurrentUser = function(){
      $localstorage.setObject('SCRUM_user', {});
      User.currentUser = new User({});
    };


    /**
     *  Static fields and methods
     */
    User.currentUser = new User({});

    /**
     *  Updating current user object
     */
    User.getCurrentUser = function(){
      if (!User.currentUser || !User.currentUser.id) {
        var userData;

        try {
          userData = new User($localstorage.getObject('SCRUM_user'));
        } catch(e) {
          $localstorage.setObject('SCRUM_user', {});
          $rootScope.$emit('user-logged-out');
        }

        if ( userData && userData.id ) {
          User.currentUser = new User(userData);
          $rootScope.$emit('user-logged-in');
        } else {
          $localstorage.setObject('SCRUM_user', {});
          $rootScope.$emit('user-logged-out');
        }
      }
      return User.currentUser;
    };

    return User;

  });
})();
