'use strict';

// Testing controllers
describe('controllers', function() {

  var $scope, $myhttp, $loc;
  beforeEach(module('myApp.controllers', 'myApp.services', 'ngRoute'));

//------------------//
// Testing LoginCtrl
//------------------//
  describe('LoginCtrl', function() {

    beforeEach(inject(function($httpBackend, $rootScope, $controller) {
	$myhttp = $httpBackend;
	$scope = $rootScope.$new();
	$controller('LoginCtrl', {$scope: $scope});
      }));

//-------------------------------------------------------------------
// Unit test for existence of loginSubmit() function
//-------------------------------------------------------------------
    it('should have loginSubmit() function', function() {
	expect($scope.loginSubmit).not.toBeUndefined();
    });

//-------------------------------------------------------------------
// Unit test for constants
//-------------------------------------------------------------------
    it('should have two constants: tips/tax', function() {
	expect($scope.mysession.TIPS).toBe(25);
	expect($scope.mysession.TAX).toBe(8.25);
    });

//-------------------------------------------------------------------
// Unit test for no input for loginSubmit() function
//-------------------------------------------------------------------
    it('should test loginSubmit() for no input', function() {
	$scope.loginForm = new Object();
	$scope.loginForm.$valid = false;

	expect($scope.loginSubmit()).toBe(null);
	expect($scope.error).toBe("Please enter username");

    });

//-------------------------------------------------------------------
// Unit test for no password for loginSubmit() function
//-------------------------------------------------------------------
    it('should test loginSubmit() for no password', function() {

	$scope.loginForm = new Object();
	$scope.loginForm.$valid = false;
	$scope.mysession.username = "user";

	$scope.loginSubmit();
	expect($scope.error).toBe("Please enter password");
    });


//-------------------------------------------------------------------
// Unit test for no username for loginSubmit() function
//-------------------------------------------------------------------
    it('should test loginSubmit() for no username', function() {

	$scope.loginForm = new Object();
	$scope.loginForm.$valid = false;
	$scope.mysession.password = "password";

	$scope.loginSubmit();
	expect($scope.error).toBe("Please enter username");
    });


//-------------------------------------------------------------------
// Unit test for wrong username/password for loginSubmit() function
//-------------------------------------------------------------------
    it('should test loginSubmit() for wrong username/password', function() {

	$scope.loginForm = new Object();
	$scope.loginForm.$valid = true;
	$scope.mysession.username = "username";
	$scope.mysession.password = "password";

	$myhttp.expectPOST('login.php',$scope.mysession)
	    .respond(401, {error: 'Login Failed'});

	$scope.loginSubmit();
	$myhttp.flush();
	expect($scope.error).toEqual('Login Failed');

    });

  });

//-----------------------//
// Testing TableLoginCtrl
//-----------------------//
  describe('TableLoginCtrl', function() {

//-------------------------------------------------------------------
// Unit test for redirecting from the page without correct access id
//-------------------------------------------------------------------
    describe('TableLoginCtrl redirect with no access', function() {
        beforeEach(inject(function($location, $rootScope, $controller) {
	    $loc = $location;
	    $scope = $rootScope.$new();
	    $controller('TableLoginCtrl', {$scope: $scope});
          }));

	it('should redirect to /login if there is no access id', function() {
	    expect($loc.path()).toBe('/login');
        });
    });

//-------------------------------------------------------------------
// Unit test for staying on the page with correct access id
//-------------------------------------------------------------------
    describe('TableLoginCtrl redirect with no access', function() {
        beforeEach(inject(function($location, $rootScope, $controller, $httpBackend, SessionStorage) {
	    $loc = $location;
	    $scope = $rootScope.$new();
	    $myhttp = $httpBackend;
	    $scope.mysession = SessionStorage;
	    $scope.mysession.access = 3;
	    $controller('TableLoginCtrl', {$scope: $scope});
          }));

	it('should NOT redirect to /login if there is a correct access id', function() {
	    expect($loc.path()).not.toBe('login');
        });
    });

  });

});
