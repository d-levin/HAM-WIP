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
  .controller('ControllerCtrl', function($scope, $cookies, $http) {
    // Get current user from session variable
    $http.get('http://localhost:8080/controllers/byuser/' + $cookies.get('userId'))
      .success(function(response) {
        for (var i = 0; i < response.length; i++) {
          response[i].controllerNum = (i + 1);
        }
        $scope.items = response;
        // Set the default sort type
        $scope.sortType = 'index';
        // Set the default sort order
        $scope.sortReverse = false;
      });
  });
