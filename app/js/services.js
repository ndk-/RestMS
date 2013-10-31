'use strict';

/* Services */


angular.module('myApp.services', ['ngResource'])
    .factory('MenuCategory', [ '$resource', function ($resource) {
	return $resource('db.php/menucategory/:id', {}, {
	    query: {
		method: 'GET',
		params: { id: '' },
		isArray: true
	    }
	})
    }])
    .factory('MenuItem', [ '$resource', function ($resource) {
	return $resource('db.php/menuitem/:cmd:id', {}, {
	    get: {
		method: 'GET',
		params: {
		    cmd: '',
		    id: '@id'
		}
	    },
	    query: {
		method: 'GET',
		params: {
		    cmd: '@cmd',
		    id: '@id' },
		isArray: true
	    }
	})
    }]);

