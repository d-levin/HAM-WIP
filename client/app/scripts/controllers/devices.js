'use strict';

/**
 * @ngdoc function
 * @name app.controller:DeviceCtrl
 * @description
 * # DeviceCtrl
 *
 */
angular.module('app')
  .controller('DeviceCtrl', ['$scope', '$cookies', '$http', '$log', '$rootScope', 'serverURL',
    function($scope, $cookies, $http, $log, $rootScope, serverURL) {
      // Set the default sort type
      $scope.sortType = 'index';
      // Set the default sort order
      $scope.sortReverse = false;
      // Set the default search/filter term
      $scope.searchDevice = '';

      // Manages the on/off events for devices
      $scope.change = function(deviceId) {
        // Call backend route here
        // connecting to Raspberry Pi
        // and turning off/on device
        $http.get(serverURL + '/devices/' + deviceId)
          .success(function(res) {
            if (res) {
              $http.put(serverURL + '/devices/' + deviceId, { toggled: !res.toggled })
                .success(function(res) {
                  if (res) {
                    $log.info('toggled: ' + res.toggled);
                  }
                });
            }
          });
      };

      // Handles removal of devices on click event
      $scope.unregDevice = function(deviceId) {
        $http.put(serverURL + '/devices/unregister/' + deviceId)
          .success(function() {
            // Remove the device from the view
            // Find the location of the item
            // Required to support filtering/sorting
            var index = 0;
            for (var i = 0; i < $scope.items.length; i++) {
              // If item exist, then guaranteed to have id field
              if ($scope.items[i]._id === deviceId) {
                index = i;
                break;
              }
            }
            $scope.items.splice(index, 1);
            // Clear the search filter
            $scope.searchDevice = '';
            // Show success notification
            $scope.updated = true;
          })
          .error(function() {
            $scope.updated = false;
          });
      };

      $scope.onInit = function() {
        $rootScope.currentView = 'Manage Devices';
        // Get current user from session variable
        $http.get(serverURL + '/users/' + $cookies.get('userId'))
          .success(function(response1) {
            // User is guaranteed to have the controllers member
            var controllers = response1.controllers;
            if (controllers && controllers.length > 0) {
              $http.get(serverURL + '/controllers/')
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
                    $http.get(serverURL + '/devices')
                      .success(function(response3) {
                        var finalResult = [];
                        var indexCounter = 1;
                        for (i = 0; i < devices.length; i++) {
                          for (j = 0; j < response3.length; j++) {
                            if (devices[i] === response3[j]._id && response3[j].registered === true) {
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
