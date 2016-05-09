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
    // Get current user from session variable
    $http.get('http://localhost:8080/users/' + $cookies.get('userId'))
      .success(function(response1) {
        // User is guaranteed to have the controllers member
        var controllers = response1.controllers;
        if (controllers.length > 0) {
          $http.get('http://localhost:8080/controllers/')
            .success(function(response2) {
              var results = [];
              for (var i = 0; i < controllers.length; i++) {
                for (var j = 0; j < response2.length; j++) {
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
              for (var i = 0; i < results.length; i++) {
                for (var j = 0; j < results[i].devices.length; j++) {
                  devices.push(results[i].devices[j]);
                }
              }

              // Get all devices then filter
              if (devices.length > 0) {
                $http.get('http://localhost:8080/devices')
                  .success(function(response3) {
                    var finalResult = [];
                    for (var i = 0; i < devices.length; i++) {
                      for (var j = 0; j < response3.length; j++) {
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
                    $scope.removeDevice = function(data) {
                      $log.info(data);
                      alert('removing device id: ' + data);
                    };
                    $scope.change = function(data) {
                      // Call backend route here 
                      // connecting to Raspberry Pi
                      // and turning off/on device
                      alert('call status change: ' + data);
                    };
                    // Set the default sort type
                    $scope.sortType = 'index';
                    // Set the default sort order
                    $scope.sortReverse = false;
                    // Set the default search/filter term
                    $scope.searchDevice = '';
                  });
              }
            });
        }
      });
  });
