function auditController($scope,ngDialog,AuditService){
    $scope.member="";
	$scope.openDialog=function(obj){
        $scope.member=obj;
		ngDialog.open({
			template: 'partials/membersInfo.html',
			showClose: true,
			scope:$scope
		});
	}
	AuditService.getMembers().success(function(d){
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
        AuditService.auditStatus(data).success(function(d){
            
        }).error(function(e){
            $rootScope.Alert(e)
        })
    }

	
}
auditController.$inject=['$scope','ngDialog','AuditService']
