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
//				$scope.credentials.username = $scope.username;
				$scope.credentials.id = data.id;
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
		    '$window', 'Customer', 'Credentials', 'TableStatus', function(
		    	$scope, $http, $location,$route, $window, Customer, 
		    	Credentials, TableStatus) {
		$window.document.title = 'Welcome To Our Restaurant!';
		$scope.credentials = Credentials;
// Authorization
//		if ($scope.credentials == null || $scope.credentials.access != 3)
//			$location.path('/login');
		$scope.credentials.table = TableStatus.getByTable({id: $scope.credentials.id});
		$scope.credentials.customer = new Customer();
		$scope.customer = $scope.credentials.customer; 
		$scope.Submit = function() {
			$scope.customer.$getByEmail()
				.then(function(data) {
					if (data.id == null) {
						$scope.customer.pts = 0;
						$scope.customer.create_time = new Date().toJSON();
						$scope.customer.last_time = new Date().toJSON();
						var t_item = new Customer($scope.customer);
						t_item.$create();
					}
					else {
						$scope.customer = data;
						if ($scope.customer.id > 1)
							$scope.customer.pts += 10;
						$scope.customer.last_time = new Date().toJSON();
						var t_item = new Customer($scope.customer);
						t_item.$save();
					}
					$location.path('/customer');
				});
		}
		$scope.callWaiter = function() {
			$scope.credentials.table.cw_state = !$scope.credentials.table.cw_state;
			var t_item = new TableStatus($scope.credentials.table);
			t_item.$save().then(function(){
				t_item = TableStatus.getByTable({id: $scope.credentials.id}, function(data){
					$scope.credentials.table = data;
				})
			})
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
		$scope.saveCoupon = function(couponId) {
			var idx = $filter('getById')($scope.coupon, couponId);
			$scope.coupon[idx].fstate = false;
			var t_coupon = new Coupon($scope.coupon[idx]);
			t_coupon.$save().then(function(){
				var tc = Coupon.query(function(data){
					$scope.coupon = data;					
				})
			})
		}
		$scope.removeCoupon = function(couponId) {
			var idx = $filter('getById')($scope.coupon, couponId);
			var t_coupon = new Coupon($scope.coupon[idx]);
			t_coupon.$remove().then(function(){
				var tc = Coupon.query(function(data){
					$scope.coupon = data;					
				})
			})
		}
		$scope.addCoupon = function() {
			$scope.c_item.$create().then(function(){
				var tc = Coupon.query(function(data){
					$scope.coupon = data;					
				})
				$scope.c_item = new Coupon;
				$scope.c_item.pct_fix = '1';
			})
		}
		$scope.reloadCoupon = function(){
			var tc = Coupon.query(function(data){
				$scope.coupon = data;					
			})
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
				if ($scope.tpasswd.password1 != $scope.tpasswd.password2)
					$scope.error = 'Passwords do not match';
				else {
					$scope.modalInstance.close('success');
					$scope.account[idx].password = CryptoJS.SHA256(
						$scope.tpasswd.password1)
							.toString(CryptoJS.enc.Hex);
					$scope.account[idx].$save().then(function(){
						$scope.account = Account.query();
					})
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
		$scope.saveCoupon = function(couponId) {
			var idx = $filter('getById')($scope.coupon, couponId);
			$scope.coupon[idx].fstate = false;
			var t_coupon = new Coupon($scope.coupon[idx]);
			t_coupon.$save().then(function(){
				var tc = Coupon.query(function(data){
					$scope.coupon = data;					
				})
			})
		}
		$scope.removeCoupon = function(couponId) {
			var idx = $filter('getById')($scope.coupon, couponId);
			var t_coupon = new Coupon($scope.coupon[idx]);
			t_coupon.$remove().then(function(){
				var tc = Coupon.query(function(data){
					$scope.coupon = data;					
				})
			})
		}
		$scope.addCoupon = function() {
			$scope.c_item.$create().then(function(){
				var tc = Coupon.query(function(data){
					$scope.coupon = data;					
				})
				$scope.c_item = new Coupon;
				$scope.c_item.pct_fix = '1';
			})
		}
		$scope.reloadCoupon = function(){
			var tc = Coupon.query(function(data){
				$scope.coupon = data;					
			})
		}
	}])
// Main customer controller
    .controller('CustomerCtrl', ['$scope', '$location', '$route',
		'$window', 'Credentials', 'TableStatus', 'Cart', 
		function( $scope, $location, $route, $window, 
			Credentials, TableStatus, Cart) {
		
		$scope.credentials = Credentials;
// Authorization
//		if ($scope.credentials == null || $scope.credentials.access != 0)
//	    	$location.path('/login');
		$scope.customer = $scope.credentials.customer;
		$scope.credentials.table = TableStatus.getByTable({id: $scope.credentials.id});
		$scope.credentials.cart = Cart;
		$scope.credentials.cart.items = new Array();
		$scope.credentials.cart.showCart = false;
		$scope.credentials.order = null;
		$scope.section = 'menu';
		$window.document.title = 'Our Restaurant';
		$scope.callWaiter = function() {
			$scope.credentials.table.cw_state = !$scope.credentials.table.cw_state;
			var t_item = new TableStatus($scope.credentials.table);
			t_item.$save().then(function(){
				t_item = TableStatus.getByTable({id: $scope.credentials.id}, function(data){
					$scope.credentials.table = data;
				})
			})
		}
// Update the required information every minute
		var tmp = setInterval(function(){
			var t_item = TableStatus.getByTable({id: $scope.credentials.id}, function(data){
				$scope.credentials.table = data;
			})
// If table status changes to 1 - clear the table
			if ($scope.credentials.table.t_state == true) {
				$scope.credentials.table.t_state = !$scope.credentials.table.t_state;
				$scope.credentials.table.$save().then(function(){
					$scope.$destroy();
					clearInterval(tmp);
					$location.path('/table');
				})
			}
		},60000);
    }])
// Customer Menu controller
    .controller('cMenuCtrl', ['$scope', '$location', '$route',
		'$window', '$modal', '$filter', 'MenuCategory','MenuItem',
		function ($scope, $location, $route, $window, $modal, 
			$filter, MenuCategory, MenuItem) {
		$window.document.title = 'Our Menu';
		$scope.mc = new Object();
		$scope.mc.idx = 0;
		$scope.menucategory = MenuCategory.query(function () {
	    	$scope.$watch('mc.idx', function() {
				$scope.mc.id = parseInt($scope.menucategory[$scope.mc.idx].id);
				$scope.mc.heartyidx = parseInt($scope.menucategory[$scope.mc.idx].heartyidx)
	    	})
		});
		$scope.menuitem = MenuItem.cQuery();
		$scope.addItem = function(itemId){
			$scope.credentials.cart.showCart = true;
			var idx = $filter('getById')($scope.menuitem, itemId);
			var t_item = new MenuItem($scope.menuitem[idx]);
			delete $scope.menuitem[idx].custom;
			$scope.credentials.cart.items.push(t_item);
			if ($scope.modalInstance != null) {
				console.log($scope.modalInstance);
				$scope.modalInstance.close('success');
				delete $scope.modalInstance;
			}
		}
		$scope.customizeItem = function(itemId) {
			var idx = $filter('getById')($scope.menuitem, itemId);
			$scope.t_item = $scope.menuitem[idx];
			$scope.modalInstance = $modal.open({
    		   	templateUrl: 'section/customer/customize.html',
		    	scope: $scope
  			})
			$scope.cancel = function(){
				$scope.modalInstance.dismiss('cancel');
				delete $scope.modalInstance;
			}
		}
    }])
    .controller('cCartCtrl', ['$scope', '$location', '$route',
		'$window', '$modal', '$filter', 'Order', 'oMenuItem', 
		function ($scope, $location, $route, $window, $modal, 
			$filter, Order, oMenuItem) {
		if ($scope.credentials.order == null)
			$scope.credentials.order = new Order();
		$scope.cartTotal = function() {
			var len = $scope.credentials.cart.items.length;
			var sum = 0;
			for (var i=0;i<len;i++)
				sum += parseFloat($scope.credentials.cart.items[i].price);
			return sum.toFixed(2);
		}
		$scope.placeOrder = function() {
			if ($scope.credentials.order.id == null) {
				$scope.credentials.order.c_id = $scope.credentials.customer.id;
				$scope.credentials.order.t_id = $scope.credentials.table.t_id;
				$scope.credentials.order.w_id = $scope.credentials.table.w_id;
				$scope.credentials.order.start_time = new Date().toJSON();
				$scope.credentials.order.tips = 0;
				$scope.credentials.order.paid = 0;
				$scope.credentials.order.total = 0;
				$scope.credentials.order.o_state = false;
				$scope.credentials.order.r_state = false;
				var t_item = new Order($scope.credentials.order);
				t_item.$create().then(function(data){
					$scope.credentials.order.id = data.success.id;
					$scope.credentials.order.$get().then(function(data){
						$scope.credentials.order = data;
					})
				})
			}
			var len = $scope.credentials.cart.items.length;
			$scope.credentials.order.items = new Array();
			for (var i=0;i<len;i++) {
				$scope.credentials.order.items[i] = new oMenuItem();
				$scope.credentials.order.items[i].o_id = $scope.credentials.order.id;
				$scope.credentials.order.items[i].mi_id = $scope.credentials.cart.items[i].id;
				$scope.credentials.order.items[i].state = 0;
				if ($scope.credentials.cart.items[i].custom != null)
					$scope.credentials.order.items[i].custom = $scope.credentials.cart.items[i].custom;
			}
			console.log($scope.credentials.order.items);
			oMenuItem.create($scope.credentials.order.items); //.create()//.then(function(data){
//				console.log(data);
//			})
		}
    }])
