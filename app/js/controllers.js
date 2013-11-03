'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
// Login controller
    .controller('LoginCtrl', ['$scope', '$http', '$location', '$route',
		    '$window', 'Credentials', function($scope, $http, $location,
			    $route, $window, Credentials) {
		$window.document.title = 'Login';
		$scope.credentials = Credentials;
		$scope.Submit = function() {
			var credentials = {
		    	'username' : $scope.username,
		    	'password' : CryptoJS.SHA256($scope.password)
				    .toString(CryptoJS.enc.Hex)
			};
			$http.post('login.php', credentials)
		    	.success(function(data, status, header, config) {
				$scope.error = "";
				$scope.credentials.access = parseInt(data.access);
				$scope.credentials.username = $scope.username;
				switch($scope.credentials.access) {
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
				$scope.error = data.error;
    		})
    	}
    }])
// Table login controller
    .controller('TableLoginCtrl', ['$scope', '$http', '$location', '$route',
		    '$window', 'Customer', 'Credentials', function($scope, $http,
		    	$location,$route, $window, Customer, Credentials) {
		$window.document.title = 'Welcome To Our Restaurant!';
		$scope.credentials = Credentials;
// Authorization
//		if ($scope.credentials == null || $scope.credentials.access != 3)
//			$location.path('/login');
		$scope.customer = new Customer;
		$scope.credentials.customer = $scope.customer;
		$scope.Submit = function() {
			$scope.customer.$getByEmail()
				.then(function(data) {
					if (data.id == null) {
						$scope.customer.pts = 0;
						$scope.customer.create_time = new Date().toJSON();
						$scope.customer.last_time = new Date().toJSON();
						$scope.customer.$create();
					}
					else {
						$scope.customer.pts += 10;
						$scope.customer.last_time = new Date().toJSON();
						$scope.customer = data;
						$scope.customer.$save();
					}
					$location.path('/customer');
				});
		}
	}])
// Initial manager controller
    .controller('ManagerCtrl', ['$scope', '$location', '$route', '$window',
    'Credentials', function ($scope, $location, $route, $window, Credentials) {
		$scope.credentials = Credentials;
		$scope.menuitem = null;
// Authorization
//		if ($scope.credentials == null || $scope.credentials.access != 0)
//	    	$location.path('/login');
		$window.document.title = 'Manager Section';
		$scope.section = 'menu';
    }])
// manager Menu Controller
    .controller('mMenuCtrl', ['$scope', '$location', '$route', '$window',
		'$modal', '$filter', 'MenuCategory', 'MenuItem', function (
		$scope,	$location, $route, $window, $modal, $filter, 
		MenuCategory, MenuItem) {
		$scope.mc = new Object();
		$scope.mc.idx = 0;
		$scope.menucategory = MenuCategory.query(function () {
	    	$scope.$watch('mc.idx', function() {
				$scope.mc.id = parseInt($scope.menucategory[$scope.mc.idx].id);
	    	})
		});
		
		$scope.menuitem = MenuItem.query();

		$scope.editItem = function (itemId) {
			$scope.idx = $filter('getById')($scope.menuitem, itemId);
			$scope.t_item = $scope.menuitem[$scope.idx];
			$scope.modalInstance = $modal.open({
    		   	templateUrl: 'section/manager/menuedit.html',
		    	scope: $scope,
  			});
			$scope.cancel = function(){
				$scope.modalInstance.dismiss('cancel');
			}
			$scope.save = function() {
				$scope.modalInstance.close('success');
				var titem = new MenuItem($scope.t_item);
				titem.$save().then(function(){
					var tmi = MenuItem.query(function(data){
						$scope.menuitem = data;
					});
				});
			}
		};
		$scope.disableItem = function (itemId) {
			var idx = $filter('getById')($scope.menuitem, itemId);
    		$scope.menuitem[idx].state = !($scope.menuitem[idx].state);
			var t_item = new MenuItem($scope.menuitem[idx]);
			t_item.$save().then(function(){
				var tmi = MenuItem.query(function(data){
					$scope.menuitem = data;
				})
			});
		}
		$scope.addItem = function(idx) {
			$scope.t_item = new MenuItem;
			$scope.t_item.mc_id = idx;
			$scope.modalInstance = $modal.open({
  		    	templateUrl: 'section/manager/menuedit.html',
		    		scope: $scope,
  			});
			$scope.cancel = function(){
				$scope.modalInstance.dismiss('cancel');
			}
			$scope.save = function() {
				$scope.t_item.$create().then(function(){
					var tmi = MenuItem.query(function(data){
						$scope.menuitem = data;
					})
				});
				$scope.modalInstance.close('success');
			}
		}
		$scope.removeItem = function(itemId) {
			var idx = $filter('getById')($scope.menuitem, itemId);
			var t_item = new MenuItem($scope.menuitem[idx]);
			t_item.$remove().then(function(){
				var tmi = MenuItem.query(function(data){
					$scope.menuitem = data;
				})
			})
		}
	}])
// Manager Coupon controller
    .controller('mCouponCtrl', ['$scope', '$location', '$route', '$window',
		'$modal', '$filter', 'Coupon', function (
		$scope,	$location, $route, $window, $modal, $filter, Coupon) {
		$scope.coupon = Coupon.query();
		$scope.c_item = new Coupon;
		$scope.c_item.pct_fix = '1';
		$scope.saveCoupon = function(idx) {
			$scope.coupon[idx].fstate = false;
			$scope.coupon[idx].$save();
			$scope.coupon = Coupon.query();
		}
		$scope.removeCoupon = function(idx) {
			$scope.coupon[idx].$remove();
			$scope.menuitem = Coupon.query();
		}
		$scope.addCoupon = function() {
			$scope.c_item.$create();
			console.log($scope.c_item);
			$scope.menuitem = Coupon.query();
			$scope.c_item = new Coupon;
			$scope.c_item.pct_fix = '0';
		}
	}])
// Manager Account Controller
    .controller('mAccountCtrl', ['$scope', '$location', '$route', '$window',
		'$modal', '$filter', 'Account', function (
		$scope,	$location, $route, $window, $modal, $filter, Account) {
		$scope.account = Account.query();
		$scope.accountChange = function(idx) {
			$scope.username = $scope.account[idx].username;
			$scope.tpasswd = new Object();
			$scope.error = '';
			$scope.modalInstance = $modal.open({
    		   	templateUrl: 'section/manager/changepassword.html',
		    	scope: $scope,
  			});
			$scope.cancel = function(){
				$scope.modalInstance.dismiss('cancel');
			}
			$scope.save = function() {
				console.log($scope.tpasswd);
				if ($scope.tpasswd.password1 != $scope.tpasswd.password2)
					$scope.error = 'Passwords do not match';
				else {
					$scope.modalInstance.close('success');
					$scope.account[idx].password = CryptoJS.SHA256(
						$scope.tpasswd.password1)
							.toString(CryptoJS.enc.Hex);
					$scope.account[idx].$save();
					$scope.account = Account.query();
				}
			}
		}
	}])
// Manager Game Controller
    .controller('mGameCtrl', ['$scope', '$location', '$route', '$window',
		'$modal', '$filter', 'Coupon', function (
		$scope,	$location, $route, $window, $modal, $filter, Coupon) {
		$scope.coupon = Coupon.queryGame();
		$scope.c_item = new Coupon;
		$scope.c_item.pct_fix = '0';
		$scope.c_item.state = '1'; 
		$scope.a1 = true; // open first element of accordion
		$scope.saveCoupon = function(idx) {
			$scope.coupon[idx].fstate = false;
			$scope.coupon[idx].$save();
			$scope.coupon = Coupon.query();
		}
		$scope.removeCoupon = function(idx) {
			$scope.coupon[idx].$remove();
			$scope.menuitem = Coupon.query();
		}
		$scope.addCoupon = function() {
			$scope.c_item.$create();
			console.log($scope.c_item);
			$scope.menuitem = Coupon.query();
			$scope.c_item = new Coupon;
			$scope.c_item.pct_fix = '0';
		}
	}])
// Main customer controller
    .controller('CustomerCtrl', ['$scope', '$location', '$route',
		'$window', 'Credentials', function ( $scope, $location,
		$route,	$window, Credentials) {
		$scope.credentials = Credentials;
		$scope.customer = $scope.credentials.customer;
//		$scope.name = $rootScope.customer.name;
//	if ($rootScope.access == null)
//	    $location.path('/login');
		$scope.section = 'menu';
		$window.document.title = 'Our Restaurant';
    }])
// Customer Menu controller
    .controller('cMenuCtrl', ['$scope', '$location', '$route',
		'$window', '$modal', '$filter', 'MenuCategory','MenuItem', 
		function ($scope, $location, $route, $window, $modal,
			$filter, MenuCategory, MenuItem) {
		$window.document.title = 'Our Menu';
		console.log($scope.customer);
		$scope.mc = new Object();
		$scope.mc.idx = 0;
		$scope.menucategory = MenuCategory.query(function () {
	    	$scope.$watch('mc.idx', function() {
				$scope.mc.id = parseInt($scope.menucategory[$scope.mc.idx].id);
				$scope.mc.heartyidx = parseInt($scope.menucategory[$scope.mc.idx].heartyidx)
	    	})
		});
		$scope.menuitem = MenuItem.cQuery();

		$scope.customizeItem = function(idx) {
			$scope.t_item = $filter('getById')($scope.menuitem, idx);
			$scope.modalInstance = $modal.open({
    		   	templateUrl: 'section/customer/customize.html',
		    	scope: $scope
  			})
			$scope.cancel = function(){
				$scope.modalInstance.dismiss('cancel');
			}
		}
		
    }])
