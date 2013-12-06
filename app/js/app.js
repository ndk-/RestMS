'use strict';

// -----------------------------------------------------------------
// Main application routine
// -----------------------------------------------------------------
angular.module('myApp', ['ngRoute', 'myApp.filters', 'myApp.services',
			    'myApp.directives', 'myApp.controllers',
			    'ui.bootstrap', 'angularFileUpload'])
    .config(['$routeProvider', function($routeProvider) {

// Login
	$routeProvider.when('/login', {
	    templateUrl : 'section/login.html',
	    controller : 'LoginCtrl'
	});

// Customer login
	$routeProvider.when('/table', {
		templateUrl : 'section/table.html',
		controller : 'TableLoginCtrl'
	});

// Customer section
	$routeProvider.when('/customer', {
		templateUrl : 'section/customer.html',
	});

// Manager section
	$routeProvider.when('/manager', {
	    templateUrl : 'section/manager.html',
	    controller : 'ManagerCtrl'
	});

// Kitchen section
	$routeProvider.when('/kitchen', {
	    templateUrl : 'section/kitchen.html',
	    controller : 'KitchenCtrl'
	});

// Waiter section
	$routeProvider.when('/waiter', {
	    templateUrl : 'section/waiter.html',
	    controller : 'WaiterCtrl'
	});

// All other requests
	$routeProvider.otherwise({
	    redirectTo : '/login'
	});
}]);
