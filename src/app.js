(function (){

	$(document).ready(function (){
		angular.bootstrap(document, ['surgeApp']);
	});

	angular
		.module('surgeApp', [
			'ngRoute'
		])
		.controller('surge', surgeController)
		.factory('surgeVm', surgeVmFactory)
		.directive('body', bodyDirective)
		.filter('isSet', isSetFilter)
		.filter('trim', trimFilter)
		.run(onRun)
		.config(onBeforeRun);


	var EmptyString = '',
		Pattern = {
			trim: /^\s+|\s+$/g
		};

	function surgeController ($scope, surgeVm){
		$scope.surgeVm = surgeVm;
	}

	function surgeVmFactory (){
		var surgeVm = {

		};
		activate();
		return surgeVm;

		function activate (){
		}
	}

	function bodyDirective (){
		return {
			restrict: 'E',
			controller: 'surge'
		};
	}

	function isSetFilter (){
		return isSet;
	}

	function trimFilter (){
		return trim;
	}

	function onRun (){

	}

	function onBeforeRun ($locationProvider, $compileProvider, $routeProvider){
		$locationProvider.html5Mode(true);
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|chrome[^:]*):/);
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|chrome[^:]*):|data:image\/)/);
		$routeProvider.otherwise({
			redirectTo: '/'
		});
		$routeProvider.when('/', {
			caseInsensitiveMatch: true,
			templateUrl: 'html/surge.html'
		});
	}

	function isSet (value){
		if(value === null)
			return false;
		var type = typeof value;
		if(type === 'undefined')
			return false;
		if(type === 'number')
			return isFinite(value);
		return true;
	}

	function trim (value){
		if(isSet(value)){
			return String(value).replace(Pattern.trim, EmptyString);
		}
		return EmptyString;
	}


}());