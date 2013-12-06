'use strict';

// Testing Filters
describe('filter', function() {
  beforeEach(module('myApp.filters'));

// Unit test for getById filter
  describe('getById', function() {
    it('should get index number by ID', inject(function($filter) {
	var myArray = new Array();
	myArray.push({
	    id: '5',
	    name: 'Test #1'
	});
	myArray.push({
	    id: '7',
	    name: 'Test #2'
	});
	myArray.push({
	    id: '12',
	    name: 'Test #3'
	});
	myArray.push({
	    id: '4',
	    name: 'Test #4'
	});

	expect($filter('getById')(myArray, 7)).toBe(1);
	expect($filter('getById')(myArray, 11)).toBe(null);
    }))
  });


// Unit test for getByOrder filter
  describe('getById', function() {
    it('should get index number by order ID', inject(function($filter) {
	var myArray = new Array();
	myArray.push({
	    o_id: '5',
	    name: 'Test #1'
	});
	myArray.push({
	    o_id: '7',
	    name: 'Test #2'
	});
	myArray.push({
	    o_id: '12',
	    name: 'Test #3'
	});
	myArray.push({
	    o_id: '4',
	    name: 'Test #4'
	});

	expect($filter('getByOrder')(myArray, 7)[0].name).toBe('Test #2');
	expect($filter('getByOrder')(myArray, 11)).toEqual(Array());
    }))
  });


});
