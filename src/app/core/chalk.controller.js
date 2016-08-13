angular.module('app').controller('ChalkCtrl', ['$scope', '$mdDialog', '$mdMedia', function($scope, $mdDialog, $mdMedia) {

	console.log('Chalk Controller firing!');

	$scope.status = '  ';
	  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

	  $scope.showAdvanced = function(ev) {
	    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: '/build/app/chalk/chalk.modal.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: useFullScreen
	    })
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	    $scope.$watch(function() {
	      return $mdMedia('xs') || $mdMedia('sm');
	    }, function(wantsFullScreen) {
	      $scope.customFullscreen = (wantsFullScreen === true);
	    });
	  };

	  $scope.showPrerenderedDialog = function(ev) {
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: '/build/app/chalk/chalk.modal.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose: true
	    });
	  };

	function DialogController($scope, $mdDialog) {
	  $scope.hide = function() {
	    $mdDialog.hide();
	  };
	  $scope.cancel = function() {
	    $mdDialog.cancel();
	  };
	  $scope.answer = function(answer) {
	    $mdDialog.hide(answer);
	  };
	}

}]);
