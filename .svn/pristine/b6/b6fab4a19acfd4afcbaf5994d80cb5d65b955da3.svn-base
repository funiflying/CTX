function loginController($scope,$rootScope,LoginService,$location){
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
	
}


loginController.$inject=["$scope","$rootScope","LoginService","$location"]

function allianceAuditController($scope,ngDialog,AllianceAuditService,$rootScope){
    $scope.member="";
	$scope.openDialog=function(obj){
        $scope.member=obj;
		ngDialog.open({
			template: 'partials/membersInfo.html',
			showClose: true,
			scope:$scope
		});
	}
	AllianceAuditService.getMembers(1,5).success(function(d){
		$scope.alliance=d.jsonstr;
	});
		
    //审核
    //_status=1 通过
    //_status=0 不通过
    $scope.permit=function(_ID,_status){
        var data={
            UserID:_ID,
            AuditStatus:_status
        }
        AllianceAuditService.auditStatus(data).success(function(d){
            
        }).error(function(e){
            $rootScope.Alert(e)
        })
    }
}
allianceAuditController.$inject=["$scope","ngDialog","AllianceAuditService","$rootScope"]
/*
 */



function carAuditControllerfunction($scope,ngDialog,CarAuditService,$rootScope){
    //获取车源
    $scope.carList="";
    CarAuditService.getCarList(1,5).success(function(d){
            if(d.Status==1){
                $scope.carList=d.Data;
            }
        })
    
     //审核
    //_status=1 通过
    //_status=0 不通过
    $scope.permit=function(_ID,_status){
        var data={
            UserID:_ID,
            AuditStatus:_status
        }
        CarAuditService.auditStatus(data).success(function(d){
        }).error(function(e){
            $rootScope.Alert(e)
        })
    }
}
carAuditControllerfunction.$inject=["$scope","ngDialog","CarAuditService","$rootScope"]

















