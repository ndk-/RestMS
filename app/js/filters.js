'use strict';

/* Filters */
angular.module('myApp.filters', [])
    .filter('itemsCategory', [ function() {
	return function(items, cat) {
//	    var clean = [];
//	    angular.forEach(items, function (item) {
//		if (item.mc_id == cat)
//		    clean.push(item);
//	    })
	    return items;
	}}])
	.filter('getById',[ function() {
		return function(input, id) {
			var len = input.length;
			for(var i=0;i<len;i++) {
				if(+input[i].id == +id) {
					return input[i];
				}
			}
			return null;
		}
	}]);
