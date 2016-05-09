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
    var username = 'dennis.a.levin@gmail.com';
    $http.get('http://localhost:8080/users/username/' + username)
      .success(function(response) {
        $scope.username = response.firstName;
        $scope.email = response.email;
        // Store user info in cookie
        $cookies.put('userId', response._id);
      });
  });
