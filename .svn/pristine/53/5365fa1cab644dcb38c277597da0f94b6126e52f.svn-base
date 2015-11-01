'use strict';

function loginController($scope,$rootScope,LoginService,$location){
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
}


// Declare app level module which depends on filters, and services
angular.module('chetongxiang.services-admin', []).service('AllianceAuditService',function($http){
		return {
			getMembers:function(_No,_num){
				return $http.post("/oa/direct/getCurrentDirectAllance",{
                		pageNo:_No,
                		pageNum:_num
                });
			},
            auditStatus:function(data){
                return $http.post("/oa/direct/AuditAllance",data);
            }
		}
}).service('CarAuditService',function($http){
		return {
            getCarList:function(_No,_num){
                return $http.post("/oa/direct/getCurrentDirectCar",{
                		pageNo:_No,
                		pageNum:_num
                });
            },
            auditStatus:function(data){
                return $http.post("/oa/direct/AuditCar",data);
            }
			
		}
}).service("LoginService",function($http){
	return {
        directLogin: function (data) {
            return $http.post("/account/DirectLogin", data)
        }
    }
	
})
  
