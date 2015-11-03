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
					window.location.href = "../OA/
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
	AllianceAuditService.getMembers(1, 3).success(function(d) {
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
		
			$scope.carList = d;
		
	})

	//审核
	//_status=1 通过
	//_status=0 不通过
	$scope.permit = function(_CarNo, _status) {
		var data = {
			CarNo: _CarNo,
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
function prePayListController($scope, PayAuditService, $rootScope, $routeParams, $location) {
	$scope.prePayList = {};
	var data={
		pageNo:1,
		pageNum:3
	}
	
	
	PayAuditService.getPrePayAuditList(data).success(function(d) {
		
		if (d.status) {
			$scope.prePayList = d.data.rows;
		}
	}).error(function() {
		$rootScope.openModal("系统错误")

	});

}

function prePayAuditController($scope, PayAuditService, $rootScope, $routeParams,$location) {
		$scope.prePayOrder = {};
		var data = {
			OrderCode: $routeParams.OrderCode
		}
		PayAuditService.getPrePayOrder(data).success(function(d) {
			if (d.status) {
				$scope.prePayList = d.data[0];
			}
		}).error(function() {
			$rootScope.openModal("系统错误")
		});
		//提交审核
		$scope.submitPrePayAudit = function(_order, _status) {

			var data = {
				OrderCode: _order,
				PrePayCheckMemo: $scope.PrePayCheckMemo,
				passorno: _status
			}
			PayAuditService.submitPrePayAudit(data).success(function(d) {
				if (d.status) {
					$location.path("/advancelist")
				} else {
					$rootScope.openModal(d.message)
				}
			}).error(function() {
				$rootScope.openModal("系统错误")
			})

		}
	}
	//全款

function fullPayListController($scope, PayAuditService, $rootScope, $routeParams,$location) {
	$scope.fullPayList = {};

	var data={
		 pageNo:1,
		 pageNum:3
	}
	
	PayAuditService.getFullPayAuditList(data).success(function(d) {
		if (d.status) {
			$scope.fullPayList = d.data;
		}
		else{
					$rootScope.openModal(d.message);
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
			else{
					$rootScope.openModal(d.message);
				}
		}).error(function() {
			$rootScope.openModal("系统错误")
		});
		//提交审核
		$scope.submitFullPayAudit = function( _status) {

			var data = {
				OrderCode: $routeParams.OrderCode,
				AllMoneyCheckMemo: $scope.AllMoneyCheckMemo,
				passorno: _status
			}
			PayAuditService.submitFullPayAudit(data).success(function(d) {
				if (d.status) {
					$location.path("/advancelist")
				} else {
					$rootScope.openModal(d.message)
				}
			}).error(function() {
				$rootScope.openModal("系统错误")
			})

		}

	}
/*************
 * 检测报告
 *
 ************/
function assessListController($scope,$rootScope,AssessService){
	$scope.assesslist={};
	
	AssessService.getAssessList(1,3).success(function(d){
		if(d.status){
			$scope.assesslist=d.data;
			
		}
		else{
			$rootScope.openModal(d.message)
		}
		
	})
	
	
	
	
	
}

	/******************
	 * 物流
	 *
	 *******************/

function logisticsController($scope, $rootScope, LogisticService) {
		$scope.logistics = {};
		LogisticService.getLogistics().success(function(d) {
			if (d.status) {
				$scope.logistics = d.data
			}
			else{
					$rootScope.openModal(d.message);
				}
		})

	}
	//提交物流费

function logisticsFeesController($scope, $rootScope, LogisticService, $routeParams, $location) {
		$scope.logisticOrder = {};
		LogisticService.getLogisticOrder().success(function(d) {
			if (d.status) {
				$scope.logisticOrder = d.data
			}
			else{
					$rootScope.openModal(d.message);
				}
		});
		//提交费用
		$scope.submitLogisticFees = function() {
			if ($scope.logisticsForm.$valid) {
				var data = {

					OrderCode: $routeParams.OrderCode,
					ShippingFee: $scope.ShippingFee,
					SellerFeedback: $scope.SellerFeedback
				}
				LogisticService.submitLogisticFees(data).success(function(d) {
					if (d.status) {
						$rootScope.openModal(d.message, function() {
							$location.path("/logistics")
						})
					} else {
						$rootScope.openModal(d.message)
					}
				})
			}
		};
	}
	//提交物流发车
function logisticsDeliverController($scope, $rootScope, LogisticService, $routeParams, $location) {
	$scope.logisticOrder = {};
	LogisticService.getLogisticOrder().success(function(d) {
		if (d.status) {
			$scope.logisticOrder = d.data
		}
		else{
					$rootScope.openModal(d.message);
				}
	});
	//提交
	$scope.submitLogisticDeliver = function() {
		if ($scope.deliverForm.$valid) {
			var data = {

				OrderCode: $routeParams.OrderCode,
				ShippingCode: $scope.ShippingCode,
				ShippingMemo: $scope.ShippingMemo
			}
			LogisticService.submitLogisticDeliver(data).success(function(d) {
				if (d.status) {
					$rootScope.openModal(d.message, function() {
						$location.path("/logistics")
					})
				} else {
					$rootScope.openModal(d.message)
				}
			})
		}
	};
}
//物流到货
function logisticsReceiptController($scope, $rootScope, LogisticService, $routeParams, $location) {
	$scope.logisticOrder = {};
	LogisticService.getLogisticOrder().success(function(d) {
		if (d.status) {
			$scope.logisticOrder = d.data
		}
		else{
					$rootScope.openModal(d.message);
				}
	});
	//提交
	$scope.submitLogisticReceipt = function() {
		if ($scope.receiptForm.$valid) {
			var data = {

				OrderCode: $routeParams.OrderCode,
				ShippingTime: $scope.ShippingTime,
				ShippingGetMemo: $scope.ShippingGetMemo
			}
			LogisticService.submitLogisticReceipt(data).success(function(d) {
				if (d.status) {
					$rootScope.openModal(d.message, function() {
						$location.path("/logistics")
					})
				} else {
					$rootScope.openModal(d.message)
				}
			})
		}
	};
}
//提车确认
function takeCarListController($scope,$rootScope, TakeCarService, $routeParams, $location){
	$scope.takecarlist = {};
	TakeCarService.getTakeCarList().success(function(d) {
		if (d.status) {
			$scope.takecarlist = d.data
		}
		else{
					$rootScope.openModal(d.message);
				}
	});

}
function takeCarController($scope, $rootScope, TakeCarService, $routeParams, $location) {
	$scope.takecarOrder = {};
	TakeCarService.getTakeCarOrder().success(function(d) {
		if (d.status) {
			$scope.takecarOrder = d.data
		}
		else{
					$rootScope.openModal(d.message);
				}
	});
	//提交
	$scope.submitTakeCar = function() {
		if ($scope.takecarForm.$valid) {
			var data = {

				OrderCode: $routeParams.OrderCode,
				TakeCarTime: $scope.TakeCarTime,
				TakeMemo: $scope.TakeMemo
			}
			TakeCarService.submitTakeCar(data).success(function(d) {
				if (d.status) {
					$rootScope.openModal(d.message, function() {
						$location.path("/takecarlist")
					})
				} else {
					$rootScope.openModal(d.message)
				}
			})
		}
	};
}