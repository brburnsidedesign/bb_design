app.controller('AppCtrl', ['$scope', function ($scope, $window) {

	console.log("Welcome to the portfolio site of Brooke Burnside, Ceramic Artist & Designer. This site was designed and developed by Will Barbee (will.clayton.barbee@gmail.com)");

}]);

app.controller('NavCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.isOpenLeft = function(){
      return $mdSidenav('left').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle();
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle();
      };
    }
  })

  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close();
    };
  });


	///////MATERIAL DIALOG


	app.controller('DialogCtrl', function($scope, $mdDialog) {
	  $scope.openFromLeft = function() {
	    $mdDialog.show(
	      $mdDialog.alert()
	        .clickOutsideToClose(true)
	        .title('Somerville Film Center')
	        .textContent('Closing to the right!')
	        .ariaLabel('Left to right demo')
	        .ok('Close')
	        // You can specify either sting with query selector
	        .openFrom('#left')
	        // or an element
	        .closeTo(angular.element(document.querySelector('#right')))
	    );
	  };
	});
