'use strict';

/**
 * @ngdoc function
 * @name app.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('SignUpCtrl', ['$scope', '$rootScope', '$location',
    function($scope, $rootScope, $location) {
      $rootScope.currentView = 'Sign Up';
      $scope.createUser = function() {
        // Go to dashboard
        $location.path('/dashboard');
      };
    }
  ]);
