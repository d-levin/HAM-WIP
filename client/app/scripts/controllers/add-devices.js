'use strict';

/**
 * @ngdoc function
 * @name app.controller:AddDeviceCtrl
 * @description
 * # AddDeviceCtrl
 * 
 */
angular.module('app')
  .controller('AddDeviceCtrl', ['$scope', '$location', '$cookies', '$http', '$rootScope',
    function($scope, $location, $cookies, $http, $rootScope) {
      // Set the default sort type
      $scope.sortType = 'index';
      // Set the default sort order
      $scope.sortReverse = false;
      // Set the default search/filter term
      $scope.searchDevice = '';

      // Handles registration of devices on click event
      $scope.customizeDevice = function(deviceId) {

        $http.get('/devices/' + deviceId)
          .success(function(response) {
            $rootScope.deviceToUpdate = response;
            $location.path('/mydevices/add/customize');
          });
      };

      // Get current user from session variable
      $scope.onInit = function() {
        $rootScope.currentView = 'Add Devices';
        $http.get('/users/' + $cookies.get('userId'))
          .success(function(response1) {
            // User is guaranteed to have the controllers member
            var controllers = response1.controllers;
            if (controllers.length > 0) {
              $http.get('/controllers/')
                .success(function(response2) {
                  var results = [];
                  var i = 0;
                  var j = 0;
                  for (i = 0; i < controllers.length; i++) {
                    for (j = 0; j < response2.length; j++) {
                      if (controllers[i] === response2[j]._id) {
                        results.push(response2[j]);
                        // Exit inner loop after first find
                        // Controller IDs are unique, no need to
                        // keep searching
                        break;
                      }
                    }
                  }
                  // Will contain IDs of all devices for all controllers
                  // mapped to the current user
                  var devices = [];
                  for (i = 0; i < results.length; i++) {
                    for (j = 0; j < results[i].devices.length; j++) {
                      devices.push(results[i].devices[j]);
                    }
                  }

                  // Get all devices then filter
                  if (devices.length > 0) {
                    $http.get('/devices')
                      .success(function(response3) {
                        var finalResult = [];
                        var indexCounter = 1;
                        for (i = 0; i < devices.length; i++) {
                          for (j = 0; j < response3.length; j++) {
                            if (devices[i] === response3[j]._id && response3[j].registered === false) {
                              response3[j].deviceNum = indexCounter++;
                              finalResult.push(response3[j]);
                              // Exit inner loop after first find
                              // Device IDs are unique, no need to
                              // keep searching
                              break;
                            }
                          }
                        }
                        $scope.items = finalResult;
                      });
                  }
                });
            }
          });
      };
    }
  ]);
