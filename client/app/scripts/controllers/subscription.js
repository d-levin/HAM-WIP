'use strict';

/**
 * @ngdoc function
 * @name app.controller:SubscriptionCtrl
 * @description
 * # SubscriptionCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('SubscriptionCtrl', ['$scope', '$rootScope', '$http', '$cookies', '$timeout', '$location',
    function($scope, $rootScope, $http, $cookies, $timeout, $location) {

      $scope.onInit = function() {
        $rootScope.currentView = 'Manage Subscription';
      };

      $scope.purchase = function() {
        var params = 'premium=true';
        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        $http.put('/users/' + $cookies.get('userId'), params, config)
          .success(function() {
            $scope.updated = true;
            $timeout(function() {
              $rootScope.premium = true;
              $location.path('/dashboard');
            }, 2000);
          })
          .error(function() {
            $scope.updated = false;
          });
      };

      $scope.cancel = function() {
        var params = 'premium=false';
        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        $http.put('/users/' + $cookies.get('userId'), params, config)
          .success(function() {
            $scope.updated = true;
            $timeout(function() {
              $rootScope.premium = false;
              $location.path('/dashboard');
            }, 2000);
          })
          .error(function() {
            $scope.updated = false;
          });
      };
    }
  ]);
