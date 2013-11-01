'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('LoginCtrl', ['$scope', '$http', '$location', '$route',
		    '$window', '$rootScope', function($scope, $http, $location,
			    $route, $window, $rootScope) {
	    $window.document.title = 'Login';
	    $scope.Submit = function() {
		var credentials = {
		    'username' : $scope.username,
		    'password' : CryptoJS.SHA256($scope.password)
				    .toString(CryptoJS.enc.Hex)
		};
		$http.post('login.php', credentials, $rootScope)
		    .success(function(data, status, header, config) {
			$scope.error = "";
			$rootScope.access = parseInt(data.access);
			switch($rootScope.access) {
			    case 0:
				$location.path('/manager');
				break;
			    case 1:
				$location.path('/kitchen');
				break;
			    case 2:
				$location.path('/waiter');
				break;
			    case 3:
				$location.path('/table');
				break;
			    default:
				$location.path('/login');
		    }})
		    .error(function(data, status, header, config) {
			console.log(data);
    })}}])
    .controller('ManagerCtrl', ['$rootScope', '$scope', '$location', '$route',
		'$window', function ($rootScope, $scope, $location, $route,
		$window) {
//	if ($rootScope.access == null)
//	    $location.path('/login');
	$rootScope.section = 'menu';
	$window.document.title = 'Manager Section';
    }])
    .controller('mMenuCtrl', ['$scope', '$location', '$route', '$window',
		'$modal', 'MenuCategory', 'MenuItem', function ($scope, $location,
		$route, $window, $modal, MenuCategory, MenuItem) {
	$scope.mc = new Object();
	$scope.mc.idx = 0;
	$scope.menucategory = MenuCategory.query(function () {
	    $scope.$watch('mc.idx', function() {
		$scope.mc.id = parseInt($scope.menucategory[$scope.mc.idx].id);
	    });
	});
	$scope.menuitem = MenuItem.query();

	var modalInstanceCtrl = function () {
	};

	$scope.edit = function (idx) {
	    if ($scope.menuitem[idx] != null) {
//		modal = 'menuedit';
		var modalInstance = $modal.open({
    		    templateUrl: 'section/manager/menuedit.html',
		    controller: modalInstanceCtrl,
		    resolve: {
			items: function () {
        		    return $scope.items;
    			}
    		    }
		});
	    }
	}
    }]);