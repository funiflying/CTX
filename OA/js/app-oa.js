'use strict';

// Declare app level module which depends on filters, and services
angular.module('chetongxiang', ['chetongxiang.services-admin', 'ngRoute', 'ngDialog']).
config(['$routeProvider', 'ACCESS_LEVELS', '$httpProvider',
	function($routeProvider, ACCESS_LEVELS, $httpProvider) {
		/*************
		 *个人中心
		 *
		 * ***********/
		
		//联盟商审核
		$routeProvider.when('/audit', {
			templateUrl: 'partials/audit.html',
			controller: allianceAuditController,
			access_levels: ACCESS_LEVELS.user
		});
		//车源发布
		$routeProvider.when('/releasecar', {
			templateUrl: 'partials/releasecar.html',
			controller: carAuditControllerfunction,
			access_levels: ACCESS_LEVELS.user
		});
		//预付款审核
		$routeProvider.when('/advancelist', {
			templateUrl: 'partials/advancelist.html',
			controller: prePayListController,
			access_levels: ACCESS_LEVELS.user
		});
		$routeProvider.when('/advance/:OrderCode/', {
			templateUrl: 'partials/advance.html',
			controller: prePayAuditController,
			access_levels: ACCESS_LEVELS.user
		});
		//全款审核
		$routeProvider.when('/fullpaylist', {
			templateUrl: 'partials/fullpaylist.html',
			controller: fullPayListController,
			access_levels: ACCESS_LEVELS.user
		});
		$routeProvider.when('/fullpay/:OrderCode/', {
			templateUrl: 'partials/fullpay.html',
			controller: fullPayAuditController,
			access_levels: ACCESS_LEVELS.user
		});
		//物流
		$routeProvider.when('/logistics', {
			templateUrl: 'partials/logistics.html',
			controller: logisticsController,
			access_levels: ACCESS_LEVELS.user
		});
		$routeProvider.when('/logisticfees/:OrderCode/', {
			templateUrl: 'partials/logisticfees.html',
			controller: logisticsFeesController,
			access_levels: ACCESS_LEVELS.user
		});
		$routeProvider.when('/deliver/:OrderCode/', {
			templateUrl: 'partials/deliver.html',
			controller: logisticsDeliverController,
			access_levels: ACCESS_LEVELS.user
		});
		$routeProvider.when('/receipt/:OrderCode/', {
			templateUrl: 'partials/receipt.html',
			controller: logisticsReceiptController,
			access_levels: ACCESS_LEVELS.user
		});
		//检测报告
		$routeProvider.when('/assesslist', {
			templateUrl: 'partials/assesslist.html',
			controller: assessListController,
			access_levels: ACCESS_LEVELS.user
		});
		//提车确认
		$routeProvider.when('/takecarlist', {
			templateUrl: 'partials/takecarlist.html',
			controller: takeCarListController,
			access_levels: ACCESS_LEVELS.user
		});
		$routeProvider.when('/takecar/:OrderCode/', {
			templateUrl: 'partials/takecar.html',
			controller: takeCarController,
			access_levels: ACCESS_LEVELS.user
		});
		
		$routeProvider.when('/index', {
			templateUrl: 'partials/index.html',
			controller: mainController,
			access_levels: ACCESS_LEVELS.user
		})
		$routeProvider.otherwise({
			redirectTo: '/index',
			controller: mainController,
			access_levels: ACCESS_LEVELS.user
		});
//		$httpProvider.interceptors.push('UserInterceptor');
	}
]).constant('ACCESS_LEVELS', {
	pub: 0,
	user: 1,
	admin: 2
}).run(function($rootScope, $timeout, AuthService, ngDialog) {
	$rootScope.setUser = function(_user) {
			return $rootScope.user = _user
		}
		//全信息提示层

	$rootScope.openModal = function(msg, closeback) {
		var dialog = ngDialog.open({
			template: '<p style="padding:60px 0; text-align:center">' + msg + '</p>',
			plain: true,
			closeByDocument: true,
			closeByEscape: true
		});
		setTimeout(function() {
			dialog.close();
		}, 2000);
		dialog.closePromise.then(closeback);
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
		//路由控制
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		if (next.access_levels && !AuthService.Authenticated()) {
			/*$rootScope.openModal("对不起，您还未登录。", function() {
			window.location.href="/CTXWeb/OA/login.html"

			})*/
		}
	});
}).controller("loginController", ['$scope', "$rootScope", "LoginService", "$location", 'SessionService',
	function($scope, $rootScope, LoginService, $location, SessionService) {
		$scope.logon = {};
		$scope.directSignin = function() {
			if ($scope.loginForm.$valid) {
				LoginService.directLogin($scope.logon).success(function(d) {
					if (d.status == 0) {
						$rootScope.Alert(d.message);
					} else {
						$rootScope.setUser(d.data)
						SessionService.setSession("AUTH", JSON.stringify(d.data))
						window.location.href = "../OA/#/index"
					}
				}).error(function(e) {
					$rootScope.Alert("登录失败");
				})
			}
		}
	}
])