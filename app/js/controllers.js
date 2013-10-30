'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('LoginCtrl', ['$scope', '$http', '$location', '$route',
		    '$window', function($scope, $http, $location,
			    $route, $window) {
	    $window.document.title = 'Login';
	    $scope.Submit = function() {
		var credentials = {
		    'username' : $scope.username,
		    'password' : CryptoJS.SHA256($scope.password)
				    .toString(CryptoJS.enc.Hex)
		};
		$http.post('login.php', credentials)
		    .success(function(data, status, header, config) {
			$scope.error = "";
			$scope.access = data.access;
			switch($scope.access) {
			    case '0':
				$location.path('/manager');
				break;
			    case '1':
				$location.path('/kitchen');
				break;
			    case '2':
				$location.path('/waiter');
				break;
			    case '3':
				$location.path('/table');
				break;
			    default:
				$location.path('/login');
		    }})
		    .error(function(data, status, header, config) {
			$scope.error = data.error;
    })}}])
    .controller('ManagerCtrl', ['$scope', '$http', '$location', '$route',
		    '$window', function($scope, $http, $location, $route, 
			    $window) {
	$window.document.title = 'Manager Section';
	$http.get('db.php/menucategory')
	    .success(function(data, status, header, config) {
		console.log(data);
		$scope.menucategory = data;
	    })
	    .error(function(data, status, header, config) {
		console.log(data);
		$scope.error = data;
	    });
	$http.get('db.php/menuitem')
	    .success(function(data, status, header, config) {
		console.log(data);
		$scope.menuitem = data;
	    })
	    .error(function(data, status, header, config) {
		console.log(data);
		$scope.error = data;
	    });
}]);
