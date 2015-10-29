'use strict';

// Declare app level module which depends on filters, and services
angular.module('chetongxiang', [ 'chetongxiang.services-admin', 'ngRoute','ngDialog']).
config(['$routeProvider', function ($routeProvider) {
	/*************
	 *个人中心
	 * 
	 * ***********/
    $routeProvider.when('/order', {
        templateUrl: 'partials/order.html'
       // controller: allianceRegController
    });
    $routeProvider.when('/shoppingCart', {
        templateUrl: 'partials/shoppingCart.html'
       // controller: allianceRegController
    });
    $routeProvider.when('/allianceRegInfo', {
        templateUrl: 'partials/allianceRegInfo.html',
       // controller: allianceRegController
    });
   
    $routeProvider.otherwise({
        redirectTo: '/index'
    });
  }])
  
