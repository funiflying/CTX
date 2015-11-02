'use strict';

// Declare app level module which depends on filters, and services
angular.module('chetongxiang.services-admin', []).service('AllianceAuditService', function($http) {
	return {
		getMembers: function(_No, _num) {
			return $http.post("/oa/direct/getCurrentDirectAllance", {
				pageNo: _No,
				pageNum: _num
			});
		},
		auditStatus: function(data) {
			return $http.post("/oa/direct/AuditAllance", data);
		}
	}
}).service('CarAuditService', function($http) {
	return {
		getCarList: function(_No, _num) {
			return $http.post("/oa/direct/getCurrentDirectCar", {
				pageNo: _No,
				pageNum: _num
			});
		},
		auditStatus: function(data) {
			return $http.post("/oa/direct/AuditCar", data);
		}

	}
}).service("LoginService", function($http) {
	return {
		directLogin: function(data) {
			return $http.post("/account/DirectLogin", data)
		},
		loginOut:function(){
            return $http.post("/account/LoginOff", {})
        }
	}

}).service("SessionService",function(){
	return {
        getSeesion: function (key) {
            return sessionStorage.getItem(key);
        },
        setSession: function (key, value) {
            return sessionStorage.setItem(key, value);
        },
        removeSession: function (key) {
            return sessionStorage.removeItem(key)
        }
    }
	
}).service("AuthService",function($http,SessionService,LoginService){
	return{
		Authenticated:function(){
			return !!SessionService.getSeesion("AUTH")
		},
		Unauthorized:function(){
			LoginService.loginOut();
			SessionService.removeSession("AUTH")
		}
	}
	
}).service("PayAuditService",function($http){
	return{
		getPrePayAuditList:function(){
			return $http.get("../test/orderlist.json")
		},
		getPrePayOrder:function(data){
			return $http.get("../test/advance.json",data)
		},
		submitPrePayAudit:function(data){
		return $http.post("",data);
			
		},
		submitFullPayAudit:function(data){
		return $http.post("",data);
			
		},
		getFullPayAuditList:function(){
			return $http.get("../test/orderlist.json")
		},
		getFullPayOrder:function(data){
			return $http.get("../test/advance.json",data)
		},
		submitFullPay:function(data){
		return $http.post("",data);
			
		}
		
		
		
	}
	
	
})
