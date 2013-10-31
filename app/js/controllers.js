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
		'MenuCategory', 'MenuItem', function ($scope, $location,
		$route, $window, MenuCategory, MenuItem) {
	$scope.mc = new Object();
	$scope.menucategory = MenuCategory.query(function () {
	    $scope.mc.id = $scope.menucategory[0].id;
	});
	$scope.mc.idx = 0;
	$scope.menuitem = MenuItem.query();
//	console.log(mc_idx);
/*	while ($scope.menucategory == null) {
	    console.log($scope.menucategory);
	    console.log($scope.mc_id);
	} 
	if ($routeParams.idx != null)
	    $scope.mc_idx = parseInt($routeParams.idx);
	$http.get('db.php/menuitem/mc_id/'+$scope.menucategory[$scope.mc_idx].id)
	    .success(function(data, status, header, config) {
		$scope.menuitem = data;
	    })
	    .error(function(data, status, header, config) {
	        console.log(data);
	        $scope.error = data;
	    })*/
}]);
