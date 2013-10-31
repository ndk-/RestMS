'use strict';

/* Filters */
angular.module('myApp.filters', [])
    .filter('itemsCategory', [ function() {
	return function(items, cat) {
	    var clean = [];
	    angular.forEach(items, function (item) {
		if (item.mc_id == cat)
		    clean.push(item);
	    })
	    return clean;
	}
    }]);
