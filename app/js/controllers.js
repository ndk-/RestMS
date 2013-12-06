'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

// -----------------------------------------------------------------------------------------------------------------------------
// Login controller
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('LoginCtrl', ['$scope', '$http', '$location', '$route',
		    '$window', 'SessionStorage', function($scope, $http, $location,
			    $route, $window, SessionStorage) {

		$window.document.title = 'Login';
		$scope.mysession = SessionStorage; // Our global variable 
		$scope.mysession.destroy(); // Clean up 
		$scope.mysession.TAX = 8.25 // Tax
		$scope.mysession.TIPS = 25 // Tips

		$scope.mysession.clearAll(); // clear all intervals

// Login function
		$scope.loginSubmit = function() {
			if (!$scope.loginForm.$valid) {
				if (!$scope.mysession.username)
					$scope.error = "Please enter username";
				else
					$scope.error = "Please enter password";
				return null;
			}

// Send info
			$http.post('login.php', $scope.mysession)
		    	.success(function(data, status, header, config) {
					console.log('Login.success:', data);
					$scope.error = "";
					$scope.mysession.access = parseInt(data.access);
					$scope.mysession.id = data.id;

// Change location according to access level
					switch($scope.mysession.access) {
				    	case 0: // Manager Access level
							$location.path('/manager');
							break;
					    case 1: // Kitchen Access level
							$location.path('/kitchen');
							break;
				    	case 2: // Waiter Access level
							$location.path('/waiter');
							break;
					    case 3: // Table Access level
							$location.path('/table');
							break;
				    	default: // Something wrong, go back to login
							$location.path('/login');
				}})

// Display error message
		    	.error(function(data, status, header, config) {
					console.log('Login.error:', data);
					$scope.error = data.error;
    			})
    	}
    }])


/*	.controller('ConfirmCtrl', ['$scope', 'SessionStorage',
		function($scope, SessionStorage) {

		$scope.mysession = SessionStorage; // Get our global variable;

		$scope.popConfirm = function(state) {
			$scope.$parent.isOpen = new Boolean(!$scope.$parent.isOpen);
			console.log('confirm: ', $scope.mysession.confirmation);
			console.log('$parent: ', $scope.$parent.isOpen);
			$scope.$parent.isOpen =  !$scope.$parent.isOpen;
			$scope.$parent.isOpen = new Boolean(!$scope.$parent.isOpen);
			$scope.mysession.confirmation = !$scope.mysession.confirmation;
			
		}
			
	}]) */

// -----------------------------------------------------------------------------------------------------------------------------
// Table login controller
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('TableLoginCtrl', ['$scope','$location', '$route',
    	'$window', 'Customer', 'SessionStorage', 'TableStatus', 
    	function( $scope, $location, $route, $window, Customer, 
		    	SessionStorage, TableStatus) {
		
		$scope.mysession = SessionStorage; // Get our global variable;

// Authorization
		if ($scope.mysession == null || $scope.mysession.access != 3)
			$location.path('/login');

		$scope.mysession.clearAll(); // Clear all intervals

		$window.document.title = 'Welcome To Our Restaurant!';

// Initialize new customer
		$scope.mysession.customer = new Customer();
		$scope.customer = $scope.mysession.customer; 

// Get Table status
		$scope.mysession.table = TableStatus.getByTable({id: $scope.mysession.id}, function(data){
			console.log('cLogin.table:', data);
		});

// Submit function
		$scope.Submit = function() {
			
			if (!$scope.customerForm.$valid)
				return null;	

// Check if customer exists
			$scope.customer.$getByEmail().then(function(data) {
				console.log('cLogin.customerbyemail:', data);

// Mark table as occupied
				var t_item = new TableStatus();
				t_item.id = $scope.mysession.table.id;
				t_item.t_state = 1;
				
				t_item.$save(function(data){
					console.log('cLogin.customer.getbyemail.occupytable.save:', data);
				})

// If not, create one
				if (data.id == null) {
					$scope.customer.pts = 0;
					$scope.customer.create_time = new Date().toJSON();
					$scope.customer.last_time = new Date().toJSON();
					var t_item = new Customer($scope.customer);
					t_item.$create(function(data){
						console.log('cLogin.customer.create:', data);
					});
				}

// Otherwise, get info, add points and change last login time
				else {
					$scope.customer = data;
					if ($scope.customer.id > 1)
						$scope.customer.pts += 10;
					$scope.customer.last_time = new Date().toJSON();
					var t_item = new Customer($scope.customer);
					t_item.$save(function(data){
						console.log('cLogin.customer.save:', data);
					});
				}
				$location.path('/customer');
			})
		}

// Call waiter function
		$scope.callWaiter = function() {

			$scope.mysession.table.cw_state = !$scope.mysession.table.cw_state; // change cw trigger
			var t_item = new TableStatus();

			t_item.id = $scope.mysession.table.id;
			t_item.cw_state = $scope.mysession.table.cw_state;

// Save call waiter trigger to database
			t_item.$save().then(function(data){
				console.log('cLogin.callwaiter.save:', data);
				t_item = TableStatus.getByTable({id: $scope.mysession.id}, function(data){
					console.log('cLogin.callwaiter.getbytable:', data);
					$scope.mysession.table = data;
				})
			})
		}
	}])

// -----------------------------------------------------------------------------------------------------------------------------
// Manager Main controller
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('ManagerCtrl', ['$scope', '$location', '$route', '$window',
    'SessionStorage', function ($scope, $location, $route, $window, SessionStorage) {

		$scope.mysession = SessionStorage; // our global storage

// Authorization
		if ($scope.mysession == null || $scope.mysession.access != 0)
	    	$location.path('/login');

		$window.document.title = 'Manager Section';

		$scope.mysession.alerts = [];
		$scope.menuitem = null; 

		$scope.alertClose = function(idx) {
			$scope.mysession.alerts.splice(idx, 1);
		}

		$scope.section = 'menu';

    }])

// -----------------------------------------------------------------------------------------------------------------------------
// Manager Menu Controller
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('mMenuCtrl', ['$scope', '$location', '$route', '$window',
		'$modal', '$filter', '$upload', 'MenuCategory', 'MenuItem',
		function ( $scope, $location, $route, $window, $modal, $filter, 
			$upload, MenuCategory, MenuItem) {
		$scope.mc = new Object();
		$scope.t_item = new Object();
		$scope.up = new Object();
		$scope.mc.idx = 0;
		$scope.mysession.confirmation = false;

// Get menu category
		$scope.menucategory = MenuCategory.query(function(){
			$scope.mc.id = parseInt($scope.menucategory[$scope.mc.idx].id);
	    	$scope.$watch('mc.idx', function() {
				$scope.mc.id = parseInt($scope.menucategory[$scope.mc.idx].id);
				console.log('caught watch: ', $scope.mc.id);
    		});
		});
		
		$scope.menuitem = MenuItem.query();


// Upload File
        $scope.selectFile = function(files, id) {
        	var _file = files[0];
        	$scope.upload = $upload.upload({
        		url: './upload.php',
        		method: 'POST',
				data: { myfile: $scope.mc.id+'-'+id},
				file: _file,
				fileFormDataName: 'file',
        	})
        	.success(function(data) {
        		console.log("manager.menu.upload.success: ", data);
        		$scope.up.message = "upload was successfull";
        		$scope.up.label = "info";  
				var t_item = new MenuItem();
				t_item.id = $scope.t_item.id;
				t_item.picture = data.name;
				t_item.$save(function(data){
					console.log("manager.menu.upload.success.picture.t_item.save: ", data);
					MenuItem.query(function(data) {
						$scope.menuitem = data;
					})
				})
        	})
        	.error(function(data) {
        		console.log(data);
        		$scope.up.message = "upload failed";
        		$scope.up.label = "danger";  
        	});
        	console.log($scope.upload);
        	
        };

// Modal cancel
		$scope.cancel = function(){
			$scope.modalInstance.dismiss('cancel');
		}

// Disable menu item from the customers menu
		$scope.disableItem = function (itemId) {

			var idx = $filter('getById')($scope.menuitem, itemId);
    		$scope.menuitem[idx].state = !($scope.menuitem[idx].state);
			var t_item = new MenuItem($scope.menuitem[idx]);

			t_item.$save().then(function(){
				MenuItem.query(function(data){
					$scope.menuitem = data;
				})
			});
		}

// Mark menu item as favorite (Our Picks)
		$scope.makeFavorite = function (itemId) {
			var idx = $filter('getById')($scope.menuitem, itemId);
    		$scope.menuitem[idx].fav = !($scope.menuitem[idx].fav);
			var t_item = new MenuItem($scope.menuitem[idx]);

			t_item.$save().then(function(){
				MenuItem.query(function(data){
					$scope.menuitem = data;
				})
			});
		}

// Edit menu item
		$scope.editItem = function (itemId) {
			$scope.up.label = null;
			$scope.up.message = null;
			$scope.idx = $filter('getById')($scope.menuitem, itemId);
			$scope.t_item = new MenuItem($scope.menuitem[$scope.idx]);

// Modal instance
			$scope.modalInstance = $modal.open({
    		   	templateUrl: 'section/manager/menuedit.html',
		    	scope: $scope,
  			});

// Save menu item to database
			$scope.saveItem = function() {
				var titem = new MenuItem($scope.t_item);
				titem.$save().then(function(data){
					MenuItem.query(function(data){
						$scope.menuitem = data;
					});
				});
				$scope.modalInstance.close('success');
			}
		};

// Add menu item
		$scope.addItem = function(mcid) {
			$scope.up.label = null;
			$scope.up.message = null;
			$scope.t_item = new MenuItem();
			$scope.t_item.state = false;
			$scope.t_item.fav = false;
			$scope.t_item.spicy = false;
			$scope.t_item.gfree = false;
			$scope.t_item.vegetarian = false;
			$scope.t_item.mc_id = mcid;

// Modal instance
			$scope.modalInstance = $modal.open({
  		    	templateUrl: 'section/manager/menuedit.html',
		    		scope: $scope,
  			});

// Save menu item to database
			$scope.saveItem = function() {
				console.log('manager.menuctrl.additem.saveitem: ', $scope.t_item);

				var titem = new MenuItem($scope.t_item);

				titem.$create().then(function(data){

					console.log('manager.menuctrl.additem.create.response: ', data);

					if (data.success.id != null)
						$scope.t_item.id = data.success.id; 

					MenuItem.query(function(data) {
						$scope.menuitem = data;
					})
				});
//				$scope.modalInstance.close('success');
			}
		}

// Remove menu item
		$scope.removeItem = function(itemId) {
			console.log('trigger');
			var idx = $filter('getById')($scope.menuitem, itemId);
			var t_item = new MenuItem($scope.menuitem[idx]);
			t_item.$remove().then(function(data){
				MenuItem.query(function(data){
					$scope.menuitem = data;
				}) 
			})
		}
	}])

// -----------------------------------------------------------------------------------------------------------------------------
// Manager Coupon controller
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('mCouponCtrl', ['$scope', '$location', '$route', '$window',
		'$modal', '$filter', 'Coupon', function (
		$scope,	$location, $route, $window, $modal, $filter, Coupon) {

		$scope.coupon = Coupon.query();
		$scope.c_item = new Coupon;
		$scope.c_item.pct_fix = '1';

// Save coupon
		$scope.saveCoupon = function(couponId) {
			var idx = $filter('getById')($scope.coupon, couponId);
			$scope.coupon[idx].fstate = false;
			var t_coupon = new Coupon($scope.coupon[idx]);

			t_coupon.$save().then(function(){
				Coupon.query(function(data){
					$scope.coupon = data;					
				})
			})
		}

// Remove coupon
		$scope.removeCoupon = function(couponId) {
			var idx = $filter('getById')($scope.coupon, couponId);
			var t_coupon = new Coupon($scope.coupon[idx]);

			t_coupon.$remove().then(function(){
				Coupon.query(function(data){
					$scope.coupon = data;					
				})
			})
		}

// Add coupon
		$scope.addCoupon = function() {
			$scope.c_item.$create().then(function(){
				Coupon.query(function(data){
					$scope.coupon = data;					
				})
				$scope.c_item = new Coupon;
				$scope.c_item.pct_fix = '1';
			})
		}

// Reload coupon
		$scope.reloadCoupon = function(){
			Coupon.query(function(data){
				$scope.coupon = data;					
			})
		}
	}])

// -----------------------------------------------------------------------------------------------------------------------------
// Manager Account Controller
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('mAccountCtrl', ['$scope', '$location', '$route', '$window',
		'$modal', '$filter', 'Account', function (
		$scope,	$location, $route, $window, $modal, $filter, Account) {
		$scope.account = Account.query();

// Change account password
		$scope.accountChange = function(idx) {
			$scope.username = $scope.account[idx].username;
			$scope.tpasswd = new Object();
			$scope.error = '';


			$scope.modalInstance = $modal.open({
    		   	templateUrl: 'section/manager/changepassword.html',
		    	scope: $scope,
  			});

// Modal cancel
			$scope.cancel = function(){
				$scope.modalInstance.dismiss('cancel');
			}

// Save password
			$scope.savePasswd = function() {
				if ($scope.tpasswd.password1 != $scope.tpasswd.password2)
					$scope.error = 'Passwords do not match';
				else {
					$scope.modalInstance.close('success');
					$scope.account[idx].password = $scope.tpasswd.password1;
					$scope.account[idx].$save().then(function(){
						$scope.account = Account.query();
					})
				}
			}
		}
	}])

// -----------------------------------------------------------------------------------------------------------------------------
// Manager Statistics Controller
// -----------------------------------------------------------------------------------------------------------------------------

    .controller('mStatCtrl', ['$scope', '$location', '$route',
		'$window', '$filter', 'SessionStorage', 'Account', 
		'ManagerOxWxT', 'WaiterOMIView', 'Customer', 'Chat', 
		function($scope, $location, $route, $window, $filter, 
			SessionStorage, Account, ManagerOxWxT, 
			WaiterOMIView, Customer, Chat) {

		$scope.clearChat = function() {
			Chat.remove(function(data){
				console.log(data);
				if (data.error == null)
					$scope.mysession.alerts.push({type: 'success', msg: 'Chat was cleared successfully!'});
				else if (data.error.code == 204)
					$scope.mysession.alerts.push({type: 'warning', msg: 'Chat is already empty!'});
				else
					$scope.mysession.alerts.push({type: 'danger', msg: 'Internal server error!'});
			});
		};

// Calculate overall order statistics		
		$scope.calculateOrders = function(data) {
			if (!(data instanceof Object))
				return null;

			var len = data.length;
			data.paid = 0;
			data.tips = 0;
			for (var i=0; i<len; i++) {
				data.paid += parseFloat(data[i].paid);
				data.tips += parseFloat(data[i].tips);
			}
			data.beforetips = data.paid - data.tips;
		};

// Calculate ordered items statistics
		$scope.calculateItems = function(data) {
			if (!(data instanceof Object))
				return null;

			var len = data.length;
			data.comped = 0;
			data.paid = 0;
			data.sort(function(a,b){return parseFloat(a.mi_id)-parseFloat(b.mi_id)});
			data.mp = new Array();
			for (var i=0; i<len; i++) {
				if (data.mp.length == 0 || data.mp[data.mp.length-1].id != data[i].mi_id)
					data.mp.push({id: data[i].mi_id, name: data[i].name, counter: 1});
				else
					data.mp[data.mp.length-1].counter++;
				if (Number(data[i].p_state) == 2)
					data.comped++;
				else
					data.paid++;
			}
			data.mp.sort(function(a,b){return b.counter-a.counter});
			console.log(data.mp);
		};

// Get customers
		Customer.query(function(data){
			console.log('mStatCtrl.customer.query', data);
			$scope.mysession.customer = data;
		});

// Get ordered items
		WaiterOMIView.query(function(data){
			console.log('mStatCtrl.waiteromiview.query', data);
			$scope.mysession.ordereditems = data;
			$scope.calculateItems($scope.mysession.ordereditems);

// Get orders
			ManagerOxWxT.query(function(data){
				console.log('mStatCtrl.manageroxwxt.query', data);
				$scope.mysession.orders = data;
				$scope.calculateOrders($scope.mysession.orders);
				var len = $scope.mysession.orders.length;
				
				for(var i=0;i<len;i++)
					$scope.mysession.orders[i].items = $filter('getByOrder')($scope.mysession.ordereditems, $scope.mysession.orders[i].id);

// Get waiters
				Account.wQuery(function(data) {
					console.log('mStatCtrl.account.wQuery:', data);
					var len = data.length;
					for (var i=0; i< len; i++) {
						data[i].ordereditems = new Object();
						data[i].username = data[i].username.replace(/ws0/gi, 'Server #');
						var tmp = $filter('getByWaiter')($scope.mysession.orders, data[i].id);
						data[i].orders = tmp.orders;
						data[i].ordereditems = tmp.ordereditems;
						$scope.calculateItems(data[i].ordereditems);
						$scope.calculateOrders(data[i].orders);
					} 
					$scope.mysession.waiters = data;
				})
			})
		})
    }])


/*
// -----------------------------------------------------------------------------------------------------------------------------
// Manager Game Controller (not used)
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('mGameCtrl', ['$scope', '$location', '$route', '$window',
		'$modal', '$filter', 'Coupon', function (
		$scope,	$location, $route, $window, $modal, $filter, Coupon) {
		$scope.coupon = Coupon.queryGame();
		$scope.c_item = new Coupon;
		$scope.c_item.pct_fix = '0';
		$scope.c_item.state = '1'; 
		$scope.a1 = true; // open first element of accordion

// Save coupon
		$scope.saveCoupon = function(couponId) {
			var idx = $filter('getById')($scope.coupon, couponId);
			$scope.coupon[idx].fstate = false;
			var t_coupon = new Coupon($scope.coupon[idx]);

			t_coupon.$save().then(function(){
				Coupon.query(function(data){
					$scope.coupon = data;					
				})
			})
		}

// Remove coupon
		$scope.removeCoupon = function(couponId) {
			var idx = $filter('getById')($scope.coupon, couponId);
			var t_coupon = new Coupon($scope.coupon[idx]);

			t_coupon.$remove().then(function(){
				Coupon.query(function(data){
					$scope.coupon = data;					
				})
			})
		}

// Add coupon
		$scope.addCoupon = function() {

			$scope.c_item.$create().then(function(){

				Coupon.query(function(data){
					$scope.coupon = data;					
				})

				$scope.c_item = new Coupon;
				$scope.c_item.pct_fix = '1';
			})
		}

// Reload coupon
		$scope.reloadCoupon = function(){
			Coupon.query(function(data){
				$scope.coupon = data;					
			})
		}
	}])
*/
// -----------------------------------------------------------------------------------------------------------------------------
// Main customer controller
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('CustomerCtrl', ['$scope', '$location', '$route',
		'$window', '$modal', '$anchorScroll', 'SessionStorage', 
		'Order', 'TableStatus', 'Chat',function ($scope, $location,
		$route, $window, $modal, $anchorScroll, SessionStorage, 
		Order, TableStatus, Chat) {

		$scope.mysession = SessionStorage;
		$scope.customer = $scope.mysession.customer;
		
// No customer -> no customer session
		if ($scope.mysession.customer == null)
			$location.path('/table'); 

		$scope.mysession.table = TableStatus.getByTable({id: $scope.mysession.id},function(data){
			console.log('customer.table:', data);
		});

// Our initialization variables
		$scope.mysession.cart = new Object;
		$scope.mysession.cart.items = new Array();
		$scope.mysession.alerts = new Array();
		$scope.mysession.cart.showCart = false;
		$scope.mysession.order = null;
		$scope.req = 0;
		$scope.mysession.section = 'menu';
		$window.document.title = 'Our Restaurant';

		if ($scope.mysession.customer.id > 1)
			$scope.mysession.alerts.push({type: 'info', msg: 'Welcome back '+$scope.mysession.customer.name+'!'});

// Customer logout (should be done properly -> clean the table status, order, etc)
		$scope.cLogout = function() {
			var t_order = new Order();
			t_order.id = $scope.mysession.order.id;
			t_order.end_time = new Date().toJSON();
			t_order.o_state = true;
			t_order.r_state = false;
			t_order.$save(function(data) {
				console.log('customer.cLogout.t_order.save:', data);

				var t_table = new TableStatus();
				t_table.id = $scope.mysession.table.id;
				t_table.cw_state = false;
				t_table.t_state = 0;

				t_table.$save(function(data){
					console.log('customer.cLogout.t_table.save:', data);

					delete $scope.mysession.customer;
					delete $scope.mysession.order;
					delete $scope.mysession.cart;
					delete $scope.mysession.alerts;
					delete $scope.mysession.section;
					delete $scope.mysession.can_refill;
				
					console.log('customer.cLogout.t_order.save.mysession: ', $scope.mysession);
					$location.path('/table');
					
				})
			});
		}

// Start chat
		$scope.startChat = function() {

// Function to get chat messages from server
			var getChat = function() {
				Chat.query(function(data){
					$scope.msgs = data;
					if (data[0].error != null)
						$scope.msgs = [{from: 'system', message: 'No messages'}];
				});
			};

// Get them!
			getChat();
			
// Every 3 seconds!
			var myinterval = setInterval(getChat, 3000);

// Go to the bottom of the chat when open
			$scope.scrollToBottom = function() {
	    		document.getElementById('bottom').scrollIntoView();
			}

// Rename usernames to tables
			$scope.renameTable = function(data) {
				return data.replace(/tbl0/g, 'Table #');
			}

// Close chat
			$scope.cancel = function() {
				clearInterval(myinterval);
				delete $scope.mysession.my_msg;
				$scope.modalInstance.dismiss('cancel');
			}

// Send new message
			$scope.sendChat = function(data) {
				if ($scope.mysession.my_msg == '')
					return null;
				Chat.create({from: $scope.mysession.username, message: data}, function(rdata) {
					$scope.mysession.my_msg = '';
					console.log(rdata);
					getChat();
				})
			};

// Open dialog
			$scope.modalInstance = $modal.open({
    		   	templateUrl: 'section/customer/chat.html',
		    	scope: $scope,
  			})
		};


// Call waiter
		$scope.callWaiter = function() {
			$scope.mysession.table.cw_state = !$scope.mysession.table.cw_state;
			var t_item = new TableStatus($scope.mysession.table);
			t_item.$save().then(function(data){
				console.log('customer.callWaiter.save:', data);
				t_item = TableStatus.getByTable({id: $scope.mysession.id}, function(data){
					console.log('customer.callWaiter.get:', data);
					$scope.mysession.table = data;
				})
			})
		};

// Request refill
		$scope.requestRefill = function () {
			if ($scope.mysession.can_refill) {
				$scope.mysession.order.r_state = !$scope.mysession.order.r_state;
				var t_item = new Order($scope.mysession.order);
				console.log('customer.requestRefill.t_item: ', t_item);
				delete t_item.items;
				console.log('customer.requestRefill.t_item(cleaned): ', t_item);
				t_item.$save().then(function(data){
					console.log('customer.requestRefill.save:', data);
					Order.get({id: $scope.mysession.order.id}, function(data) {
						$scope.mysession.order.r_state = data.r_state;
					})
				})
			}
		}

// Close alert
		$scope.alertClose = function(idx) {
			$scope.mysession.alerts.splice(idx, 1);
		}

// Update the required information every minute
		$scope.req = setInterval(function(){
			TableStatus.getByTable({id: $scope.mysession.id}, function(data) {
				console.log('customer.table.getbyTable:', data);
				$scope.mysession.table = data;

// If table status changes to 1 - clear the table
				if (data.t_state == 2)
					$scope.cLogout();
			})

// Get order number
			if ($scope.mysession.order != null && $scope.mysession.order.id != null) {
				Order.get({id: $scope.mysession.order.id}, function(data){
					console.log('customer.order.get: ', data)
					$scope.mysession.order.r_state = Boolean(data.r_state);
					$scope.mysession.order.o_state = Boolean(data.o_state);
				})
			}
		},30000);
    }])

// -----------------------------------------------------------------------------------------------------------------------------
// Customer Menu controller
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('cMenuCtrl', ['$scope', '$location', '$route',
		'$window', '$modal', '$filter', 'MenuCategory','MenuItem',
		function ($scope, $location, $route, $window, $modal, 
			$filter, MenuCategory, MenuItem) {
		$window.document.title = 'Our Menu';
		$scope.mc = new Object();

// Choose "Our Picks" as the first page
		$scope.mc.idx = -1;

// Get menu categories
		$scope.menucategory = MenuCategory.query(function (data) {
			console.log('cMenu.MenuCategory.query:', data);
	    	$scope.$watch('mc.idx', function() {
	    		if ($scope.mc.idx == -1)
	    			$scope.mc.id = -1;
	    		else {
					$scope.mc.id = parseInt($scope.menucategory[$scope.mc.idx].id);
					$scope.mc.heartyidx = parseInt($scope.menucategory[$scope.mc.idx].heartyidx);
				}
	    	})
		});

// Get menu items
		$scope.menuitem = MenuItem.cQuery(function(data){
			console.log('cMenu.MenuItem.query:', data);
		});

		$scope.mysession.menuitem = $scope.menuitem;

// Add menu item to the cart
		$scope.addItem = function(itemId) {
			$scope.mysession.cart.showCart = true;
			var idx = $filter('getById')($scope.menuitem, itemId);
			var t_item = new MenuItem($scope.menuitem[idx]);
			delete $scope.menuitem[idx].custom;
			$scope.mysession.cart.items.push(t_item);

			if ($scope.modalInstance != null) {
				$scope.modalInstance.close('success');
				delete $scope.modalInstance;
			}
		}

// Customize menu item
		$scope.customizeItem = function(itemId) {
			var idx = $filter('getById')($scope.menuitem, itemId);
			$scope.t_item = $scope.menuitem[idx];
			$scope.modalInstance = $modal.open({
    		   	templateUrl: 'section/customer/customize.html',
		    	scope: $scope
  			})

// Modal cancel
			$scope.cancel = function(){
				$scope.modalInstance.dismiss('cancel');
				delete $scope.modalInstance;
			}
		}
    }])

// -----------------------------------------------------------------------------------------------------------------------------
// Customer Cart Controller
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('cCartCtrl', ['$scope', '$location', '$route',
		'$window', '$modal', '$filter', 'Order', 'oMenuItem', 
		function ($scope, $location, $route, $window, $modal, 
			$filter, Order, oMenuItem) {

// Constants
		var DRINKS = 5 // Drinks Category ID
		var COMBOS = 6 // Combos Category ID
		var NOT_COOKED = 0; // ordered item states
		var NOT_PAID = 0; // ordered item states

// Create order if not exists yet
		if ($scope.mysession.order == null)
			$scope.mysession.order = new Order();


		$scope.cartTotal = 0;

// Change cartTotal when cart items deleted/added
		$scope.$watch('mysession.cart.items.length', function(){
			if ($scope.mysession.cart && $scope.mysession.cart.items) {

				var ENTREE = 3;
				var KIDS = 7;

				var len = $scope.mysession.cart.items.length;
				var sum = 0;
				var ent = 0;

// Kids menu items are free with entrees
				for (var i=0;i<len;i++) {
					if ($scope.mysession.cart.items[i].price == 0) {
						var idx = $filter('getById')($scope.mysession.menuitem, $scope.mysession.cart.items[i].id);
						$scope.mysession.cart.items[i].price = $scope.mysession.menuitem[idx].price;
					}
					if (parseFloat($scope.mysession.cart.items[i].mc_id) == ENTREE)
						ent++;
					else if (parseFloat($scope.mysession.cart.items[i].mc_id) == KIDS && ent > 0) {
						$scope.mysession.cart.items[i].price = 0;
						ent--;
					}
					sum += parseFloat($scope.mysession.cart.items[i].price);
				}

				$scope.cartTotal = sum.toFixed(2);
			}
			else $scope.cartTotal = 0;
		})

// Save every ordered item to the database
		$scope.postOrderItems = function () {
			var len = $scope.mysession.cart.items.length;
			$scope.mysession.order.items = new Array();

			for (var i=0;i<len;i++) {

				if (parseInt($scope.mysession.cart.items[i].mc_id) == DRINKS || parseInt($scope.mysession.cart.items[i].mc_id) == COMBOS)
					$scope.mysession.can_refill = true;

				$scope.mysession.order.items[i] = new oMenuItem();
				$scope.mysession.order.items[i].o_id = $scope.mysession.order.id;
				$scope.mysession.order.items[i].mi_id = $scope.mysession.cart.items[i].id;
				$scope.mysession.order.items[i].c_state = NOT_COOKED;
				$scope.mysession.order.items[i].p_state = NOT_PAID;
				if ($scope.mysession.cart.items[i].custom != null)
					$scope.mysession.order.items[i].custom = $scope.mysession.cart.items[i].custom;
			}

			console.log('cCart.postOrderItems.oItems', $scope.mysession.order.items);

// Actual saving
			oMenuItem.mCreate($scope.mysession.order.items, function(data) {
				console.log('cCart.postOrderItems.oMenuItem.create:', data);
				$scope.mysession.order.items = new Array();
				$scope.mysession.cart.items = new Array();
			})
		}

// Place order 
		$scope.placeOrder = function() {
			if ($scope.mysession.order.id == null) {

// Variable initialization				
				$scope.mysession.order.c_id = $scope.mysession.customer.id;
				$scope.mysession.order.tw_id = $scope.mysession.table.id;
				$scope.mysession.order.start_time = new Date().toJSON();
				$scope.mysession.order.tips = 0;
				$scope.mysession.order.paid = 0;
				$scope.mysession.order.total = 0;
				$scope.mysession.order.o_state = false;
				$scope.mysession.order.r_state = false;
				$scope.mysession.can_refill = false;

				var t_item = new Order($scope.mysession.order);
// Save new order to the database
				t_item.$create().then(function(data){
					console.log('cCart.placeOrder.Order.create:', data);
					$scope.mysession.order.id = data.success.id;

// Retrieve the order after saving 
					$scope.mysession.order.$get().then(function(data) {
						console.log('cCart.placeOrder.Order.get:', data);
						$scope.mysession.order = data;
						$scope.postOrderItems();
					})
				})
			}
			else {
				$scope.mysession.order.o_state = false;
				var t_item = new Order($scope.mysession.order);
				delete t_item.items;
				t_item.$save(function(data){
					console.log('cCart.placeOrder.Order.save:', data);
				})
				$scope.postOrderItems();
			}
			$scope.mysession.alerts.push({type: 'info', msg: 'Your order has been placed successfully!'});
			$scope.mysession.cart.showCart = false;
		}
    }])

// -----------------------------------------------------------------------------------------------------------------------------
// Customer Pay the Bill controller
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('cBillCtrl', ['$scope', '$location', '$route',
		'$window', '$modal', '$filter', 'Order', 'oMenuItem',
		'MenuItem', 'Coupon', 
		function ($scope, $location, $route, $window, $modal, 
			$filter, Order, oMenuItem, MenuItem, Coupon) {

// Although not required, just in case
			if ($scope.mysession.order.id == null) {
				$scope.mysession.section = 'menu';
			}

// Initializing variables
			var NOT_PAID = 0; // ordered tem is not paid
			var PAID = 1; // ordered item is paid
			var ENTREE = 3;
			var KIDS = 7;
			
			$scope.roundup = false;
			$scope.tax = $scope.mysession.TAX;
			$scope.tip = $scope.mysession.TIPS;

// Change total when tips have changed
			$scope.$watch('tip',function() {
				$scope.getTotal();
			});

// Change total when checkbox to roundup changed
			$scope.$watch('roundup',function() {
				$scope.getTotal();
			});

			$scope.error = new Object();
			$scope.cc = new Object();
			$scope.c_ratio = 0;
			$scope.c_fixed = 0;
			$scope.current_date = new Date();
			$scope.cc.month = $scope.current_date.getMonth();
			$scope.cc.year = $scope.current_date.getFullYear();
			$scope.mysession.cart.showCart = false;

// For expiration date
			$scope.myRange = function(idx, n) {
				var tmp = new Array(n);
				for (var i=0;i<n;i++)
					tmp[i] = idx + i;
				return tmp;
			};

// Get the list of unpaid items 
			$scope.getUnpaidItems = function(callback) {
				MenuItem.query(function(data) {
					$scope.menuitem = data;
					oMenuItem.cQuery({id: $scope.mysession.order.id}, function (data) {
						delete $scope.mysession.order.items;
						$scope.mysession.order.items = new Array();
						var len = data.length;
						var ent = 0;
						if (len > 0) {
							for (var i=0; i<len; i++) {
								if (parseInt(data[i].p_state) == NOT_PAID) {
									var t_item = new oMenuItem(data[i]);
									var idx = $filter('getById')($scope.menuitem, data[i].mi_id);
									t_item.name = $scope.menuitem[idx].name;
									t_item.price = $scope.menuitem[idx].price;
									t_item.pay = true;

// If there is adult meal, then kids meal is free
									if ($scope.menuitem[idx].mc_id == ENTREE)
										ent++;
									else if ($scope.menuitem[idx].mc_id == KIDS && ent > 0) {
										t_item.price = 0;
										ent--;
									}

									$scope.mysession.order.items.push(t_item);
								}
							}
						}
						$scope.getTotal();
						console.log('customer.cBillCtrl.getUnpaidItems.MenuItem.query.oMenuItem.query.order.items: ', $scope.mysession.order.items);
						if (callback != null)
							callback($scope.mysession.order.items.length);
					})
				})
			};

// Calculate total
			$scope.getTotal = function(idx) {
				console.log('customer.cBillCtrl.getTotal.order: ', $scope.mysession.order);
				console.log($scope.tip);
				if ($scope.mysession.order.items && $scope.mysession.order.items.length > 0) {

					if (idx != null)
						$scope.mysession.order.items[idx].pay = !$scope.mysession.order.items[idx].pay;

					var len = $scope.mysession.order.items.length;
					var sum = 0;
					var ot = 0;

					for (var i=0;i<len;i++) {
						if ($scope.mysession.order.items[i].pay)
							sum += parseFloat($scope.mysession.order.items[i].price);
					}

					$scope.tipsTotal = (sum*$scope.tip/100).toFixed(2); 
					$scope.salesTax = (sum*$scope.tax/100).toFixed(2);
					$scope.couponTotal = (-1*sum*$scope.c_ratio/100-$scope.c_fixed).toFixed(2);

					ot = sum + sum*$scope.tip/100 + sum*$scope.tax/100 - sum*$scope.c_ratio/100 - $scope.c_fixed;

					if ($scope.roundup == true && ot % 1 != 0)
						ot = Math.ceil(ot);

					$scope.orderTotal = (ot).toFixed(2);

					if (ot < 0)
						$scope.orderTotal = 0;
				}
// Simply nullify if there are no items
				else {
					$scope.tipsTotal = 0; 
					$scope.salesTax = 0;
					$scope.couponTotal = 0;
					$scope.orderTotal = 0;
				}
			};

// Apply coupon
			$scope.applyCoupon = function() {
				$scope.c_ratio = 0;
				$scope.c_fixed = 0;
				delete $scope.mysession.order.cp_id;
				$scope.getTotal();

// If coupon is not empty, find it and apply it
				if ($scope.coupon != null && $scope.coupon != '') {
					$scope.mysession.coupon = Coupon.getByName({id: $scope.coupon}, function(data) {
						if (data != null && data.id != null) {
							console.log('customer.cBillCtrl.applyCoupon.coupon.getbyname: ', data);
							$scope.mysession.coupon = data;
							if (parseInt($scope.mysession.coupon.pct_fix) == 1)
								$scope.c_fixed = $scope.mysession.coupon.cvalue;
							else
								$scope.c_ratio = $scope.mysession.coupon.cvalue;
							$scope.error.coupon = '';	
							$scope.getTotal();
							$scope.mysession.order.cp_id = data.id;
						}
// Couldn't find the coupon
						else {
							$scope.error.coupon = 'Error! Can not apply the coupon';
							console.log($scope.error);
						}	
					})
				}
			};

// Process the payment
			$scope.processPayment = function() {

				var len = $scope.mysession.order.items.length;
				var t_items = new Array();
				$scope.t_items = new Array();

// Get all checked items
				for (var i=0; i<len; i++) {
					if ($scope.mysession.order.items[i].pay == true) {
						var t_item = new oMenuItem();
						t_item.id = $scope.mysession.order.items[i].id;
						t_item.p_state = PAID;
						t_items.push(t_item);
						$scope.t_items.push($scope.mysession.order.items[i]);
					}
				}

				$scope.ltTotal = $scope.tipsTotal;
				$scope.lsTax = $scope.salesTax;
				$scope.lcTotal = $scope.couponTotal;
				$scope.loTotal = $scope.orderTotal;   

// Save the order
				oMenuItem.mSave(t_items, function(data) {
					console.log("customer.cBillCtrl.processPayment.titems.save: ",data);
					$scope.getUnpaidItems(function(len) {
						Order.get({id: $scope.mysession.order.id}, function (data) {
							console.log('customer.cBillCtrl.processPayment.titems.save: ', data);

							if (len == null || len == 0)
								$scope.mysession.order.o_state = 1;

							$scope.mysession.order.paid = (parseFloat(data.paid) + parseFloat($scope.loTotal)).toFixed(2);
							$scope.mysession.order.tips = (parseFloat(data.tips) + parseFloat($scope.ltTotal)).toFixed(2);

							var t_order = new Order($scope.mysession.order);
							delete t_order.items;

// Actual saving
							t_order.$save(function(data) {
								console.log("customer.cBillCtrl.processPayment.t_order.save: ",data);
							});

// Modal cancel function
							$scope.cancel = function(){
								$scope.modalInstance.dismiss('cancel');
							};

// Modal instance
							$scope.modalInstance = $modal.open({
    			   				templateUrl: 'section/customer/check.html',
		    					scope: $scope,
  							})

						})

					})
				})
			};

			$scope.getUnpaidItems();
    }])

// -----------------------------------------------------------------------------------------------------------------------------
// Kitchen controller
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('KitchenCtrl', ['$scope', '$location', '$route',
		'$window', 'SessionStorage', 'KitchenView', 'oMenuItem', 
		function( $scope, $location, $route, $window, 
			SessionStorage, KitchenView, oMenuItem) {
		
		$scope.mysession = SessionStorage;
// Authorization
		if ($scope.mysession == null || $scope.mysession.access != 1)
	    	$location.path('/login');

		$scope.req = 0;
		$window.document.title = 'Chef de Cuisine';

// Get orders
		$scope.getKitchenView = function (callback) {
			KitchenView.query(function(data) {
				console.log('kitchen.kitchenview.query: ', data);
				if (data[0].error) {
					$scope.mysession.kview = null;
					return null;
				}
				var len = data.length;
				for (var i=0; i<len; i++) {
					data[i].start_time = new Date(data[i].start_time);
					data[i].start_time = data[i].start_time.getHours()+":"+data[i].start_time.getMinutes();
				}
				$scope.mysession.kview = data;
				if (callback != null)
					callback();
			});
		}

// Update the required information every 30 seconds
		$scope.req = setInterval(function(){
			$scope.getKitchenView();
		}, 30000);

// Logout function
		$scope.kLogout = function() {
			$scope.$destroy();
			$location.path('/login');
		};

// Ordered item is ready
		$scope.omiReady = function (id) {
			var t_item = new oMenuItem;
			t_item.id = id;
			t_item.c_state = 1;
			t_item.$save(function(data){
				console.log('kitchen.kitchenview.omiReady.t_item.save: ', data);
				$scope.getKitchenView();
			})
		};

		$scope.getKitchenView();
    }])

// -----------------------------------------------------------------------------------------------------------------------------
// Waiter controller
// -----------------------------------------------------------------------------------------------------------------------------
    .controller('WaiterCtrl', ['$scope', '$location', '$route', '$window', '$filter', '$modal', 'SessionStorage', 'oMenuItem',
		'Order', 'TableStatus', 'WaiterTableView', 'WaiterOMIView', function ($scope, $location, $route, $window, $filter, 
			$modal, SessionStorage, oMenuItem, Order, TableStatus, WaiterTableView, WaiterOMIView) {
		
		$scope.mysession = SessionStorage;

// Authorization
		if ($scope.mysession == null || $scope.mysession.access != 2) // if we didn't login or we logged in with different access level
	    	$location.path('/login');

		$window.document.title = 'Server';

		$scope.a_open = new Array();
		$scope.a_open[0] = true;
		$scope.wo = new Order();
		$scope.req = 0;

// Enter amount paid by cash
		$scope.setMoney = function (id) {
			if (id == null)
				return null;
// Close dialog
			$scope.cancel = function(){
				$scope.modalInstance.dismiss('cancel');
			}

// Save paid Cash to db
			$scope.saveMoney = function() {
				$scope.wo.paid = parseFloat($scope.wo.paid);
				$scope.wo.tips = parseFloat($scope.wo.tips);

// If paid < tips -> something wrong
				if ( $scope.wo.paid < $scope.wo.tips)
					return null;

// Get table View
				clearInterval($scope.req);
				$scope.getTableView(function(){
					var idx = $filter('getById')($scope.mysession.wtview, id);

					$scope.wo.o_state = Number($scope.wo.o_state);

// If order is fully paid change endtime
					if ($scope.wo.o_state == 1)
						$scope.wo.end_time = new Date().toJSON();

					$scope.wo.id = id;
					var t_item = new Order($scope.wo);

					console.log('t_item', t_item);
					t_item.tips += parseFloat($scope.mysession.wtview[idx].tips);
					t_item.paid += parseFloat($scope.mysession.wtview[idx].paid);

					t_item.$save(function(data){
						console.log('waiter.setMoney.saveMoney.gettableview.save: ', data);
						$scope.wo = new Object();
						$scope.modalInstance.close('success');
//						$scope.getOrderedItems(function(){
							$scope.getTableView();
//						});
						$scope.req = setInterval(function(){
//							$scope.getOrderedItems(function(){
								$scope.getTableView();
//							});
						},30000);

					})
				});

			}
			$scope.modalInstance = $modal.open({
  		    	templateUrl: 'section/waiter/money.html',
		    	scope: $scope
  			});
		}

// Set call waiter to served
		$scope.setcwServed = function (id) {
			if (id == null)
				return null;
			var t_item = new TableStatus();
			t_item.id = id;
			t_item.cw_state = 0;
			t_item.$save(function(data){
				console.log('waiter.setcwserved.t_item.save: ', data);
				$scope.getTableView();
			})
		}

// Set refill to served
		$scope.setrServed = function (id) {
			if (id == null)
				return null;
			var t_item = new Order();
			t_item.id = id;
			t_item.r_state = 0;
			t_item.$save(function(data){
				console.log('waiter.setrserved.t_item.save: ', data);
				$scope.getTableView();
			})
		}

// Set Ordered Item as Served 
		$scope.setoiServed = function (t_id, id) {
			var t_idx = $filter('getById')($scope.mysession.wtview, t_id);
			var idx = $filter('getById')($scope.mysession.wtview[t_idx].items, id);
			if (id == null || t_id == null || $scope.mysession.wtview[t_idx].items[idx].c_state == '2')
				return null;
			var t_item = new oMenuItem();
			t_item.id = id;
			t_item.c_state = 2;
			t_item.$save(function(data) {
				console.log('waiter.setoiserved.t_item.save: ', data);
//				$scope.getOrderedItems(function(){
				if (data.error != null)
					$scope.getTableView();
				else
					WaiterOMIView.cQuery({id: t_id}, function(idata){
						console.log('waiter.setoipaid.t_item.save.cqery', idata);
						$scope.mysession.wtview[t_idx].items = idata;
					});
//				});
			})
		}

// Set Ordered Item as Paid or Comped
		$scope.setoiPaid = function(t_id, id, state) {
			var t_idx = $filter('getById')($scope.mysession.wtview, t_id);
			var idx = $filter('getById')($scope.mysession.wtview[t_idx].items, id);
			if (id == null || t_id == null || (idx != null && $scope.mysession.wtview[t_idx].items[idx].p_state != "0"))
				return null;
			var t_item = new oMenuItem();
			t_item.id = id;
			t_item.p_state = state;
			t_item.$save(function(data){
				console.log('waiter.setoipaid.t_item.save: ', data);
//				$scope.getOrderedItems(function(data){
					if (data.error != null)
						$scope.getTableView();
					else
						WaiterOMIView.cQuery({id: t_id}, function(idata){
							console.log('waiter.setoipaid.t_item.save.cqery', idata);
							$scope.mysession.wtview[t_idx].items = idata;
						});
//				});
			})
		}

// Set table to Free 
		$scope.settFree = function(o_id, tw_id) {
			if (o_id != null || tw_id == null)
				return null;

			var t_item = new TableStatus();
			t_item.id = tw_id;
			t_item.t_state = 2;
			t_item.$save(function(data){
				console.log('waiter.settfree.t_item.save: ', data);
				$scope.getTableView();
			})
		}


// Get Ordered Items of active orders
/*		$scope.getOrderedItems = function(callback) {
			WaiterOMIView.query(function(data){
				console.log('waiter.waiteromiview.query: ', data);
				if (data[0].error) {
					$scope.mysession.omiview = null;
				}
				else $scope.mysession.omiview = data;
				if (callback != null)
					callback();
			})
		};
*/

// Get summation of the ordered items
		$scope.getTotal = function(id) {
			if (id == null)
				return 0;	

			var idx = $filter('getById')($scope.mysession.wtview, id);
			var sum = 0;

			if ($scope.mysession.wtview[idx].items.$resolved != true)
				return 0;
			
			var len = $scope.mysession.wtview[idx].items.length;

			for (var i=0; i < len; i++)
				if ($scope.mysession.wtview[idx].items[i].p_state == 0)
					sum += parseFloat($scope.mysession.wtview[idx].items[i].price);
			
			sum *= 1+$scope.mysession.TAX/100;
			
			return sum.toFixed(2);

		}

// Get waiter's tables and orders
		$scope.getTableView = function (callback) {
			WaiterTableView.query({id: $scope.mysession.id}, function(data) {
				console.log('waiter.waitertableview.query: ', data);
				if (data[0].error) {
					$scope.mysession.wtview = null;
					return null;
				}
				var len = data.length;
				for (var i = 0; i < len; i++) {
					data[i].t_name = data[i].t_name.replace(/tbl/gi,'Table #'); 
					if (data[i].id != null) {
						console.log('data[i]', data[i]);
						data[i].start_time = new Date(data[i].start_time+' GMT');
						data[i].pass_time = new Date(new Date()-data[i].start_time);
						data[i].pass_time = data[i].pass_time.getUTCHours()+"h "+data[i].pass_time.getUTCMinutes()+"m";
						data[i].items = WaiterOMIView.cQuery({id: data[i].id}, function(idata) {
							console.log('idata',idata);
						});
					}
				}
				console.log('waiter.gettableview.mysession.wtview', $scope.mysession.wtview);
				$scope.mysession.wtview = data;

				if (callback != null)
					callback();
			});
		};

// Update the required information every 30 seconds
		$scope.req = setInterval(function(){
//			$scope.getOrderedItems(function(){
				$scope.getTableView();
//			});
		},30000);

// Logout function
		$scope.wLogout = function() {
			$scope.$destroy();
			$location.path('/login');
		};

// Get info for the first time
//		$scope.getOrderedItems(function(){
			$scope.getTableView();
//		});
    }])
