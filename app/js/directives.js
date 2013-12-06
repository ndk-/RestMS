'use strict';

/* Directives */
angular.module('myApp.directives', [])

// -----------------------------------------------------------------
// Check for expiry month
// -----------------------------------------------------------------
.directive('expmonth', [function() {
	return {
		restrict : 'A',
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			var checkMonth = function(val) {
				var current_date = new Date();
				if (val < current_date.getMonth() &&
						scope.cc.year == current_date.getFullYear()) {
					ctrl.$setValidity('expmonth', false);
					return undefined;
				} else {
					ctrl.$setValidity('expmonth', true);
					return val;
				}
			}
			ctrl.$parsers.unshift(function(value) {
				return checkMonth(value);
			})
			ctrl.$formatters.unshift(function(value) {
				checkMonth(value);
				return value;
			})
		}
	}}])