(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, usersDataService, myCustomModal, $q, $timeout) {

    var vm = this;

    vm.currentUser = usersDataService.getCurrentUser();

    vm.showModal = showModal;

    function showModal(){
      myCustomModal.showModal({
        templateUrl: "./app/components/home/partials/modal.tmpl.html",
        controller: "ModalController",
        controllerAs: 'modal',
        parentScope: $scope,
        resolve: {
          projectName: function () {
            var one = $q.defer();

            $timeout(function () {
              one.resolve("My new project");
            }, 1000);

            return one;
          },
          two: function () {
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
      });
    }
  }

  angular
    .module('app.home').controller('ModalController', function($scope, projectName, two) {
      $scope.projectName = projectName;
  });

})();
