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
    .factory('MenuItem', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/menuitem/:id', {}, {
	    	get: {
				method: 'GET',
				params: {
		    		id: '@id'
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
//		    			console.log(data);
		    			return data;
		    		}
		    	]),
	    	},
	    	query: {
				method: 'GET',
				params: {
		    		id: '@id' 
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			var len = data.length;
		    			for (var i=0;i<len;i++) {
		    				data[i].spicy = (parseInt(data[i].spicy) == 1) ? true : false;
		    				data[i].gfree = (parseInt(data[i].gfree) == 1) ? true : false;
		    				data[i].state = (parseInt(data[i].state) == 1) ? true : false;
		    				data[i].vegetarian = (parseInt(data[i].vegetarian) == 1) ? true : false;
		    			}
		    			return data;
		    		}
		    	]),
				isArray: true
	    	},
	    	save: {
	    		method: 'PUT',
	    		params: {
	    			id:	'@id'
	    		},
	    	}
		})
    }]);

