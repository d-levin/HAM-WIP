'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function($scope, $cookies, $http) {
    $scope.$on('$routeChangeSuccess', function() {
      // Username should be set in cookies at login
      // Hardcoded here for testing purposes
      var username = 'dennis.a.levin@gmail.com';
      $http.get('http://localhost:8080/users/username/' + username)
        .success(function(response) {
          $scope.email = response.email;
          $scope.firstName = response.firstName;
          // Store user info in cookie
          $cookies.put('userId', response._id);
        });
    });
  });
