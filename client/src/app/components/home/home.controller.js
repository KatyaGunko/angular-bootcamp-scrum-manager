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
        parentScope: $scope,
        resolve: {
          one: function () {
            var one = $q.defer();

            $timeout(function () {
              one.resolve("one done");
            }, 0);

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
      });
    }
  }

  angular
    .module('app.home').controller('ModalController', function($scope, one, two) {

      console.log(one);
      console.log(two);
  });

})();
