(function () {

  'use strict';

  angular
    .module('app.common.services')
    .factory('myCustomModal', myCustomModal);

  /** @ngInject */
  function myCustomModal($document, $compile, $controller, $rootScope, $q, $timeout, $templateRequest, $injector) {

    var body = $document.find('body')[0];

    function Modal() {

      var self = this;

      //  Returns a promise which gets the template via a request to the
      //  template url parameter.
      var getModalTemplate = getModalTemplate;

      //  Adds an element to the DOM as the last child of the body
      var appendModal = appendModal;

      // Adding wrapper around the element to create backdrop
      var addModalWrapper = addModalWrapper;

      // Revealing showModal method that will init the modal
      self.showModal = function(options) {
        //  Create a deferred we'll resolve when the modal is ready.
        var deferred = $q.defer();

        var controllerName = options.controller;

        // array of params to resolve
        var arrayToResolve = [];

        // array of promises to resolve
        var resolvePromises;

        // future scope params
        var scopeParams = {};

        //  Check if there is a controller name
        if (!controllerName) {
          deferred.reject("No controller has been specified.");
          return deferred.promise;
        }

        //  If we have provided any resolve params, resolving them
        for(var key in options.resolve) {
          arrayToResolve.push($injector.invoke(options.resolve[key]).promise);
        }
        // resolving all promises
        resolvePromises = $q.all(arrayToResolve);

        resolvePromises
          .then(function(resolvedItems){
            //adding all params to scopeParams
            var index = 0;
            for(var key in options.resolve) {
              scopeParams[key] = resolvedItems[index++];
            }
            //  Get the html of the template.
            return getModalTemplate(options.templateUrl);
          })
          .then(function(template){

            // our future modal element
            var modalElement;

            var closeDeferred = $q.defer();
            var closedDeferred = $q.defer();
            var inputs;

            //  Create a new scope for the modal.
            var modalScope = (options.parentScope || $rootScope).$new();

            // specifying $parent node manually
            modalScope.$parent = options.parentScope || $rootScope;

            // adding method for closing modal
            modalScope.closeModal = function(result, delay) {

              if (delay === undefined || delay === null) delay = 0;

              $timeout(function() {
                //  Resolve the 'close' promise.
                closeDeferred.resolve(result);

                //  removing the element from dom
                body.removeChild(modalElement);

                //  Resolving the 'closed' promise.
                closedDeferred.resolve(result);

                //  We can now clean up the scope
                modalScope.$destroy();

                //  clearing up variables
                deferred = null;
                closeDeferred = null;
                inputs = null;
                modalElement = null;
                modalScope = null;
              }, delay);
            };

            scopeParams.$scope = modalScope;

            //compiling element
            var linkFn = $compile(template);
            modalElement = addModalWrapper(linkFn(modalScope));
            // adding $element param if ne will need to inject it to controller
            scopeParams.$element = modalElement;

            // creating controller for modal
            var modalController = $controller(options.controller, scopeParams);

            // adding modal to DOM
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

          })
          .catch(function(error){
            deferred.reject(error);
          });

        return deferred.promise;
      };

      function getModalTemplate(templateUrl) {
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
      }

      function appendModal(child) {
        body.appendChild(child);
      }

      function addModalWrapper(child) {
        var wrapper = document.createElement('div');
        wrapper.classList.add('custom-modal');
        wrapper.appendChild(child[0]);

        return wrapper;
      }
    }

    return new Modal();
  }

})();
