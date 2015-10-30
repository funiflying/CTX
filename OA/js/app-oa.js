'use strict';

// Declare app level module which depends on filters, and services
angular.module('chetongxiang', [ 'chetongxiang.services-admin', 'ngRoute','ngDialog']).
config(['$routeProvider',function ($routeProvider) {
	/*************
	 *个人中心
	 * 
	 * ***********/
	$routeProvider.when('/login.html', {
    	controller:loginController
    });
    
   $routeProvider.when('/audit', {
        templateUrl: 'partials/audit.html',
    	controller:allianceAuditController
    });
    $routeProvider.when('/releasecar', {
        templateUrl: 'partials/releasecar.html',
        controller:carAuditControllerfunction
    })
    $routeProvider.otherwise({
        redirectTo: '/index'
    });
 }]).run(function($rootScope,$timeout){
  	//全信息提示层
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
  }).controller("loginController",['$scope',"$rootScope","LoginService","$location",function($scope,$rootScope,LoginService,$location){
	$scope.logon = {};
	$scope.directSignin = function() {
		if ($scope.loginForm.$valid) {
			LoginService.directLogin($scope.logon).success(function(d) {
				if (d.Status == 0) {
					$rootScope.Alert(d.Message);
				} else {
					$location.path("/index")
				}
			}).error(function(e) {
				$rootScope.Alert(e);
			})
		}
	}
}])
  
