'use strict';

// Declare app level module which depends on filters, and services
angular.module('chetongxiang', [ 'chetongxiang.services-admin', 'ngRoute','ngDialog']).constant('ACCESS_LEVELS', {
    pub: 0,
    user: 1,
    admin: 2
}).config(['$routeProvider','ACCESS_LEVELS', function ($routeProvider,ACCESS_LEVELS) {
	/*************
	 *个人中心
	 * 
	 * ***********/
    $routeProvider.when('/order', {
        templateUrl: 'partials/order.html',
        controller: "",
       access_levels: ACCESS_LEVELS.user
    });
    $routeProvider.when('/shoppingCart', {
        templateUrl: 'partials/shoppingcart.html',
        controller: shoppcarController,
        access_levels: ACCESS_LEVELS.user
    });
    $routeProvider.otherwise({
        redirectTo: '/index',
        access_levels: ACCESS_LEVELS.user
    });
  }]).run(function($rootScope,AuthService){
  		//路由控制
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		if(next.access_levels&&!AuthService.Authenticated()){
			window.location.href="/CTXWeb/index.html"
		}
	});
	
	
	
  	
  })
  
