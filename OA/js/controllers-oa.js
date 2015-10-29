'use strict'
//联盟商信息审核
function allianceAuditController($scope,ngDialog,AllianceAuditService){
    $scope.member="";
	$scope.openDialog=function(obj){
        $scope.member=obj;
		ngDialog.open({
			template: 'partials/membersInfo.html',
			showClose: true,
			scope:$scope
		});
	}
	AllianceAuditService.getMembers().success(function(d){
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
//allianceAuditController.$inject=['$scope','ngDialog','AllianceAuditService']
//车源审核
function carAuditController($scope,ngDialog,CarAuditService){
    
    //获取车源
    $scope.carList="";
    CarAuditService.getCarList().success(function(d){
            if(d.Status==1){
                $scope.carList=d.Data;
            }
        })

   
}
//carAuditController.$inject=['$scope','ngDialog','CarAuditService']