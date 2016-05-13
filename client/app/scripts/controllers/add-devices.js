'use strict';

/**
 * @ngdoc function
 * @name app.controller:AddDeviceCtrl
 * @description
 * # AddDeviceCtrl
 * 
 */
angular.module('app')
  .controller('AddDeviceCtrl', ['$scope', '$cookies', '$http', '$rootScope', 'serverURL',
    function($scope, $cookies, $http, $rootScope, serverURL) {
      // Set the default sort type
      $scope.sortType = 'index';
      // Set the default sort order
      $scope.sortReverse = false;
      // Set the default search/filter term
      $scope.searchDevice = '';

      // Handles registration of devices on click event
      $scope.registerDevice = function(deviceId) {
        $http.put(serverURL + '/devices/register/' + deviceId, { registered: true })
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

      // Get current user from session variable
      $scope.onInit = function() {
        $rootScope.currentView = 'Add Devices';
        $http.get(serverURL + '/users/' + $cookies.get('userId'))
          .success(function(response1) {
            // User is guaranteed to have the controllers member
            var controllers = response1.controllers;
            if (controllers.length > 0) {
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
