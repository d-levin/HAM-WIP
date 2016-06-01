'use strict';

/**
 * @ngdoc function
 * @name app.controller:AddControllerCtrl
 * @description
 * # AddControllerCtrl
 *
 */
angular.module('app')
  .controller('AddControllerCtrl', ['$scope', '$location', '$cookies', '$http', '$rootScope', '$timeout',
    function($scope, $location, $cookies, $http, $rootScope, $timeout) {

      $scope.onInit = function() {
        $rootScope.currentView = 'Add Controller';
        // Input by user
        $scope.controllerURI = "";
        $scope.updated = null;
      };

      $scope.addController = function(controllerURI) {
        if (controllerURI.length > 0) {
          $http.get('/controllers/uri/' + controllerURI)
            .success(function(response) {
              if (response !== null && response._id !== 'undefined' &&
                (response.userId === null || response.userId === 'undefined')) {
                var config = {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                };
                $http.put('/controllerbindings/' + response._id + '/' + $cookies.get('userId'), config)
                  .success(function() {
                    $scope.updated = true;
                    $timeout(function() {
                      $location.path('/mycontrollers');
                    }, 2000);
                  })
                  .error(function() {
                    $scope.updated = false;
                  });
              } else {
                $scope.updated = false;
              }
            })
            .error(function() {
              $scope.updated = false;
            });
        } else {
          $scope.updated = false;
        }
      };

    }
  ]);
