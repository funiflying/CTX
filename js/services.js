'use strict';

/* Services */

angular.module('chetongxiang.services', []).service("AllianceRegService",function($http){
    return {
        validPhone:function(_phone){
          return $http.get('test/phone.json',{"Phone":_phone});
        },
        getCode:function(_phone){
          return $http.get('test/code.json',{"Phone":_phone});
        },
        sendCode:function(obj){
          return $http.post("http://192.168.0.105/User/register",obj);
        },
        register:function(data){
        	return $http.post("",data);
        }
    
    }
}).service("RegularRegService",function($http){
    return {
        validPhone:function(_phone){
          return $http.get('test/phone.json',{"Phone":_phone});
        },
        getCode:function(_phone){
          return $http.get('test/code.json',{"Phone":_phone});
        },
        sendCode:function(obj){
          return $http.post("http://192.168.0.102/User/register",obj);
        },
        getTree:function(){
        	return $http.get("test/tree.json");
        },
        register:function(data){
        	return $http.post("",data);
        }
    
    }
}).service("LoginService",function($http){
	return {
		login:function(data){
			return $http.post("http://192.168.0.105/",data)
		}
	}
	
})
