'use strict';

/* Services */

angular.module('chetongxiang.services', []).service("AllianceRegService", function ($http) {
    return {
        Phone: function (_phone) {
            return $http.post('/user/CheckMobile', {
                "Phone": _phone
            });
        },
        getCity: function () {
            return $http.post("/common/getcity", {});
        },
        checkAccout: function (_account) {
            return $http.post("/user/CheckAccount", _account);
        },
        register: function (data) {
            return $http.post("/user/RegisterAlliance", data);
        }

    }
}).service("RegularRegService", function ($http) {
    return {
        getDirect: function () {
            return $http.post("/user/getDirectStuct", {});
        },
        getCity: function () {
            return $http.post("/common/getcity", {});
        },
        register: function (data) {
            return $http.post("/user/RegisterDirect", data);
        }

    }
}).service("LoginService", function ($http) {
    return {
        allianceLogin: function (data) {
            return $http.post("/user/AllianceLogin", data)
        },
        directLogin: function (data) {
            return $http.post("/user/DirectLogin", data)
        }
    }
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
            return $http.post("",data)
        }
    }

})