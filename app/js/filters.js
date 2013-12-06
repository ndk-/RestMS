'use strict';

/* Filters */
angular.module('myApp.filters', [])

// -----------------------------------------------------------------
// get data by id
// -----------------------------------------------------------------
	.filter('getById',[ function() {
		return function(input, id) {
			if (input == null || id == null)
				return null;
			var len = input.length;
			for(var i=0;i<len;i++) {
				if(+input[i].id == +id) {
					return i;
				}
			}
			return null;
		}
	}])

// -----------------------------------------------------------------
// get data by order id
// -----------------------------------------------------------------
	.filter('getByOrder',[ function() {
		return function(input, id) {
			if (input == null || id == null)
				return null;
			var len = input.length;
			var arr = new Array();
			for(var i=0;i<len;i++) {
				if(+input[i].o_id == +id) {
					arr.push(input[i]);
				}
			}
			return arr;
		}
	}])

// -----------------------------------------------------------------
// get data by waiter id
// -----------------------------------------------------------------
	.filter('getByWaiter',[ function() {
		return function(input, id) {
			if (input == null || id == null)
				return null;
			var len = input.length;
			var myObj = new Object();
			myObj.orders = new Array();
			myObj.ordereditems = new Array();
			for(var i=0;i<len;i++) {
				if(+input[i].w_id == +id) {
					myObj.orders.push(input[i]);
					myObj.ordereditems = myObj.ordereditems.concat(input[i].items);
				}
			}
			return myObj;
		}
	}]);