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
    		})
    	}
    }])
    .controller('ManagerCtrl', ['$rootScope', '$scope', '$location', '$route',
		'$window', function ($rootScope, $scope, $location, $route,
		$window) {
//	if ($rootScope.access == null)
//	    $location.path('/login');
		$rootScope.section = 'menu';
		$window.document.title = 'Manager Section';
    }])
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
		$scope.modalInstance = null;

		$scope.editItem = function (idx) {
			$scope.t_item = $filter('getById')($scope.menuitem, idx);
	    	if ($scope.t_item != null) {
				$scope.modalInstance = $modal.open({
    		    	templateUrl: 'section/manager/menuedit.html',
//		    		controller: 'modalInstanceCtrl',
		    		scope: $scope,
//		    		resolve: {
//						items: function () {
//        		    		return $scope.t_item;
//    					}
//    		   		}
  				});
				$scope.cancel = function(){
					$scope.modalInstance.dismiss('cancel');
				}
				$scope.save = function() {
					$scope.tid = $scope.t_item.id;
					$scope.t_item.$save();
					console.log($scope.t_item);
					$scope.menuitem = MenuItem.query();
					$scope.modalInstance.close('success');
				}
			}
		};
// The disable button issue		
		$scope.disableItem = function (idx) {
			$scope.t_item = $filter('getById')($scope.menuitem, idx);
	    	if ($scope.t_item != null) {
	    		$scope.t_item.state = !($scope.t_item.state);
				$scope.t_item.$save();
//				$scope.t_item.$get({id:$scope.tid});
				$scope.menuitem = MenuItem.query();
				console.log($scope.menuitem);
			}
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
				$scope.t_item.$create();
				$scope.menuitem = MenuItem.query();
				$scope.modalInstance.close('success');
			}
		}
		$scope.removeItem = function(idx) {
			$scope.t_item = $filter('getById')($scope.menuitem, idx);
			$scope.t_item.$remove();
			$scope.menuitem = MenuItem.query();
		}
	}]);
