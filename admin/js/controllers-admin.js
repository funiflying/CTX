function shoppcarController($scope, ShoppcarService) {
	$scope.shoppingList = {};
	$scope.selecPrice = 0;
	//获取购物车
	ShoppcarService.getShoppcarList().success(function(d) {
			$scope.shoppingList = d.shoppingcart;
		})
		//删除购物车
	$scope.removeShoppcar = function(index) {

			$scope.shoppingList.remove(index)
		}
		//提交购物车

	$scope.sendShooppcar = function(_carId) {
		ShoppcarService.submitShoppcar(_carId)

	}


}

//shoppcarController.$inject=["$scope","ShoppcarService"]
/*
 * 订单管理
 * */
function orderListController($scope, OrderService, $location, $rootScope) {
	$scope.orderList = {};
	$scope.orderOper = function(_path) {
			$location.path(_path)
		}
		//获取列表、
	OrderService.getOrderList(1, 3).success(function(d) {
			if (d.status) {
				$scope.orderList=d.data;
				$scope.carInfo=d.data[0]
			}
		})
	
	
}
function orderController($scope, OrderService, $location, $rootScope) {
	$scope.carInfo={};
	
	//获取订单
	OrderService.getUserOrder({}).success(function(d) {
			if (d.status) {
				$scope.carInfo=d.data
			}
		})
	
	
	
		//获取汇款识别码
	$scope.getPayCode = function() {


	}

	//提交预付款汇款识别码
	$scope.sendPrePayCode = function() {
		var data = {
			PrepayOrder: $scope.PrepayOrder,
			PrePayMoney: $scope.PrePayMoney,
			PrePayBank: $scope.PrePayBank,
			PrePayTime: $scope.PrePayTime
		}
		if ($scope.advanceForm.$valid) {
			OrderService.UserPrePay(data).success(function(d) {
				if(d.status){
					$rootScope.openModal("预付款汇款单号已提交",function(){
						$location.path("/order");
					});
				}
				else{
					$rootScope.openModal(d.message);
				}

			}).error(function(e) {
				$rootScope.openModal("系统打盹中。。。。。，请联系客服");
			})
		}
	}
	//提交全款汇款识别码
	$scope.sendFullPayCode = function() {
		var data = {
			AllMoneyOrder: $scope.AllMoneyOrder,
			AllMoneyBank: $scope.AllMoneyBank,
			AllMoneyTime: $scope.AllMoneyTime
		}
		if ($scope.advanceForm.$valid) {
			OrderService.UserPrePay(data).success(function(d) {
				if(d.status){
					$rootScope.openModal("汇款单号已提交",function(){
						$location.path("/order");
					});
				}
				else{
					$rootScope.openModal(d.message);
				}
			}).error(function(e) {
				$rootScope.openModal("系统打盹中。。。。。，请联系客服");
				
			})
		}
	}
}