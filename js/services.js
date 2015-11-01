'use strict';

/* Services */
angular.module("chetongxiang.services",[]).service("AllianceRegService",function($http){
    return{
        Phone:function(_phone){
            return $http("/user/CheckMoblie",{
                "Phone":_phone
            })
        },
        getCity:function(){
            return $http.get("common/City/getcity")
        },
        checkAccout:function(_account){
            return $http.post("/user/CheckAccount",_account);
        },
        register:function(data){
            return $http.post("/account/AlliceRegister",data)
        }
    }
    /*
     *直营商注册
     * */
}).service("RegularRegService", function ($http) {
    return {
        getDirect: function () {
            return $http.post("/oa/Direct/getDirectStuct", {});
        },
        getCity: function () {
            return $http.post("/common/City/getcity", {});
        },
        register: function (data) {
            return $http.post("/account/DirectRegister", data);
        }

    }
    /*
     * 登录
     */
}).service("LoginService", function ($http) {
    return {
        allianceLogin: function (data) {
            return $http.post("/account/AlliceLogin", data)
        },
        outsiteLogin:function(data){
            return $http.post("/account/OutsiteLogin", data)
        },
        loginOut:function(){
            return $http.post("/account/LoginOff", data)
        }
    }
    /*
     *注册
     * */
}).service("RegisterService",function($http){
    return {
        validPhone:function(_phone){
            return $http.post("/user/CheckAccount",{
                Phone:_phone
            })
        },
        getCode:function(_phone){
             return $http.post("",{
                Phone:_phone
            })
        },
        sendCode:function(data){
            return $http.post("",data)
        
        },
        checkAccout: function (_account) {
            return $http.post("/user/CheckAccount", _account);
        },
         register:function(data){
            return $http.post("/account/OutsiteRegister",data)
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
})