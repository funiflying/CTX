'use strict';

// Declare app level module which depends on filters, and services
angular.module('chetongxiang', [ 'chetongxiang.services-admin', 'ngRoute','ngDialog']).
config(['$routeProvider', function ($routeProvider) {
	/*************
	 *个人中心
	 * 
	 * ***********/
   $routeProvider.when('/audit', {
        templateUrl: 'partials/audit.html',
    	controller:auditController
    });
    $routeProvider.when('/releasecar', {
        templateUrl: 'partials/releasecar.html',
        controller:auditController
    })
    $routeProvider.otherwise({
        redirectTo: '/index'
    });
  }])
  
