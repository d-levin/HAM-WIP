'use strict';

/**
 * @ngdoc function
 * @name app.controller:CustomizeDeviceCtrl
 * @description
 * # CustomizeDeviceCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('CustomizeDeviceCtrl', ['$scope', '$log', '$timeout', '$location', '$cookies', '$http', '$rootScope',
    function($scope, $log, $timeout, $location, $cookies, $http, $rootScope) {

      $scope.onInit = function() {
        $rootScope.currentView = 'Customize Device';
        if ($rootScope.deviceToUpdate) {
          $scope.deviceName = $rootScope.deviceToUpdate.name;
          $scope.deviceDescription = $rootScope.deviceToUpdate.description;
          $scope.deviceLocation = $rootScope.deviceToUpdate.location;
          $scope.deviceId = $rootScope.deviceToUpdate._id;
        }
        $scope.deviceAdded = false;
      };

      $scope.returnToDevices = function() {
        $location.path('/mydevices/add');
      };

      $scope.registerDevice = function() {
        var params = '';
        params += 'name=' + $scope.deviceName + '&';
        params += 'description=' + $scope.deviceDescription + '&';
        params += 'location=' + $scope.deviceLocation + '&';
        params += 'registered=true';

        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        $http.put('/devices/' + $scope.deviceId, params, config)
          .success(function() {
            $scope.updated = true;
            $scope.deviceAdded = true;
            $timeout(function() {
              $location.path('/mydevices/add');
            }, 2000);
          })
          .error(function() {
            $scope.updated = false;
            $scope.deviceAdded = false;
          });
      };
    }
  ]);
