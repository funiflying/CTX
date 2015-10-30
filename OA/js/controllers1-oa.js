
angular.module('chetongxiang', []).controller("loginController",['$scope',function($scope,$rootScope,LoginService,$location){
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
}).controller("allianceAuditController",function($scope){
	$scope.name="ssss"
	
}])
