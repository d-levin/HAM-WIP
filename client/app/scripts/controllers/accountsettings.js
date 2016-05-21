'use strict';

/**
 * @ngdoc function
 * @name app.controller:AccountSettingsCtrl
 * @description
 * # AccountSettingsCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('AccountSettingsCtrl', ['$scope', '$location', '$cookies', '$http', '$rootScope',
    function($scope, $location, $cookies, $http, $rootScope) {

      $scope.onInit = function() {
        $rootScope.currentView = 'Account Settings';
        $http.get('/users/' + $cookies.get('userId'))
          .success(function(response) {
            $scope.firstName = response.firstName; // Required
            $scope.lastName = response.lastName; // Required
            $scope.email = response.email; // Required
            $scope.street1 = response.street1;
            $scope.street2 = response.street2;
            $scope.state = response.state;
            $scope.zip = response.zip;
            $scope.phone = response.phone;
            $scope.password = response.password; // Required
          });
      };

      $scope.returnHome = function() {
        $location.path('/dashboard');
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
        $http.put('/users/' + $cookies.get('userId'), params, config)
          .success(function() {
            $scope.updated = true;
            $scope.submitted = true;
            $rootScope.firstName = $scope.firstName;
            $rootScope.email = $scope.email;
          })
          .error(function() {
            $scope.updated = false;
            $scope.submitted = false;
          });
      };
    }
  ]);
