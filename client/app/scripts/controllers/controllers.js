'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ControllerCtrl
 * @description
 * # ControllerCtrl
 * Get all controllers belonging to the current user
 * then get all controllers and store the intersection
 * of the results in $scope
 */
angular.module('clientApp')
  .controller('ControllerCtrl', function($scope, $cookies, $http, $log) {
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
                    response2[j].controllerNum = (i + 1);
                    results.push(response2[j]);
                    // Exit inner loop after first find
                    // Controller IDs are unique, no need to
                    // keep searching
                    break;
                  }
                }
              }
              $scope.items = results;
              // Set the default sort type
              $scope.sortType = 'index';
              // Set the default sort order
              $scope.sortReverse = false;
            });
        }
      });
  });
