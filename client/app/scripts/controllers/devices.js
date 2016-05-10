'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DeviceCtrl
 * @description
 * # DeviceCtrl
 * 
 */
angular.module('clientApp')
  .controller('DeviceCtrl', function($scope, $cookies, $http, $log) {
    // Set the default sort type
    $scope.sortType = 'index';
    // Set the default sort order
    $scope.sortReverse = false;
    // Set the default search/filter term
    $scope.searchDevice = '';

    // Manages the on/off events for devices
    $scope.change = function(data) {
      // Call backend route here 
      // connecting to Raspberry Pi
      // and turning off/on device
      $log.info('Changing device id: ' + data);
      //alert('call status change: ' + data);
    };

    // Handles removal of devices on click event
    $scope.removeDevice = function(deviceId, controllerId) {
      $http.delete('http://localhost:8080/devicebindings/' + deviceId + '/' + controllerId)
        .success(function() {
          // Removes the device from the view
          // Use indexOf to support filtering then removal
          $scope.items.splice($scope.items.indexOf(deviceId), 1);
          // Clear the search filter
          $scope.searchDevice = '';
          // Show success notification
          $scope.updated = true;
        })
        .failure(function() {
          $scope.updated = false;
        });
    };

    // Get current user from session variable
    $http.get('http://localhost:8080/users/' + $cookies.get('userId'))
      .success(function(response1) {
        // User is guaranteed to have the controllers member
        var controllers = response1.controllers;
        if (controllers.length > 0) {
          $http.get('http://localhost:8080/controllers/')
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
                $http.get('http://localhost:8080/devices')
                  .success(function(response3) {
                    var finalResult = [];
                    for (i = 0; i < devices.length; i++) {
                      for (j = 0; j < response3.length; j++) {
                        if (devices[i] === response3[j]._id) {
                          response3[j].deviceNum = (i + 1);
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
  });
