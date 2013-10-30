'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'myApp.filters', 'myApp.services',
				'myApp.directives', 'myApp.controllers'])
    .config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {
	    templateUrl : 'section/login.html',
	    controller : 'LoginCtrl'
	});
	$routeProvider.when('/manager', {
	    templateUrl : 'section/manager.html',
	    controller : 'ManagerCtrl'
	});
	$routeProvider.otherwise({
	    redirectTo : '/login'
	});
}]);
