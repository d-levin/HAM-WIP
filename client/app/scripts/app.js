'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .constant('serverURL', 'http://localhost:8080')
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
    // Routes must not have same names as backend express routes
    // Conflicts on page refresh
      .when('/', {
        templateUrl: 'views/signin.html',
        controller: 'SignInCtrl',
        controllerAs: 'signin'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignUpCtrl',
        controllerAs: 'signup'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
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
      .when('/mydevices/add', {
        templateUrl: 'views/add-devices.html',
        controller: 'AddDeviceCtrl',
        controllerAs: 'add-devices'
      })
      .when('/mydevices/add/customize', {
        templateUrl: 'views/customize-device.html',
        controller: 'CustomizeDeviceCtrl',
        controllerAs: 'customize-device'
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
