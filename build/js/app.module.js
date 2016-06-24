var app = angular.module('app', ['ui.router', 'ngAnimate', 'ngMaterial', 'ngMessages', 'smoothScroll']);

app.config(['$urlRouterProvider', '$stateProvider',
			function($urlRouterProvider, $stateProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('/', {
			url					: "/",
			templateUrl : 'build/views/home/homeView.html'
		})
		.state('clay', {
			url					: "/clay",
			templateUrl : 'build/views/clay/clayMainView.html'
		})
		.state('double_vessel', {
			url					: "/clay/double_vessel",
			templateUrl : 'build/views/clay/pieces/double_vessel_View.html'
		})
		.state('ice_queen', {
			url					: "/clay/ice_queen",
			templateUrl : 'build/views/clay/pieces/ice_queen_View.html'
		})
		.state('itself_apart_together', {
			url					: "/clay/itself_apart_together",
			templateUrl : 'build/views/clay/pieces/itself_apart_together_View.html'
		})
		.state('something_in_the_waves', {
			url					: "/clay/something_in_the_waves",
			templateUrl : 'build/views/clay/pieces/something_in_the_waves_View.html'
		})
		.state('spiky_thing', {
			url					: "/clay/spiky_thing",
			templateUrl : 'build/views/clay/pieces/spiky_thing_View.html'
		})
		.state('steady_ripple', {
			url					: "/clay/steady_ripple",
			templateUrl : 'build/views/clay/pieces/steady_ripple_View.html'
		})
		.state('the_chapel', {
			url					: "/clay/the_chapel",
			templateUrl : 'build/views/clay/pieces/the_chapel_View.html'
		})
		.state('the_endeavor', {
			url					: "/clay/the_endeavor",
			templateUrl : 'build/views/clay/pieces/the_endeavor_View.html'
		})
		.state('the_oracle', {
			url					: "/clay/the_oracle",
			templateUrl : 'build/views/clay/pieces/the_oracle_View.html'
		})
		.state('the_promise', {
			url					: "/clay/the_promise",
			templateUrl : 'build/views/clay/pieces/the_promise_View.html'
		})
		.state('open_mouth', {
			url					: "/clay/open_mouth",
			templateUrl : 'build/views/clay/pieces/open_mouth_View.html'
		})
		.state('to_flow_above', {
			url					: "/clay/to_flow_above",
			templateUrl : 'build/views/clay/pieces/to_flow_above_View.html'
		})
		.state('to_run_through', {
			url					: "/clay/to_run_through",
			templateUrl : 'build/views/clay/pieces/to_run_through_View.html'
		})
		.state('to_stand_up', {
			url					: "/clay/to_stand_up",
			templateUrl : 'build/views/clay/pieces/to_stand_up_View.html'
		})
		.state('untitled_helix', {
			url					: "/clay/untitled_helix",
			templateUrl : 'build/views/clay/pieces/untitled_helix_View.html'
		})
		.state('chalk', {
			url					: "/chalk",
			templateUrl : 'build/views/chalk/chalkMainView.html'
		})
		.state('design', {
			url					: "/design",
			templateUrl : 'build/views/design/designMainView.html'
		})
		.state('summer13', {
			url					: "/design/summer13",
			templateUrl : 'build/views/design/projects/summer_13_View.html'
		})
		.state('fall15', {
			url					: "/design/fall15",
			templateUrl : 'build/views/design/projects/fall_15_View.html'
		})
		.state('spring16', {
			url					: "/design/spring16",
			templateUrl : 'build/views/design/projects/spring_16_View.html'
		})
		.state('about', {
			url					: "/about",
			templateUrl : 'build/views/about/aboutView.html'
		})
		.state('press', {
			url					: "/press",
			templateUrl : 'build/views/press/pressView.html'
		})
		.state('contact', {
			url					: "/contact",
			templateUrl : 'build/views/contact/contactView.html'
		});
}]);
