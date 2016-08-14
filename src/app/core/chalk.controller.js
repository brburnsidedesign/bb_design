angular.module('app').controller('ChalkCtrl', ['$scope', function($scope) {

	console.log('Chalk Controller firing!');

}]);


angular.module('app').directive('isolate', function() {
	return {scope: true};
});

angular.module('app').directive('isolate1', function() {
	return {scope: true};
});
