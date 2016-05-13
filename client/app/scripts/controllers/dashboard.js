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
      // $rootScope.serverURL = 'http://localhost:8080';
      // $scope.$on('$routeChangeSuccess', function() {
      //   // Username should be set in cookies at login
      //   // Hardcoded here for testing purposes
      //   var username = 'dennis.a.levin@gmail.com';
      //   $http.get($rootScope.serverURL + '/users/username/' + username)
      //     .success(function(response) {
      //       $scope.email = response.email;
      //       $scope.firstName = response.firstName;
      //     });
      // });
    }
  ]);
