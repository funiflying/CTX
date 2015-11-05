'use strict';

// Declare app level module which depends on filters, and services
angular.module('chetongxiang', ['chetongxiang.filters', 'chetongxiang.services-dk', 'chetongxiang.services', 'chetongxiang.directives', 'ngRoute', 'ngDialog']).constant('ACCESS_LEVELS', {
	pub: 0,
	user: 1,
	admin: 2
}).
config(['$routeProvider', 'ACCESS_LEVELS',
	function($routeProvider, ACCESS_LEVELS) {

		$routeProvider.when('/register', {
			templateUrl: 'partials/register.html',
			controller: registerController
		});
		$routeProvider.when('/registerinfo', {
			templateUrl: 'partials/registerinfo.html',
			controller: registerController
		});

		/*************
		 *联盟商注册
		 *
		 */
		$routeProvider.when('/alliancereg', {
			templateUrl: 'partials/alliancereg.html',
			controller: allianceRegController
		});
		/*************
		 *直营商注册
		 *
		 * ***********/

		$routeProvider.when('/directreg', {
			templateUrl: 'partials/directreg.html',
			controller: regularRegController
		});

		$routeProvider.when('/regsuccess', {
			templateUrl: 'partials/regsuccess.html',
			controller: registerController

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
		$routeProvider.when('/addreport', {
			templateUrl: 'partials/add-report.html',
			controller: addReportController
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
		/*
		 * 订单
		 */
		$routeProvider.when('/order/:CarNo/', {
			templateUrl: 'partials/order.html',
			controller: orderController
		});
		$routeProvider.when('/orderremit/:CarNo/', {
			templateUrl: 'partials/orderremit.html',
			controller: orderController
		});
		$routeProvider.otherwise({
			redirectTo: '/index'
		});
	}
]).run(function($rootScope, ngDialog, $timeout, SessionService) {
	$rootScope.allianceMembers = [];
	$rootScope.regularMembers = [];
	$rootScope.regularPartner = [];
	$rootScope.user = JSON.parse(SessionService.getSeesion("_AUTH"));
	$rootScope.reg_phone = "";
	$rootScope.countdown = 5
		//全信息提示层

	//弹出层	
	$rootScope.openModal = function(msg, closecallback) {
		var dialog = ngDialog.open({
			template: '<p style="padding:60px 0; text-align:center">' + msg + '</p>',
			plain: true,
			closeByDocument: true,
			closeByEscape: true
		});
		setTimeout(function() {
			dialog.close();
		}, 2000);
		dialog.closePromise.then(closecallback);
	};
	$rootScope.Message = {
		status: 0,
		msg: ""
	}
	$rootScope.Alert = function(_message) {
			$rootScope.Message.status = 1;
			$rootScope.Message.msg = _message;
			$timeout(function() {
				$rootScope.Message = {
					status: 0,
					msg: ""
				}
			}, 3000)
		}
		//外网登录
	$rootScope.outsiteLogin = function() {
			ngDialog.open({
				template: 'partials/login.html',
				showClose: true,
				controller: loginController
			});
		}
		//联盟商登录
	$rootScope.allianceLogin = function() {
			ngDialog.open({
				template: 'partials/alliancelogin.html',
				showClose: true,
				controller: loginController
			});
		}
		//直营商登录
		/*$rootScope.directLogin = function() {
			ngDialog.open({
				template: 'partials/directlogin.html',
				appendTo: true,
				showClose: true,
				controller: loginController
			});
		}*/
		//退出
	$rootScope.loginOut = function() {
			SessionService.removeSession("_AUTH");
			$rootScope.user = null;
		}
		//路由控制
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
	
	});





















})