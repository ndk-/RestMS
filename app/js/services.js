'use strict';

/* Services */


angular.module('myApp.services', ['ngResource'])
// Menu category service
    .factory('MenuCategory', [ '$resource', function ($resource) {
	return $resource('db.php/menucategory/:id', {}, {
	    query: {
		method: 'GET',
		params: { id: '' },
		isArray: true
	    }
	})
    }])
// Storing user data    
    .factory('Credentials', [ '$http', '$resource', function ($http, $resource) {
    	var credentials = new Object();
    	return credentials;
    }])
    .factory('Order',[ '$http', '$resource',function ($http, $resource){
    	var order = new Object();
    	return order;
    }])
    .factory('Cart',[ '$http', '$resource',function ($http, $resource){
    	var cart = new Object();
    	return cart;
    }])
    .factory('Table',[ '$http', '$resource',function ($http, $resource){
    	var table = new Object();
    	return table;
    }])
// Menu items service    
    .factory('MenuItem', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/menuitem/:cmd/:id', {}, {
	    	get: {
				method: 'GET',
				params: {
		    		id: '@id'
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			data.spicy = (data.spicy == true) ? "1" : "0";
		    			data.gfree = (data.gfree == true) ? "1" : "0";
		    			data.state = (data.state == true) ? "1" : "0";
		    			data.vegetarian = (data.vegetarian == true) ? "1" : "0";
		    			return data;
		    		}
		    	])
	    	},
	    	remove: {
				method: 'DELETE',
				params: {
		    		id: '@id'
		    	}
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
	    	cQuery: {
				method: 'GET',
				params: {
					cmd: 'state',
		    		id: '0' 
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
		    	transformRequest: [
		    		function (data, headersSetter) {
		    			data.spicy = (data.spicy == true) ? "1" : "0";
		    			data.gfree = (data.gfree == true) ? "1" : "0";
		    			data.state = (data.state == true) ? "1" : "0";
		    			data.vegetarian = (data.vegetarian == true) ? "1" : "0";
		    			return data;
		    		}
		    	].concat($http.defaults.transformRequest)
	    	},
	    	create: {
	    		method: 'POST',
	    		params: {
	    			id:	''
	    		},
		    	transformRequest: [
		    		function (data, headersSetter) {
		    			data.spicy = (data.spicy == true) ? "1" : "0";
		    			data.gfree = (data.gfree == true) ? "1" : "0";
		    			data.state = (data.state == true) ? "1" : "0";
		    			data.vegetarian = (data.vegetarian == true) ? "1" : "0";
		    			var newdata = new Array();
		    			newdata[0] = data;
		    			return newdata;
		    		}
		    	].concat($http.defaults.transformRequest)
	    	}
		})
    }])
// Coupon service
    .factory('Coupon', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/coupon/:cmd/:id', {}, {
	    	get: {
				method: 'GET',
				params: {
		    		id: '@id'
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
						data.cvalue = parseFloat(data.cvalue);
						data.pts = parseInt(data.pts);
	    				data.state = (parseInt(data.state));
						data.fstate = false;
		    			return data;
		    		}
		    	])
	    	},
	    	remove: {
				method: 'DELETE',
				params: {
		    		id: '@id'
		    	}
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
							data[i].cvalue = parseFloat(data[i].cvalue);
							data[i].pts = parseInt(data[i].pts);
							data[i].fstate = false;
		    				data[i].state = (parseInt(data[i].state));
		    			}
		    			return data;
		    		}
		    	]),
				isArray: true
	    	},
	    	queryGame: {
				method: 'GET',
				params: {
					cmd: 'state',
		    		id: '1' 
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			var len = data.length;
		    			for (var i=0;i<len;i++) {
							data[i].cvalue = parseFloat(data[i].cvalue);
							data[i].pts = parseInt(data[i].pts);
							data[i].fstate = false;
		    				data[i].state = (parseInt(data[i].state));
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
		    	transformRequest: [
		    		function (data, headersSetter) {
		    			delete data.fstate;
		    			return data;
		    		}
		    	].concat($http.defaults.transformRequest)
	    	},
	    	create: {
	    		method: 'POST',
	    		params: {
	    			id:	''
	    		},
		    	transformRequest: [
		    		function (data, headersSetter) {
						delete data.fstate;
		    			var newdata = new Array();
		    			newdata[0] = data;
		    			return newdata;
		    		}
		    	].concat($http.defaults.transformRequest)
	    	}
		})
    }])
// Account service    
    .factory('Account', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/access/:id', {}, {
	    	get: {
				method: 'GET',
				params: {
		    		id: '@id'
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			return data;
		    		}
		    	])
	    	},
	    	remove: {
				method: 'DELETE',
				params: {
		    		id: '@id'
		    	}
	    	},
	    	query: {
				method: 'GET',
				params: {
		    		id: '@id' 
		    	},
/*		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			return data;
		    		}
		    	]), */
				isArray: true
	    	},
	    	save: {
	    		method: 'PUT',
	    		params: {
	    			id:	'@id'
	    		},
/*		    	transformRequest: [
		    		function (data, headersSetter) {
		    			return data;
		    		}
		    	].concat($http.defaults.transformRequest) */
	    	},
	    	create: {
	    		method: 'POST',
	    		params: {
	    			id:	''
	    		},
/*		    	transformRequest: [
		    		function (data, headersSetter) {
		    			var newdata = new Array();
		    			newdata[0] = data;
		    			return newdata;
		    		}
		    	].concat($http.defaults.transformRequest)*/
	    	}
		})
    }])
    .factory('Customer', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/customer/:cmd/:id', {}, {
	    	get: {
				method: 'GET',
				params: {
					cmd: '',
		    		id: '@id'
		    	},
/*		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			return data;
		    		}
		    	]), */
	    	},
	    	getByEmail: {
				method: 'GET',
				params: {
					cmd: 'email',
		    		id: '@email'
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			if (data[0] != null)
							data[0].pts = parseInt(data[0].pts);
		    			return data[0];
		    		}
		    	]),
	    	},
	    	remove: {
				method: 'DELETE',
				params: {
		    		id: '@id'
		    	}
	    	},
	    	save: {
	    		method: 'PUT',
	    		params: {
	    			id:	'@id'
	    		},
/*		    	transformRequest: [
		    		function (data, headersSetter) {
		    			return data;
		    		}
		    	].concat($http.defaults.transformRequest)*/
	    	},
	    	create: {
	    		method: 'POST',
	    		params: {
	    			id:	''
	    		},
/*		    	transformRequest: [
		    		function (data, headersSetter) {
		    			var newdata = new Array();
		    			newdata[0] = data;
		    			return newdata;
		    		}
		    	].concat($http.defaults.transformRequest)*/
	    	}
		})
    }])
    .factory('TableStatus', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/waiterxtable/:cmd/:id', {}, {
	    	get: {
				method: 'GET',
				params: {
					cmd: '',
		    		id: '@id'
		    	},
/*		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			return data;
		    		}
		    	]), */
	    	},
	    	getByTable: {
				method: 'GET',
				params: {
					cmd: 't_id',
		    		id: '@t_id'
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
						data[0].cw_state = ((data[0].cw_state == "1") ? true : false);
						data[0].t_state = ((data[0].t_state == "1") ? true : false); // free/occupied ?
		    			return data[0];
		    		}
		    	]),
	    	},
	    	getByWaiter: {
				method: 'GET',
				params: {
					cmd: 'w_id',
		    		id: '@w_id'
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
						data[0].cw_state = ((data[0].cw_state == "1") ? true : false);
						data[0].t_state = ((data[0].t_state == "1") ? true : false); // free/occupied ?
		    			return data[0];
		    		}
		    	]),
	    	},
	    	save: {
	    		method: 'PUT',
	    		params: {
	    			cmd: '',
	    			id:	'@id'
	    		},
		    	transformRequest: [
		    		function (data, headersSetter) {
						data.cw_state = ((data.cw_state == true) ? "1" : "0");
						data.t_state = ((data.t_state == true) ? "1" : "0"); // free/occupied ?
		    			return data;
		    		}
		    	].concat($http.defaults.transformRequest)
	    	},
		})
    }])
    .factory('Order', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/orders/:cmd/:id', {}, {
	    	get: {
				method: 'GET',
				params: {
		    		id: '@id'
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
						data.tips = parseFloat(data.tips);
						data.paid = parseFloat(data.paid);
						data.total = parseFloat(data.total);
		    			data.o_state = (data.o_state == "1") ? true : false;
		    			data.r_state = (data.r_state == "1") ? true : false;
		    			return data;
		    		}
		    	])
	    	},
	    	remove: {
				method: 'DELETE',
				params: {
		    		id: '@id'
		    	}
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
							data[i].tips = parseFloat(data[i].tips);
							data[i].paid = parseFloat(data[i].paid);
							data[i].total = parseFloat(data[i].total);
		    				data[i].o_state = (data[i].o_state == "1") ? true : false;
		    				data[i].r_state = (data[i].r_state == "1") ? true : false;
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
		    	transformRequest: [
		    		function (data, headersSetter) {
	    				data.o_state = (data.o_state == true) ? "1" : "0";
	    				data.r_state = (data.r_state == true) ? "1" : "0";
	    				delete data.start_time;
	    				if (data.end_time == null)
	    					delete data.end_time;
	    				if (data.cp_id == null)
	    					delete data.cp_id;
		    			return data;
		    		}
		    	].concat($http.defaults.transformRequest)
	    	},
	    	create: {
	    		method: 'POST',
	    		params: {
	    			id:	''
	    		},
		    	transformRequest: [
		    		function (data, headersSetter) {
	    				data.o_state = (data.o_state == true) ? "1" : "0";
	    				data.r_state = (data.r_state == true) ? "1" : "0";
		    			var newdata = new Array();
		    			newdata[0] = data;
		    			return newdata;
		    		}
		    	].concat($http.defaults.transformRequest)
	    	}
		})
    }])
    .factory('oMenuItem', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/ordereditem/:cmd/:id', {}, {
	    	get: {
				method: 'GET',
				params: {
		    		id: '@id'
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
						data.state = parseInt(data.state);
		    			return data;
		    		}
		    	])
	    	},
	    	remove: {
				method: 'DELETE',
				params: {
		    		id: '@id'
		    	}
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
							data[i].state = parseInt(data[i].state);
		    			}
		    			return data;
		    		}
		    	]),
				isArray: true
	    	},
	    	cQuery: {
				method: 'GET',
				params: {
					cmd: 'o_id',
		    		id: '@o_id' 
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			var len = data.length;
		    			for (var i=0;i<len;i++) {
							data[i].state = parseInt(data[i].state);
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
/*		    	transformRequest: [
		    		function (data, headersSetter) {
		    			return data;
		    		}
		    	].concat($http.defaults.transformRequest) */
	    	},
	    	mCreate: {
	    		method: 'POST',
	    		params: {
	    			id:	''
	    		},
		    	transformRequest: [
		    		function (data, headersSetter) {
						if (Array.isArray(data))
							return data;
		    			var newdata = new Array();
		    			newdata[0] = data;
		    			return newdata;
		    		}
		    	].concat($http.defaults.transformRequest),
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headerGetter) {
		    			var newdata = new Array();
		    			newdata[0] = data;
		    			return newdata;
		    	}]),
    			isArray: true
	    	}
		})
    }])
