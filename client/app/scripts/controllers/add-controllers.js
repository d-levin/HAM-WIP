'use strict';

/**
 * @ngdoc function
 * @name app.controller:AddControllerCtrl
 * @description
 * # AddControllerCtrl
 *
 */
angular.module('app')
  .controller('AddControllerCtrl', ['$scope', '$location', '$cookies', '$http', '$rootScope', '$timeout', '$log',
    function($scope, $location, $cookies, $http, $rootScope, $timeout, $log) {

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
              $log.info('got controller by uri');
              if (response !== null && response._id !== 'undefined' &&
                (!response.userId || response.userId === null || response.userId === 'undefined')) {
                var config = {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                };
                $http.put('/controllerbindings/' + response._id + '/' + $cookies.get('userId'), config)
                  .success(function() {
                    $log.info('put controller');
                    $scope.updated = true;
                    $timeout(function() {
                      $location.path('/mycontrollers');
                    }, 2000);
                  })
                  .error(function() {
                    $log.info('error putting');
                    $scope.updated = false;
                  });
              } else {
                $log.info('controller not found by uri');
                $scope.updated = false;
              }
            })
            .error(function() {
              $log.info('error getting controller by uri');
              $scope.updated = false;
            });
        } else {
          $log.info('controller by uri too short');
          $scope.updated = false;
        }
      };

    }
  ]);
