(function () {
  'use strict';

  angular.module('app.common.directives')
    .directive('clickOutsideElement', clickOutsideElement);

  /* @ngInject */
  function clickOutsideElement($window, $parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var clickOutHandler = $parse(attrs.clickOut);
        var clickInHandler = $parse(attrs.clickIn);

        element.on('click', function (event) {
          console.log('element clicked');
          clickInHandler(scope, {$event: event});
          angular.element($window).on('click', function (event) {
            if (element[0].contains(event.target)) return;
            clickOutHandler(scope, {$event: event});
            scope.$apply();
            console.log('body clicked');

            angular.element($window).off('click');
          });

        });
      }
    }
  }

})();
