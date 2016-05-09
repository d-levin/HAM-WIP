'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function($routeProvider) {
    $routeProvider
    // Figure out how to call multiple views/controllers for one route
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/controllers', {
        templateUrl: 'views/controllers.html',
        controller: 'ControllerCtrl',
        controllerAs: 'controllers'
      })
      .when('/devices', {
        templateUrl: 'views/devices.html',
        controller: 'DeviceCtrl',
        controllerAs: 'devices'
      })
      .when('/subscription', {
        templateUrl: 'views/subscription.html',
        controller: 'SubscriptionCtrl',
        controllerAs: 'subscription'
      })
      .when('/accountsettings', {
        templateUrl: 'views/accountsettings.html',
        controller: 'AccountSettingsCtrl',
        controllerAs: 'accountsettings'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
