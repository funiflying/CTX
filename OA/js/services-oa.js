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
		getPrePayAuditList:function(data){
			return $http.post("/Order/GetPrePayOrder",data)
		},
		getPrePayOrder:function(data){
			return $http.post("/Order/GetOrderInfoWithCode",data)
		},
		submitPrePayAudit:function(data){
		return $http.post("/order/PrePayCheck",data);
			
		},
		submitFullPayAudit:function(data){
		return $http.post("/Order/GetOrderInfoWithCode",data);
			
		},
		getFullPayAuditList:function(data){
			return $http.post("/order/SellDirectGetOrderList",data)
		},
		getFullPayOrder:function(data){
			return $http.get("/Order/GetOrderInfoWithCode",data)
		}
		
	}
	
}).service("LogisticService",function($http){
	 return {
	 	getLogistics:function(data){
	 		return $http.post("/order/SellDirectGetThreeStatusOrderList",data);
	 	},
	 	getLogisticOrder:function(data){
	 		return $http.post("/Order/GetOrderInfoWithCode",data);
	 	},
	 	submitLogisticFees:function(data){
	 		return $http.post("/order/FillinShippingFee",data)
	 	},
	 	submitLogisticDeliver:function(data){
	 		return $http.post("/order/ShippingPost ",data)
	 	},
	 	submitLogisticReceipt:function(data){
	 		return $http.post("/order/ShippingGet",data)
	 	}
	 	
	 }
	
}).service("TakeCarService",function($http){
	return {
		getTakeCarList:function(data){
			return $http.post("/order/SellDirectGetOrderList",data)
		},
		getTakeCarOrder:function(data){
			return $http.post("/Order/GetOrderInfoWithCode",data);
		},
		submitTakeCar:function(data){
	 		return $http.post("/order/UserTakeCar",data)
	 	}
	}
	
}).service("AssessService",function($http){
	return{
		getSellAssessList:function(data){
			return $http.post("/order/SellDirectGetOrderList",data);
		},
		getBuyAssessList:function(data){
			return $http.post("/order/BuyDirectGetOrderList",data);
		}
	}
})
