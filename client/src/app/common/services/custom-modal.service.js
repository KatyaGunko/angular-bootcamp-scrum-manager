(function () {

  'use strict';

  angular
    .module('app.common.services')
    .factory('myCustomModal', myCustomModal);

  /** @ngInject */
  function myCustomModal($document, $compile, $controller, $rootScope, $q, $templateRequest, $timeout) {

      var body = $document.find('body')[0];

      function Modal() {

        var self = this;

        //  Returns a promise which gets the template via a request to the
        //  template url parameter.
        var getModalTemplate = function(templateUrl) {
          var deferred = $q.defer();
          if (templateUrl) {
            $templateRequest(templateUrl, true)
              .then(function(template) {
                deferred.resolve(template);
              }, function(error) {
                deferred.reject(error);
              });
          } else {
            deferred.reject("No templateUrl has been specified.");
          }
          return deferred.promise;
        };

        //  Adds an element to the DOM as the last child of the body
        var appendModal = function(child) {
          body.appendChild(child);
        };

        var addModalWrapper = function(child) {
          var wrapper = document.createElement('div');
          wrapper.classList.add('custom-modal');
          wrapper.appendChild(child[0]);

          return wrapper;
        };

        self.showModal = function(options) {
          //  Create a deferred we'll resolve when the modal is ready.
          var deferred = $q.defer();

          //  Check if there is a controller name
          var controllerName = options.controller;
          if (!controllerName) {
            deferred.reject("No controller has been specified.");
            return deferred.promise;
          }

          //  Get the html of the template.
          getModalTemplate(options.templateUrl)
            .then(function(template) {

              //  Create a new scope for the modal.
              var modalScope = (options.parentScope || $rootScope).$new();

              modalScope.$parent = options.parentScope || $rootScope;

              modalScope.closeModal = function(result, delay) {
                if (delay === undefined || delay === null) delay = 0;
                $timeout(function() {
                  //  Resolve the 'close' promise.
                  closeDeferred.resolve(result);

                  //  Let angular remove the element and wait for animations to finish.
                  body.removeChild(modalElement);
                  //  Resolve the 'closed' promise.
                  closedDeferred.resolve(result);

                  //  We can now clean up the scope
                  modalScope.$destroy();

                  //  Unless we null out all of these objects we seem to suffer
                  //  from memory leaks, if anyone can explain why then I'd
                  //  be very interested to know.
                  inputs.close = null;
                  deferred = null;
                  closeDeferred = null;
                  inputs = null;
                  modalElement = null;
                  modalScope = null;

                }, delay);
              };

              var modalElement;

              var closeDeferred = $q.defer();
              var closedDeferred = $q.defer();
              var inputs = {
                $scope: modalScope
              };

              //  If we have provided any resolve params, pass them to the controller.

              var arrayToResolve = [];
              for(var key in options.resolve) {
                arrayToResolve.push(options.resolve[key]().promise);
              }
              var resolve = $q.all(arrayToResolve);
              resolve.then(function(resolvedValues){
                var index = 0;
                for(var key in options.resolve) {
                  inputs[key] = resolvedValues[index++];
                }

                  //compiling element
                var linkFn = $compile(template);
                modalElement = addModalWrapper(linkFn(modalScope));
                inputs.$element = modalElement;

                var modalController = $controller(options.controller, inputs, false, options.controllerAs);

                appendModal(modalElement);

                //  We now have a modal object...
                var modal = {
                  controller: modalController,
                  scope: modalScope,
                  element: modalElement,
                  close: closeDeferred.promise,
                  closed: closedDeferred.promise
                };

                //  ...which is passed to the caller via the promise.
                deferred.resolve(modal);

              });

            })
            .then(null, function(error) { // 'catch' doesn't work in IE8.
              deferred.reject(error);
            });

          return deferred.promise;
        }
      }
      return new Modal();
  }

})();
