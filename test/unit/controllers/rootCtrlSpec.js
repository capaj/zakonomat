'use strict';
describe('rootCtrl', function() {
	var scope;
	var ctrl;

	// You need to load modules that you want to test,
	// it loads only the "ng" module by default.
	beforeEach(module('app'));
	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('rootCtrl', {$scope: scope});
	}));

	it('should have a working method for deleting scope.query',
		function () {
			expect(scope.val).toEqual('for test');
		}
	);

});