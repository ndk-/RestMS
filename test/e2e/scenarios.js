'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /login when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/login");
  });


  describe('login', function() {

    beforeEach(function() {
      browser().navigateTo('#/login');
    });


    it('should render /login when user navigates to /login', function() {
      expect(element('[ng-view] div:first').text()).
        toMatch(/Please sign-up/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser().navigateTo('#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 2/);
    });

  });
});
