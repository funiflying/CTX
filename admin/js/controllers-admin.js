
function shoppcarController($scope,ShoppcarService){
    $scope.shoppingList={};
    $scope.selecPrice=0;
    //获取购物车
    ShoppcarService.getShoppcarList().success(function(d){
    	$scope.shoppingList=d.shoppingcart;
    })
    //删除购物车
    $scope.removeShoppcar=function(index){
    	
    	$scope.shoppingList.remove(index)
    }
    //提交购物车
  
    $scope.sendShooppcar=function(_carId){
       ShoppcarService.submitShoppcar(_carId)	
    	
    }
	
	
}

//shoppcarController.$inject=["$scope","ShoppcarService"]
/*
 * 订单管理 
 * */
function orderController($scope,OrderService){
	$scope.orderList={};
	//获取列表、
	OrderService.getOrderList(1,3).success(function(d){
		if(d.Status){
			orderList.d;
		}
	})
	
	
}
