'use strict';

// Declare app level module which depends on filters, and services
angular.module('chetongxiang', ['chetongxiang.filters', 'chetongxiang.services-dk', 'chetongxiang.services', 'chetongxiang.directives', 'ngRoute', 'ngDialog']).
config(['$routeProvider',
	function($routeProvider) {
        
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
    
    $rootScope.user={
        name:"",
        contact:""
    }
   
    $rootScope.Alert=function(_msg){
         $rootScope.Message={
             status:0,
             msg:""
         }
        setTimeout(function(){
            $rootScope.Message.status=0;
            $rootScope.msg=_msg;
        },3000)
    
    
    }
	$rootScope.allianceMembers = [];
	$rootScope.regularMembers = [];
	$rootScope.regularPartner = [];

   
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
	$rootScope.directLogin = function() {
		ngDialog.open({
			template: 'partials/directlogin.html',
			appendTo: true,
			showClose: true,
			controller: loginController
		});
	}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
})