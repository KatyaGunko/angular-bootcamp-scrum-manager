(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, User, myCustomModal, $q) {

    var vm = this;

    vm.currentUser = User.getCurrentUser();

    vm.showModal = showModal;
    vm.showAnotherModal = showAnotherModal;

    var dropdown = document.getElementsByClassName('dropdown-menu')[0];
    $scope.showDropdown = function(){
      dropdown.style.display === 'block' ? dropdown.style.display = 'none' : dropdown.style.display = 'block';
    };
    $scope.hideDropdown = function(){
      dropdown.style.display = 'none';
    };

    function showModal(){
      myCustomModal.showModal({
        templateUrl: "./app/home/partials/modal.tmpl.html",
        controller: "ModalController",
        parentScope: $scope,
        resolve: {
          projectName: function ($timeout, $q) {
            var one = $q.defer();

            $timeout(function () {
              one.resolve("My new project");
            }, 1000);

            return one;
          },
          two: function ($timeout, $q) {
            var two = $q.defer();

            $timeout(function () {
              two.resolve("two done");
            }, 0);

            return two;
          }
        }
      }).then(function(modal) {
        modal.close.then(function(result) {
          result ? alert('new project ' + result + ' was created!') : '';
        });
        return;
      }).catch(function(error){
        console.log(error);
      });
    }

    function showAnotherModal(){
      myCustomModal.showModal({
        templateUrl: "./app/home/partials/another-modal.tmpl.html",
        controller: "AnotherModalController",
        parentScope: $scope,
        resolve: {
          projectName: function ($timeout, $q) {
            var one = $q.defer();
            $timeout(function () {
              one.resolve("My new project");
            }, 0);

            return one;
          },
          two: function ($timeout, $q) {
            var two = $q.defer();

            $timeout(function () {
              two.resolve("two done");
            }, 2000);

            return two;
          }
        }
      }).then(function(modal) {

        modal.close.then(function(result) {
          result ? alert('new project ' + result + ' was created!') : '';
        });
      }).catch(function(error){
        console.log(error);
      });
    }
  }

  angular
    .module('app.home').controller('ModalController', function($scope, projectName, two) {
      $scope.projectName = projectName;
  });

  angular
    .module('app.home').controller('AnotherModalController', function($scope, projectName, two) {
      $scope.projectName = projectName;
  });

})();
