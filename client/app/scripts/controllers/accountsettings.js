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
        $scope.firstName = response.firstName; // Required
        $scope.lastName = response.lastName; // Required
        $scope.email = response.email; // Required
        $scope.street1 = response.street1;
        $scope.street2 = response.street2;
        $scope.state = response.state;
        $scope.zip = response.zip;
        $scope.country = response.country;
        $scope.phone = response.phone;
        $scope.password = response.password; // Required
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
      params += 'street1=' + $scope.street1 + '&';
      params += 'street2=' + $scope.street2 + '&';
      params += 'state=' + $scope.state + '&';
      params += 'zip=' + $scope.zip + '&';
      params += 'country=' + $scope.country + '&';
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
