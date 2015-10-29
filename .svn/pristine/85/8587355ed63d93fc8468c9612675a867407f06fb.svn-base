'use strict';

// Declare app level module which depends on filters, and services
angular.module('chetongxiang', ['chetongxiang.filters', 'chetongxiang.services-dk', 'chetongxiang.services', 'chetongxiang.directives', 'ngRoute', 'ngDialog']).
config(['$routeProvider',
	function($routeProvider) {
		/*************
		 *联盟商注册
		 *
		 * ***********/
		$routeProvider.when('/allianceReg', {
			templateUrl: 'partials/allianceReg.html',
			controller: allianceRegController
		});
		$routeProvider.when('/allianceRegInfo', {
			templateUrl: 'partials/allianceRegInfo.html',
			controller: allianceRegController
		});
		/*************
		 *直营商注册
		 *
		 * ***********/
		$routeProvider.when('/regularReg', {
			templateUrl: 'partials/regularReg.html',
			controller: regularRegController
		});
		$routeProvider.when('/regularRegInfo', {
			templateUrl: 'partials/regularRegInfo.html',
			controller: regularRegController
		});

		$routeProvider.when('/regSuccess', {
			templateUrl: 'partials/regSuccess.html',
			controller: allianceRegController
		});
		$routeProvider.when('/carlist/:clname/:clvalue', {
			templateUrl: 'partials/carlist.html',
			controller: CarListController,
			action: "carlist.list"
		});
		$routeProvider.when('/carlist', {
			templateUrl: 'partials/carlist.html',
			controller: CarListController,
			action: "carlist.list"
		});
		$routeProvider.when('/carinfo/:CarNo/', {
			templateUrl: 'partials/carinfo.html',
			controller: CarInfoController
		});
		$routeProvider.when('/sellcar', {
			templateUrl: 'partials/sellcar.html',
			controller: SellCarController
		});
		$routeProvider.when('/index', {
			templateUrl: 'partials/index.html',
			controller: IndexController,
			action: "index.default"
		});
		$routeProvider.otherwise({
			redirectTo: '/index'
		});
	}
]).run(function($rootScope, ngDialog) {
	$rootScope.allianceMembers = [];
	$rootScope.regularMembers = [];
	$rootScope.regularPartner = [];
	$rootScope.login = function() {
		ngDialog.open({
			template: 'partials/login.html',
			appendTo: true,
			showClose: true,
			controller: loginController
		});
	}
})