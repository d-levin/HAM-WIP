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
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
    // Routes must not have same names as backend express routes
    // Conflicts on page refresh
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
      .when('/mycontrollers', {
        templateUrl: 'views/controllers.html',
        controller: 'ControllerCtrl',
        controllerAs: 'controllers'
      })
      .when('/mydevices', {
        templateUrl: 'views/devices.html',
        controller: 'DeviceCtrl',
        controllerAs: 'devices'
      })
      .when('/mysubscription', {
        templateUrl: 'views/subscription.html',
        controller: 'SubscriptionCtrl',
        controllerAs: 'subscription'
      })
      .when('/myaccountsettings', {
        templateUrl: 'views/accountsettings.html',
        controller: 'AccountSettingsCtrl',
        controllerAs: 'accountsettings'
      })
      .otherwise({
        redirectTo: '/'
      });
    // Use the HTML5 History API to prettify the URL
    $locationProvider.html5Mode(true);
  });
