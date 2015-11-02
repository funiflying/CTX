function mainController($scope, AuthService) {
	$scope.loginOut = function() {
		AuthService.Unauthorized();
		window.location.href = "../OA/login.html"
	}

}

mainController.$inject = ["$scope", "AuthService"]

function loginController($scope, $rootScope, LoginService, $location) {
	$scope.logon = {};
	$scope.directSignin = function() {
		if ($scope.loginForm.$valid) {
			LoginService.directLogin($scope.logon).success(function(d) {
				if (d.status == 0) {
					$rootScope.Alert(d.message);
				} else {
					window.location.href = "../OA/#/index"
				}
			}).error(function(e) {
				$rootScope.Alert(e);
			})
		}
	}
}


loginController.$inject = ["$scope", "$rootScope", "LoginService", "$location"]

function allianceAuditController($scope, ngDialog, AllianceAuditService, $rootScope) {
	$scope.member = "";
	$scope.openDialog = function(obj) {
		$scope.member = obj;
		ngDialog.open({
			template: 'partials/membersInfo.html',
			showClose: true,
			scope: $scope
		});
	}
	AllianceAuditService.getMembers(1, 5).success(function(d) {
		$scope.alliance = d.data;
	});

	//审核
	//_status=1 通过
	//_status=0 不通过
	$scope.permit = function(_ID, _status) {
		var data = {
			UserID: _ID,
			AuditStatus: _status
		}
		AllianceAuditService.auditStatus(data).success(function(d) {
			if (d.status) {
				$rootScope.openModal("审核成功");
			} else {
				$rootScope.openModal(d.mesage);
			}
		}).error(function(e) {
			$rootScope.Alert(e)
		})
	}
}
allianceAuditController.$inject = ["$scope", "ngDialog", "AllianceAuditService", "$rootScope"]
	/*
	 */

function carAuditControllerfunction($scope, ngDialog, CarAuditService, $rootScope) {
	//获取车源
	$scope.carList = "";
	CarAuditService.getCarList(1, 5).success(function(d) {
		if (d) {
			$scope.carList = d;
		}
	})

	//审核
	//_status=1 通过
	//_status=0 不通过
	$scope.permit = function(_ID, _status) {
		var data = {
			UserID: _ID,
			AuditStatus: _status
		}
		CarAuditService.auditStatus(data).success(function(d) {
			if (d.status) {
				$rootScope.openModal("审核成功");
			} else {
				$rootScope.openModal(d.mesage);
			}


		}).error(function(e) {
			$rootScope.Alert(e)
		})
	}
}
carAuditControllerfunction.$inject = ["$scope", "ngDialog", "CarAuditService", "$rootScope"]

/*
 * 财务审核
 *
 */

//预付款
function prePayListController($scope, PayAuditService, $rootScope, $routeParams,$location) {
	$scope.prePayList = {};
	PayAuditService.getPrePayAuditList().success(function(d) {
		if (d.status) {
			$scope.prePayList = d.data;
		}
	}).error(function() {
		$rootScope.openModal("系统错误")

	});
	
}

function prePayAuditController($scope, PayAuditService, $rootScope, $routeParams) {
		$scope.prePayOrder = {};
		var data = {
			OrderCode: $routeParams.OrderCode
		}
		PayAuditService.getPrePayOrder(data).success(function(d) {
			if (d.status) {
				$scope.prePayList = d.data;
			}
		}).error(function() {
			$rootScope.openModal("系统错误")
		});
		//提交审核
		$scope.submitPrePayAudit=function(_order,_status){
		  
		  var data={
		  	  OrderCode:_order,
		  	  PrePayCheckMemo:$scope.PrePayCheckMemo
		  	  passorno:_status
		  }
		PayAuditService.submitPrePayAudit(data).success(function(d){
			if(d.status){
				$location.path("/advancelist")
			}
			else{
				$rootScope.openModal(d.message)
			}
		}).error(function() {
			$rootScope.openModal("系统错误")
		})
		
	}
}
	//全款

function fullPayListController($scope, PayAuditService, $rootScope, $routeParams) {
	$scope.fullPayList = {};
	PayAuditService.getFullPayAuditList().success(function(d) {
		if (d.status) {
			$scope.fullPayList = d.data;
		}
	}).error(function() {
		$rootScope.openModal("系统错误")

	})
}

function fullPayAuditController($scope, PayAuditService, $rootScope, $routeParams) {
	$scope.fullPayOrder = {};
	var data = {
		OrderCode: $routeParams.OrderCode
	}
	PayAuditService.getFullPayOrder(data).success(function(d) {
		if (d.status) {
			$scope.fullPayList = d.data;
		}
	}).error(function() {
		$rootScope.openModal("系统错误")
	});
	//提交审核
		$scope.submitFullPayAudit=function(_order,_status){
		  
		  var data={
		  	  OrderCode:_order,
		  	  AllMoneyCheckMemo:$scope.AllMoneyCheckMemo
		  	  passorno:_status
		  }
		PayAuditService.submitFullPayAudit(data).success(function(d){
			if(d.status){
				$location.path("/advancelist")
			}
			else{
				$rootScope.openModal(d.message)
			}
		}).error(function() {
			$rootScope.openModal("系统错误")
		})
		
	}
	
	
	
}