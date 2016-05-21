'use strict';

/**
 * @ngdoc function
 * @name app.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('DashboardCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope) {
      $scope.onInit = function() {
        $rootScope.currentView = 'Dashboard';
        $rootScope.dashboard = true;
      };
    }
  ]);
