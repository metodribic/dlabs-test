angular.module('Models', ['ngResource'])

.constant('API_URL', 'http://toshl-killer.herokuapp.com/api/v1/')

.factory('BalanceChanges', function($resource, API_URL) {
	return $resource(API_URL + '/balance_changes?:filter',{filter : '@filter'}, {
		update: {
			method: 'PUT'
		}
	});
})

.factory('UpdateChanges', function($resource, API_URL) {
	return $resource(API_URL + '/balance_changes/:id',{id : '@id'}, {
		update: {
			method: 'PUT'
		}
	});
})

;
