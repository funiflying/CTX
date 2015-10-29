'use strict';

// Declare app level module which depends on filters, and services
angular.module('chetongxiang.services-admin', []).service('AllianceAuditService',function($http){
		return {
			getMembers:function(){
				return $http.get('/test/members.json');
			},
            auditStatus:function(data){
                return $http.post("",data);
            }
			
		}
}).service('CarAuditService',function($http){
		return {
            getCarList:function(){
                return $http.get("/test/releasecar.json");
            },
            auditStatus:function(data){
                return $http.post("",data);
            }
			
		}
})
  
