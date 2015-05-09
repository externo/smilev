'use strict';

var demoApp = angular.module('App', ['ngRoute']);
demoApp.config(function ($routeProvider) {
    $routeProvider
        .when('/obrashtenie', {
            controller: '',
            templateUrl: 'templates/obrashtenie.html'})
        .when('/dalgoto-zavrashtane', {
            controller: '',
            templateUrl: 'templates/dalgoto-zavrashtane.html'})
        .when('/zhalta-roza', {
            controller: '',
            templateUrl: 'templates/zhalta-roza.html'})
        .when('/tango-s-dyavola', {
            controller: '',
            templateUrl: 'templates/tango-s-dyavola.html'})
        .otherwise({
            redirectTo : '/obrashtenie'});
});