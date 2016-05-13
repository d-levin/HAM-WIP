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
  .controller('ControllerCtrl', ['$scope', '$cookies', '$http', '$rootScope', 'serverURL',
    function($scope, $cookies, $http, $rootScope, serverURL) {
      $scope.onInit = function() {
        $rootScope.currentView = 'Controllers';
        // Get current user from session variable
        $http.get(serverURL + '/controllers/byuser/' + $cookies.get('userId'))
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
      };
    }
  ]);
