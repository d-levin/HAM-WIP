'use strict';

/**
 * @ngdoc function
 * @name app.controller:SignInCtrl
 * @description
 * # SignInCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('SignInCtrl', ['$scope', '$location', '$cookies', '$http', '$rootScope', 'serverURL',
    function($scope, $location, $cookies, $http, $rootScope, serverURL) {
      $rootScope.homeURL = '/';
      $rootScope.currentView = 'Sign In';
      $rootScope.loggedIn = false;
      $scope.user = { 'username': 'dennis.a.levin@gmail.com', 'password': 'mypassword' };
      $scope.valid = true;
      $scope.validateUser = function() {
        // Validate input here
        // if ($scope.userForm.$valid) {
        if (1) {
          $http.get(serverURL + '/users/username/' + $scope.user.username)
            .success(function(response) {
              if (response) {
                $rootScope.username = response.email;
                $rootScope.email = response.email;
                $rootScope.firstName = response.firstName;
                $rootScope.loggedIn = true;
                $rootScope.homeURL = '/dashboard';
                // Store user info in cookie
                $cookies.put('userId', response._id);
                // Go to dashboard
                $location.path('/dashboard');
              } else {
                $scope.valid = false;
              }
            });
        }
      };
    }
  ]);
