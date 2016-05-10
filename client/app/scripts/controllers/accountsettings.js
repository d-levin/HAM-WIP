'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AccountSettingsCtrl
 * @description
 * # AccountSettingsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AccountSettingsCtrl', function($scope, $location, $cookies, $http, $log) {
    $http.get('http://localhost:8080/users/' + $cookies.get('userId'))
      .success(function(response) {
        $scope.firstName = response.firstName;
        $scope.lastName = response.lastName;
        $scope.email = response.email;
        $scope.phone = response.phone;
        $scope.password = response.password;
      });
    $scope.returnHome = function() {
      $location.path('/');
    };
    $scope.updateUser = function() {
      var params = '';
      params += 'firstName=' + $scope.firstName + '&';
      params += 'lastName=' + $scope.lastName + '&';
      params += 'phone=' + $scope.phone + '&';
      params += 'email=' + $scope.email + '&';
      params += 'password=' + $scope.password;

      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      $http.put('http://localhost:8080/users/' + $cookies.get('userId'), params, config)
        .success(function() {
          $scope.updated = true;
          $scope.submitted = true;
        })
        .error(function(response) {
          $scope.updated = false;
          $scope.submitted = false;
          $log.error('User update failed: ' + response);
        });
    };
  });
