'use strict';

// Declare app level module which depends on filters, and services
angular.module('chetongxiang.services-admin', []).service("ShoppcarService",function($http){
	return {
		getShoppcarList:function(){
			  return $http.get("../test/shoppingcart.json")
		},
		deleteShoppcar:function(){
			
			
		},
		submitShoppcar:function(_carId){
			return $http.post("",{
					CarNo:_carId
			})
		}
	}
	/*
 *session 操作
 * */
}).service("OrderService",function($http){
	return { 
			getOrderList:function(_pageNo,_pageNum){
				///order/UserGetOrderList
		         return $http.get("../test/orderlist.json",{
		         	pageNo:_pageNo,
		         	pageNum:_pageNum
		         })
			},
			getUserOrder:function(){
				return $http.get("../test/userorder.json")
			},
			UserPrePay:function(data){
				return $http.post("",data)
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
	/*
	 *登录状态
	 * */
}).service("LoginService", function ($http) {
    return {
        loginOut:function(){
            return $http.post("/account/LoginOff",{})
        }
    }
 
}).service("AuthService",function($http,SessionService,LoginService){
	return{
		Authenticated:function(){
			return !!SessionService.getSeesion("_AUTH")
		},
		Unauthorized:function(){
			LoginService.loginOut().success(function(d){
				if(d.Status==1){
					SessionService.removeSession("_AUTH");
				}
			});
			
		}
	}
})
  
