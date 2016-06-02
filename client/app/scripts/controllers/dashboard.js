'use strict';

/**
 * @ngdoc function
 * @name app.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('DashboardCtrl', ['$scope', '$rootScope', '$http', '$cookies',
    function($scope, $rootScope, $http, $cookies) {
      $scope.onInit = function() {
        $rootScope.currentView = 'Dashboard';
        $rootScope.dashboard = true;
        $http.get('/auth/currentuser').
        success(function(data) {
          $rootScope.loggedUser = data;
          $rootScope.username = data.email;
          $rootScope.email = data.email;
          $rootScope.firstName = data.firstName;
          $rootScope.premium = data.premium;
          $rootScope.loggedIn = true;
          $rootScope.homeURL = '/dashboard';
          // Store user info in cookie
          $cookies.put('userId', data._id);
        }).
        error(function() {
          $scope.alert = 'Login failed';
        });
      };
    }
  ]);
