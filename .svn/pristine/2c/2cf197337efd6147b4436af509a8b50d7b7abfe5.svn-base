'use strict';

// Declare app level module which depends on filters, and services
angular.module('chetongxiang', [ 'chetongxiang.services-admin', 'ngRoute','ngDialog','ngCookies']).
config(['$routeProvider','ACCESS_LEVELS','$httpProvider',function ($routeProvider,ACCESS_LEVELS,$httpProvider) {
	/*************
	 *个人中心
	 * 
	 * ***********/
   $routeProvider.when('/audit', {
        templateUrl: 'partials/audit.html',
    	controller:allianceAuditController,
    	access_levels: ACCESS_LEVELS.user
    });
    $routeProvider.when('/releasecar', {
        templateUrl: 'partials/releasecar.html',
        controller:carAuditControllerfunction,
        access_levels: ACCESS_LEVELS.user
    })
    $routeProvider.otherwise({
        redirectTo: '/index',
        controller:mainController,
        access_levels: ACCESS_LEVELS.user
    });
    $httpProvider.interceptors.push('UserInterceptor');
 }]).constant('ACCESS_LEVELS', {
    pub: 0,
    user: 1,
    admin: 2
}).run(function($rootScope,$timeout,AuthService){
	$rootScope.setUser=function(_user){
	  return $rootScope.user=_user
	}
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
	//路由控制
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		if(next.access_levels&&!AuthService.Authenticated()){
			window.location.href="/CTXWeb/OA/login.html"
		}
	});
  }).factory('UserInterceptor', ["$q","$rootScope",function ($q,$rootScope) {
	return {
        /*request:function(config){
            
            return config;
        },
        requestError:function(request){
            console.log(request)
        },
       response:function(response){
        	console.log(response)
        	
        },
        responseError: function (response) {
        	console.log(response)
        }*/
    }
}]).controller("loginController",['$scope',"$rootScope","LoginService","$location",'SessionService',function($scope,$rootScope,LoginService,$location,SessionService){
	$scope.logon = {};
	$scope.directSignin = function() {
		if ($scope.loginForm.$valid) {
			LoginService.directLogin($scope.logon).success(function(d) {
				if (d.Status == 0) {
					$rootScope.Alert(d.Message);
				} else {
					$rootScope.setUser(d)
					SessionService.setSession("AUTH",d)
					window.location.href="/CTXWeb/OA/#/index"
				}
			}).error(function(e) {
				$rootScope.Alert("登录失败");
			})
		}
	}
}])
  
