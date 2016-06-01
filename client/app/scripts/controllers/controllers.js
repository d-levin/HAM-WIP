'use strict';

/**
 * @ngdoc function
 * @name app.controller:ControllerCtrl
 * @description
 * # ControllerCtrl
 * Get all controllers belonging to the current user
 * then get all controllers and store the intersection
 * of the results in $scope
 */
angular.module('app')
  .controller('ControllerCtrl', ['$scope', '$cookies', '$http', '$rootScope', '$location',
    function($scope, $cookies, $http, $rootScope, $location) {

      $scope.onInit = function() {
        $rootScope.currentView = 'Controllers';
        // Get current user from session variable
        $http.get('/controllers/byuser/' + $cookies.get('userId'))
          .success(function(response) {
            for (var i = 0; i < response.length; i++) {
              response[i].controllerNum = (i + 1);
            }
            if (response.length > 0) {
              $scope.items = response;
            } else {
              $scope.items = null;
            }
            // Set the default sort type
            $scope.sortType = 'index';
            // Set the default sort order
            $scope.sortReverse = false;
          });
      };

      $scope.addController = function() {
        $location.path('/mycontrollers/add');
      };

      $scope.removeController = function(itemId) {
        $http.delete('/controllerbindings/' + itemId + '/' +
            $cookies.get('userId'))
          .success(function() {
            $scope.updated = true;
            // Remove the controller from the view
            // Find the location of the item
            // Required to support filtering/sorting
            var index = 0;
            for (var i = 0; i < $scope.items.length; i++) {
              // If item exist, then guaranteed to have id field
              if ($scope.items[i]._id === itemId) {
                index = i;
                break;
              }
            }
            $scope.items.splice(index, 1);
            if ($scope.items.length <= 0) {
              $scope.items = null;
            }
          })
          .error(function() {
            $scope.updated = false;
          });
      };
    }
  ]);
