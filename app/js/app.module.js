var app = angular.module('bbDesign', ['ui.router', 'ngMaterial', 'ngAnimate']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('/', {
				url					: "/",
				templateUrl : 'build/views/home.html'
			})
			.state('clay', {
				url					: "/clay",
				templateUrl : 'build/views/clay.html'
			})

				.state('double_vessel', {
					url					: "/clay/double_vessel",
					templateUrl : 'build/views/pieces/double_vessel.html'
				})
				.state('ice_queen', {
					url					: "/clay/ice_queen",
					templateUrl : 'build/views/pieces/ice_queen.html'
				})
				.state('itself_apart', {
					url					: "/clay/itself_apart",
					templateUrl : 'build/views/pieces/itself_apart.html'
				})
				.state('something_waves', {
					url					: "/clay/something_waves",
					templateUrl : 'build/views/pieces/something_waves.html'
				})
				.state('spiky', {
					url					: "/clay/spiky",
					templateUrl : 'build/views/pieces/spiky.html'
				})
				.state('steady_ripple', {
					url					: "/clay/steady_ripple",
					templateUrl : 'build/views/pieces/steady_ripple.html'
				})
				.state('the_chapel', {
					url					: "/clay/the_chapel",
					templateUrl : 'build/views/pieces/the_chapel.html'
				})
				.state('the_endeavor', {
					url					: "/clay/the_endeavor",
					templateUrl : 'build/views/pieces/the_endeavor.html'
				})
				.state('the_oracle', {
					url					: "/clay/the_oracle",
					templateUrl : 'build/views/pieces/the_oracle.html'
				})
				.state('the_promise', {
					url					: "/clay/the_promise",
					templateUrl : 'build/views/pieces/the_promise.html'
				})
				.state('the_rising', {
					url					: "/clay/the_rising",
					templateUrl : 'build/views/pieces/the_rising.html'
				})
				.state('to_flow', {
					url					: "/clay/to_flow",
					templateUrl : 'build/views/pieces/to_flow.html'
				})
				.state('to_run_through', {
					url					: "/clay/to_run_through",
					templateUrl : 'build/views/pieces/to_run_through.html'
				})
				.state('to_stand_up_on_itself', {
					url					: "/clay/to_stand_up_on_itself",
					templateUrl : 'build/views/pieces/to_stand_up_on_itself.html'
				})
				.state('untitled', {
					url					: "/clay/untitled",
					templateUrl : 'build/views/pieces/untitled.html'
				})

			.state('design', {
				url					: "/design",
				templateUrl : 'build/views/design.html'
			})

				.state('monk', {
					url					: "/design/monk",
					templateUrl : 'build/views/projects/monk.html'
				})
				.state('somerville', {
					url					: "/design/somerville",
					templateUrl : 'build/views/projects/somerville.html'
				})
				.state('tall_room', {
					url					: "/design/tall_room",
					templateUrl : 'build/views/projects/tall_room.html'
				})


			.state('about', {
				url					: "/about",
				templateUrl : 'build/views/about.html'
			})
			.state('press', {
				url					: "/press",
				templateUrl : 'build/views/press.html'
			})
			.state('contact', {
				url					: "/contact",
				templateUrl : 'build/views/contact_1.html'
			});

}]);
