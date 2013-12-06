'use strict';

// SessionStorage Service
describe('SessionStorage service', function() {
 var session = null;

  beforeEach(function() {
    module('myApp.services');
    inject(function(SessionStorage) {
	session = SessionStorage;
    });
  });

// Unit test for returning the correct Object
  it('should return new Object', function() {
	var mysession = session;
	expect(mysession).toEqual(jasmine.any(Object));
  });

// Unit test for existence of destroy function
  it('should have destroy function', function() {
	expect(angular.isFunction(session.destroy)).toBe(true);
  });

// Unit test for existence of clearAll function
  it('should have clearAll function', function() {
	expect(angular.isFunction(session.clearAll)).toBe(true);
  });

// Unit test for working destroy function
  it('should test how destroy function works', function() {
	var mysession = session;
	mysession.newProp = 5;
	expect(mysession.newProp).toBe(5);
	mysession.destroy();
	expect(mysession.newProp).toBeUndefined();
  });

});

// MenuCategory Session
describe('MenuCategory', function() {
 var myres, $myhttp;

  beforeEach(function() {
    module('myApp.services');

    angular.mock.inject(function ($injector) {
        $myhttp = $injector.get('$httpBackend');
        myres = $injector.get('MenuCategory');
    });
  });

// Unit test for MenuCategory query function
 describe('query', function() {
    it('should call get with menucategories', inject(function(MenuCategory) {
	$myhttp.expectGET('db.php/menucategory')
	    .respond([{
		id: '1',
		name: 'Breakfast',
		heartyidx: '300',
		isdrink: '0'
	    }]);
	
	var res = myres.query();
	
	$myhttp.flush();
	
	expect(res[0].name).toEqual('Breakfast');
    }));

 })

});
