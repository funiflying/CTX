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
        controller: orderListController,
       access_levels: ACCESS_LEVELS.user
    });
    $routeProvider.when('/orderremit', {
			templateUrl: 'partials/orderremit.html',
			controller: orderController,
			access_levels: ACCESS_LEVELS.user
		});
	 $routeProvider.when('/payfull', {
			templateUrl: 'partials/payfull.html',
			controller: orderController,
			access_levels: ACCESS_LEVELS.user
		});
	$routeProvider.when('/fullremit', {
			templateUrl: 'partials/fullremit.html',
			controller: orderController,
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
  }]).run(function($rootScope,AuthService,SessionService,ngDialog){
  	//退出
  		$rootScope.loginOut=function(){
    	SessionService.removeSession("_AUTH");
	    	$rootScope.user=null;
	    	window.location.href="../index.html"
    		}
  	//设置用户
  		$rootScope.user = JSON.parse(SessionService.getSeesion("_AUTH"));
  	//信息提示
  	
  	
  	$rootScope.openModal = function (msg,closeback) {
                var dialog = ngDialog.open({
                    template: '<p style="padding:60px 0; text-align:center">'+msg+'</p>',
                    plain: true,
                    closeByDocument: true,
                    closeByEscape: true
                });
                setTimeout(function () {
                    dialog.close();
                }, 2000);
                dialog.closePromise.then(closeback);
            };

  		//路由控制
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		if(next.access_levels&&!AuthService.Authenticated()){
			window.location.href="../index.html"
		}
	});
	
  })
  
