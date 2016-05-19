'use strict';

/**
 * @ngdoc function
 * @name app.controller:SubscriptionCtrl
 * @description
 * # SubscriptionCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('SubscriptionCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope) {

      $scope.onInit = function() {
        $rootScope.currentView = 'Manage Subscription';
      };
    }
  ]);
