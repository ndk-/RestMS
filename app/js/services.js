'use strict';

/* Services */


angular.module('myApp.services', ['ngResource'])

//------------------------------------------------------------------------------------------
// Global Storage    
//------------------------------------------------------------------------------------------
    .factory('SessionStorage', [ function () {
    	var session = new Object();

// destroy data in the storage
    	session.destroy = function() {
    		for (var i in session)
    			if (i != 'destroy' && i != 'clearAll')
    				delete session[i];
    	}

// clear all setIntervals
    	session.clearAll = function() {
			for (var i = 1; i < 99999; i++)
        		window.clearInterval(i);
    	}

    	return session;
    }])

//------------------------------------------------------------------------------------------
// Menu category service
//------------------------------------------------------------------------------------------
    .factory('MenuCategory', [ '$resource', function ($resource) {
		return $resource('db.php/menucategory/:id', {}, {
	    	query: {
				method: 'GET',
				params: { id: '' },
				isArray: true
	    	}
		})
    }])

//------------------------------------------------------------------------------------------
// Menu items service    
//------------------------------------------------------------------------------------------
    .factory('MenuItem', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/menuitem/:cmd/:id', {}, {
	    	get: {
				method: 'GET',
				params: {
		    		id: '@id'
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			data.spicy = Boolean(Number(data.spicy));
		    			data.gfree = Boolean(Number(data.gfree));
		    			data.vegetarian = Boolean(Number(data.vegetarian));
		    			data.state = Boolean(Number(data.state));
		    			data.fav = Boolean(Number(data.fav));
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
		    		id: '' 
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			var len = data.length;
		    			for (var i=0;i<len;i++) {
		    				data[i].spicy = Boolean(Number(data[i].spicy));
		    				data[i].gfree = Boolean(Number(data[i].gfree));
		    				data[i].vegetarian = Boolean(Number(data[i].vegetarian));
		    				data[i].state = Boolean(Number(data[i].state));
		    				data[i].fav = Boolean(Number(data[i].fav));
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
		    				data[i].spicy = Boolean(Number(data[i].spicy));
		    				data[i].gfree = Boolean(Number(data[i].gfree));
		    				data[i].vegetarian = Boolean(Number(data[i].vegetarian));
		    				data[i].state = Boolean(Number(data[i].state));
		    				data[i].fav = Boolean(Number(data[i].fav));
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
		    			if (data.spicy != null)
		    				data.spicy = Number(data.spicy);
		    			if (data.vegetarian != null)
			    			data.vegetarian = Number(data.vegetarian);
		    			if (data.gfree != null)
			    			data.gfree = Number(data.gfree);
		    			if (data.state != null)
			    			data.state = Number(data.state);
		    			if (data.fav != null)
			    			data.fav = Number(data.fav);
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
						data.spicy = Number(data.spicy);
						data.vegetarian = Number(data.vegetarian);
						data.gfree = Number(data.gfree);
						data.state = Number(data.state);
						data.fav = Number(data.fav);
		    			var newdata = new Array();
		    			newdata[0] = data;
		    			return newdata;
		    		}
		    	].concat($http.defaults.transformRequest)
	    	}
		})
    }])

//------------------------------------------------------------------------------------------
// Coupon service
//------------------------------------------------------------------------------------------
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
						data.pts = Number(data.pts);
	    				data.state = Number(data.state);
						data.fstate = false;
		    			return data;
		    		}
		    	])
	    	},
	    	getByName: {
				method: 'GET',
				params: {
					cmd: 'name',
		    		id: '@id'
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			if (data[0] != null && data[0].id != null) {
			    			data = data[0];
							data.cvalue = parseFloat(data.cvalue);
							data.pts = Number(data.pts);
	    					data.state = Number(data.state);
							data.fstate = false;
						}
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
		    		id: '' 
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
		    			var len = data.length;
		    			for (var i=0;i<len;i++) {
							data[i].cvalue = parseFloat(data[i].cvalue);
							data[i].pts = Number(data[i].pts);
							data[i].fstate = false;
		    				data[i].state = Number(data[i].state);
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
							data[i].pts = Number(data[i].pts);
							data[i].fstate = false;
		    				data[i].state = Number(data[i].state);
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

//------------------------------------------------------------------------------------------
// Account service    
//------------------------------------------------------------------------------------------
    .factory('Account', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/access/:cmd/:id', {}, {
	    	get: {
				method: 'GET',
				params: {
					cmd: '',
		    		id: '@id'
		    	},
	    	},
	    	query: {
				method: 'GET',
				params: {
					cmd: '',
		    		id: '' 
		    	},
				isArray: true
	    	},
	    	wQuery: {
				method: 'GET',
				params: {
					cmd: 'a_lvl',
		    		id: '2' 
		    	},
				isArray: true
	    	},
	    	save: {
	    		method: 'PUT',
	    		params: {
	    			cmd: '',
	    			id:	'@id'
	    		},
	    	},
		})
    }])

//------------------------------------------------------------------------------------------
// Customer
//------------------------------------------------------------------------------------------
    .factory('Customer', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/customer/:cmd/:id', {}, {
	    	get: {
				method: 'GET',
				params: {
					cmd: '',
		    		id: '@id'
		    	},
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
							data[0].pts = Number(data[0].pts);
		    			return data[0];
		    		}
		    	]),
	    	},
	    	query: {
				method: 'GET',
				params: {
					cmd: '',
		    		id: '' 
		    	},
				isArray: true
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

//------------------------------------------------------------------------------------------
// Table
//------------------------------------------------------------------------------------------
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
						data[0].cw_state = Boolean(Number(data[0].cw_state));
						data[0].t_state = Number(data[0].t_state); // free/occupied/must be cleaned
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
						data[0].cw_state = Boolean(Number(data[0].cw_state));
						data[0].t_state = Number(data[0].t_state); // free/occupied/must be cleaned
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
		    			if (data.cw_state != null)
							data.cw_state = Number(data.cw_state);
						if (data.t_state != null)
							data.t_state = Number(data.t_state); // free/occupied/must be cleaned
		    			return data;
		    		}
		    	].concat($http.defaults.transformRequest)
	    	},
		})
    }])

//------------------------------------------------------------------------------------------
// Order
//------------------------------------------------------------------------------------------
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
		    			data.o_state = Boolean(Number(data.o_state));
		    			data.r_state = Boolean(Number(data.r_state));
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
		    				data[i].o_state = Boolean(Number(data[i].o_state));
		    				data[i].r_state = Boolean(Number(data[i].r_state));
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
		    			console.log("services.order.save: ", data);
	    				delete data.start_time;
		    			if (data.o_state != null)
	    					data.o_state = Number(data.o_state);
	    				if (data.r_state != null)
	    					data.r_state = Number(data.r_state);
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
	    				data.o_state = Number(data.o_state);
	    				data.r_state = Number(data.r_state);
		    			var newdata = new Array();
		    			newdata[0] = data;
		    			return newdata;
		    		}
		    	].concat($http.defaults.transformRequest)
	    	}
		})
    }])

//------------------------------------------------------------------------------------------
// Ordered Menu Item
//------------------------------------------------------------------------------------------
    .factory('oMenuItem', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/ordereditem/:cmd/:id', {}, {
	    	get: {
				method: 'GET',
				params: {
		    		id: '@id'
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headersGetter) {
						data.state = Number(data.state);
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
							data[i].state = Number(data[i].state);
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
							data[i].state = Number(data[i].state);
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
	    	mSave: {
	    		method: 'PUT',
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
//------------------------------------------------------------------------------------------
// Kitchen view (sql view)
//------------------------------------------------------------------------------------------
    .factory('KitchenView', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/k_view/', {}, {
	    	query: {
				method: 'GET',
				isArray: true,
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headerGetter) {
						if (Array.isArray(data))
							return data;
						var ndata = new Array();
						ndata[0] = data;
		    			return ndata;
		    	}]),
	    	}
		})
    }])

//------------------------------------------------------------------------------------------
// Waiter tables and active orders view (sql view)
//------------------------------------------------------------------------------------------
    .factory('WaiterTableView', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/wt_view/w_id/:id', {}, {
	    	query: {
				method: 'GET',
	    		params: {
	    			id:	'@id'
	    		},
				isArray: true,
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headerGetter) {
						if (Array.isArray(data))
							return data;
						var ndata = new Array();
						ndata[0] = data;
		    			return ndata;
		    	}]),
	    	}
		})
    }])

//------------------------------------------------------------------------------------------
// Waiter ordered menu items of active orders view (sql view)
//------------------------------------------------------------------------------------------
    .factory('WaiterOMIView', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/oimi/:cmd/:id', {}, {
	    	query: {
				method: 'GET',
	    		params: {
	    			id:	'@id'
	    		},
				isArray: true,
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headerGetter) {
						if (Array.isArray(data))
							return data;
						var ndata = new Array();
						ndata[0] = data;
		    			return ndata;
		    	}]),
	    	},
	    	cQuery: {
				method: 'GET',
	    		params: {
	    			cmd: 'o_id',
	    			id:	'@id'
	    		},
				isArray: true,
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headerGetter) {
						if (Array.isArray(data))
							return data;
						var ndata = new Array();
						ndata[0] = data;
		    			return ndata;
		    	}]),
	    	}
		})
    }])

//------------------------------------------------------------------------------------------
// Manager orders x waiter x table view (sql view)
//------------------------------------------------------------------------------------------
    .factory('ManagerOxWxT', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/oxwt/:cmd/:id', {}, {
	    	query: {
				method: 'GET',
	    		params: {
	    			cmd: '',
	    			id:	'@id'
	    		},
				isArray: true,
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headerGetter) {
						if (Array.isArray(data))
							return data;
						var ndata = new Array();
						ndata[0] = data;
		    			return ndata;
		    	}]),
	    	}
		})
    }])

//------------------------------------------------------------------------------------------
// Chat
//------------------------------------------------------------------------------------------
    .factory('Chat', [ '$http', '$resource', function ($http, $resource) {
		return $resource('db.php/chat/:cmd/:id', {}, {
	    	query: {
				method: 'GET',
				params: {
					cmd: '',
		    		id: '' 
		    	},
		    	transformResponse: $http.defaults.transformResponse.concat([
		    		function (data, headerGetter) {
						if (Array.isArray(data))
							return data;
		    			return [data];
		    	}]),
				isArray: true
	    	},
	    	create: {
	    		method: 'POST',
	    		params: {
	    			id:	''
	    		},
	    	},
	    	remove: {
				method: 'DELETE',
				params: {
		    		id: '@id'
		    	}
	    	}
		})
    }])
