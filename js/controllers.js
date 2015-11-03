'use strict';
	/* Controllers */

//ngDialog controller
/********************************
 * ngDialog
 * ******************************/
function ngDialogController($scope, ngDialog, $rootScope, AllianceRegService) {
	//验证用户名
	$scope.checkAccout = function() {
			if ($scope.memberForm.Account.$valid) {
				var  data={
					Account:$scope.Account
				}
				$scope.check = false;
				AllianceRegService.checkAccout(data).success(function(d) {
					if (d.status == 0) {
						$scope.check = true;
					}
				})
			}
		}
		//验证密码强度
	$scope.meter = function() {
			var pwd = $scope.members.Pwd || $scope.partners.Pwd || $scope.Pwd;
			var level = util.Meter.meter(pwd);
			var pwd_box = angular.element("input[name=Pwd]").siblings('p').find('.tui-pwd-box');
			if (pwd == "" || pwd == undefined) {
				pwd_box.siblings().removeClass('tui-pwd-active');
				return;
			}
			switch (level) {
				case 'Weak':
					pwd_box.eq(0).addClass('tui-pwd-active').siblings().removeClass('tui-pwd-active');
					break;
				case 'Medium':
					pwd_box.eq(1).addClass('tui-pwd-active').siblings().removeClass('tui-pwd-active');
					break;
				case 'Strong':
					pwd_box.eq(2).addClass('tui-pwd-active').siblings().removeClass('tui-pwd-active');
					break
				default:
					pwd_box.eq(0).addClass('tui-pwd-active').siblings().removeClass('tui-pwd-active');
					break;
			}
		}
		//密码确认
	$scope.configpwd = function() {
			$scope.configpwdmsg = "";
			if ($scope.Pwd != "" && $scope.ConfigPwd == "") {
				$scope.configpwdmsg = "请确认密码";
			} else if ($scope.ConfigPwd != "" && $scope.ConfigPwd != $scope.Pwd) {
				$scope.configpwdmsg = "密码不一致";
			}
		}
		//员工
	$scope.saveAlliance = function() {
		if ($scope.memberForm.$valid) {
			var o = util.Form.getForm("tui-reg-member-form");
			$rootScope.allianceMembers.push(o);
			ngDialog.close();
		}
	}
	$scope.saveRegular = function() {
			if ($scope.memberForm.$valid) {
				var o = util.Form.getForm("tui-reg-member-form");
				$rootScope.regularMembers.push(o);
				ngDialog.close();
			}
		}
		//股东
	$scope.partners = {};
	$scope.members = {};
	$scope.savePartners = function() {
		if ($scope.partnerForm.$valid) {
			var o = util.Form.getForm("tui-reg-partner-form");
			o.IdentityTag="14";
			o.DirectStockholder_User_UserID = [{
				"EquityRatio": $scope.parnters.EquityRatio,
				"ProfitRatio": $scope.parnters.ProfitRatio,
			}];
			$rootScope.regularMembers.push(o);
			 ngDialog.close();
		}

	}
}
/********************************
 * 外网用户注册
 * ******************************/
function registerController($scope,RegisterService,$rootScope,$location){
    $scope.reg = {};
	$scope.area = ["中国+86", "香港+852", "澳门+853", "台湾+886"];
	$scope.reg.IRC = $scope.area[0];
	$scope.reg.contact = "";
	//国际区号
	$scope.getIRC = function(index) {
			$scope.reg.IRC = $scope.area[index];
			$scope.reg.phone = $scope.reg.IRC.replace(/[^0-9]/ig, "") + $scope.reg.contact + "";
		}
    //验证手机
    $scope.Phone=function(){
        if($scope.telephoneForm.Contact.$valid){
              RegisterService.validPhone($scope.reg.contact).success(function(d) {
					if (d.status == 0) {
						$rootScope.Alert(d.message)
					}
				}).error(function(e) {
					$rootScope.Alert(e)
				});
        
        }
    }
    //获取短信验证码
	var settime = function() {
		var elem = angular.element(".tui-vercode-btn");
		if ($rootScope.countdown == 0) {
			elem.removeAttr("disabled");
			elem.val("免费获取验证码");
			$rootScope.countdown = 5
		} else {
			elem.attr("disabled", true);
			elem.val($rootScope.countdown + "秒后重新发送");
			$rootScope.countdown--;
			setTimeout(settime, 1000)
		}
	}
	$scope.getCode = function() {
			if ($scope.telephoneForm.Contact.$valid) {
				RegisterService.getCode($scope.reg.contact).success(function(d) {
					if (d.status == 1) {
						settime();
						$scope.reg.code = d.Code;
					}
				}).error(function(e) {
					$rootScope.Alert(e);
				});
			}
		}
		//发送验证码
	$scope.sendCode = function() {
			if ($scope.telephoneForm.$valid) {
				var obj = {
					"Phone": $scope.reg.contact,
					"Code": $scope.reg.code
				}
				RegisterService.sendCode(obj).success(function(d) {
						if(d.status==0){
							$rootScope.Alert(d.message)
						}
						else{
							$rootScope.reg_phone=$scope.reg.contact
						}

				}).error(function(e) {
                    
				});
				$location.path('/registerinfo');
			}
		}
    //验证用户名
    
	$scope.checkAccout = function() {
			if ($scope.registerForm.Account.$valid) {
				var  data={
					Account:$scope.Account
				}
                $scope.flg=false;
				RegisterService.checkAccout(data).success(function(d) {
					if (d.status == 0) {
						$scope.flg = true;
					}
				})
			}
		}
		//注册
	$scope.register = function() {
        if ($scope.registerForm.$valid&&!$scope.flg) {
            var data = {
                Account: $scope.Account,
                Pwd: $scope.Pwd,
                Contact:$rootScope.reg_phone
            }
            RegisterService.register(data).success(function(d) {
                if (d.status == 0) {
                    $rootScope.Alert(d.message)
                } else {
                	$rootScope.user={
                		name:d.Message.Account,
                		contact:d.Message.Contact
                	}
                    $location.path('/regsuccess');
                }
            })
        }

	}
}
registerController.$inject=["$scope","RegisterService","$rootScope","$location"]


/********************************
 * 联盟商注册
 * ******************************/

function allianceRegController($scope, AllianceRegService, $timeout, $filter, $location, ngDialog, $rootScope) {

	$scope.CompanyName = "";
	$scope.Charger = "";
	$scope.OrganizationCode = "";
	$scope.BusinessLicenseNo = "";
	$scope.CityID = "";
	$scope.Fax = "";

	//城市
	AllianceRegService.getCity().success(function(d) {
		var tree = d.data;
		var citytree = $('#treeview-city').treeview({
			data: tree,
			onNodeSelected: function(event, node) {
				$scope.CityID = node.CityID;
				angular.element('#city-tree').hide();
			},
		});
		$('#treeview-city').treeview('collapseAll', {
			silent: true
		});
	});

	//弹出层
	$scope.clickToOpen = function() {
		ngDialog.open({
			template: 'partials/allianceMembers.html',
			showClose: true,
			controller: ngDialogController
		});
	};

	//删除member
	$scope.remove = function(index) {
			$rootScope.allianceMembers.remove(index);
		}
		//提交注册资料
	$scope.register = function() {
		$scope.alliance = {
			CompanyName: $scope.CompanyName,
			Charger: $scope.Charger,
			OrganizationCode: $scope.OrganizationCode,
			BusinessLicenseNo: $scope.BusinessLicenseNo,
			CityID: $scope.CityID,
			Fax: $scope.Fax,
			User_Alliance_AllianceCode: $rootScope.allianceMembers
		}
		if ($scope.allianceForm.$valid) {
			var data = $scope.alliance

			AllianceRegService.register(data).success(function(d) {
				if (d.Status == 0) {
					$rootScope.Alert(d.Message);
					$rootScope.user = {
						name: d.Name,
						contact: d.Contact
					}
				} else {
					$location.path('/regsuccess')
				}
			}).error(function(e) {
				$rootScope.Alert(e)
			});
		}
	}
}
allianceRegController.$inject = ["$scope", "AllianceRegService", "$timeout", "$filter", "$location", "ngDialog", '$rootScope'];


/********************************
 * 直营商注册
 * ******************************/

function regularRegController($scope, RegularRegService, $timeout, $filter, $location, ngDialog, $rootScope) {

	$scope.CompanyName = "";
	$scope.Charger = "";
	$scope.CityID = "";
	$scope.BusinessStructID = "";
	$scope.OrganizationCode = "";
	$scope.BusinessLicenseNo = "";
	$scope.Registeroney = "";
	$scope.Telephone = "";
	$scope.Address = "";
	$scope.Fax = "";
	$scope.DirectBusinessID = "";
    $scope.DirectFlag="";

	//组织目录树
	RegularRegService.getDirect().success(function(d) {
		var tree = d;
		var dirtree = $('#treeview-direct').treeview({
			data: tree,
			onNodeSelected: function(event, node) {
				$scope.DirectBusinessID = node.ID;
				angular.element('#direct-tree').hide();
			},
		});
		$('#treeview-direct').treeview('collapseAll', {
			silent: true
		});
	});
	//城市
	RegularRegService.getCity().success(function(d) {
		var tree = d.data;
		var citytree = $('#treeview-city').treeview({
			data: tree,
			onNodeSelected: function(event, node) {
				$scope.CityID = node.CityID;
				angular.element('#city-tree').hide();
			},
		});
		$('#treeview-city').treeview('collapseAll', {
			silent: true
		});
	});
	//弹出层
	$scope.clickToOpen = function() {
		ngDialog.open({
			template: 'partials/regularMembers.html',
			showClose: true,
			controller: ngDialogController
		});
	};

	//删除member
	$scope.remove = function(index) {
		$rootScope.regularMembers.remove(index);
	}
	$scope.removePartner = function(index) {
			$rootScope.regularPartner.remove(index);
		}
		//提交注册资料
	$scope.register = function() {
		$scope.regular = {
			
			Charger: $scope.Charger,
			BusinessStructID: $scope.BusinessStructID,
			OrganizationCode: $scope.OrganizationCode,
			BusinessLicenseNo: $scope.BusinessLicenseNo,
			Fax: $scope.Fax,
			Address: $scope.Address,
			DirectFlag:$scope.DirectFlag,
			Cityid: $scope.CityID,
			Registeroney: $scope.Registeroney,
			CompanyName: $scope.CompanyName,
			DirectBusiness_DirectBusinessStruct_BusinessStructID: {
				ParentID: $scope.DirectBusinessID,
				BusinessStructID: $scope.BusinessStructID
			},
			User_DirectBusiness_DirectCode: $rootScope.regularMembers
		}
		if ($scope.regularForm.$valid) {
			var data = $scope.regular
			RegularRegService.register(data).success(function(d) {
				if (d.status == 0) {
					$rootScope.Alert(d.message)
				} else {
					SessionService.setSession("_AUTH",d.data);
					$rootScope.user=JSON.parse(SessionService.getSeesion("_AUTH"));
					$location.path('/regsuccess');
				}
			}).error(function(e) {
				$rootScope.Alert(e)
			});
		}
	}
}
regularRegController.$inject = ["$scope", "RegularRegService", "$timeout", "$filter", "$location", "ngDialog", '$rootScope'];
/********************************
 *登录
 * ******************************/
function loginController($scope, LoginService, $rootScope, $location,SessionService,ngDialog) {
	$scope.logon = {};
	$scope.allianceSignin = function() {
		if ($scope.loginForm.$valid) {
			LoginService.allianceLogin($scope.logon).success(function(d) {
				if (d.status == 0) {
					$rootScope.Alert(d.message);
				} else {
					SessionService.setSession("_AUTH",d.data);
					$rootScope.user=JSON.parse(SessionService.getSeesion("_AUTH"));
					ngDialog.close();
				}
			}).error(function(e) {
				$rootScope.Alert(e);
			})
		}
	}
    $scope.signin = function() {
		if ($scope.loginForm.$valid) {
			LoginService.outsiteLogin($scope.logon).success(function(d) {
				if (d.status == 0) {
					$rootScope.Alert(d.message);
				} else {
					SessionService.setSession("_AUTH",JSON.stringify(d.data));
					$rootScope.user=JSON.parse(SessionService.getSeesion("_AUTH"));
					ngDialog.close();
				}
			}).error(function(e) {
				$rootScope.Alert(e);
			})
		}
	}
}
loginController.$inject = ['$scope', 'LoginService', '$rootScope', '$location','SessionService','ngDialog'];

/********************************
 *订单		
 * ******************************/

function orderController($scope,OrderService,$rootScope,$routeParams,$location){
	 
	$scope.carNo=$routeParams.CarNo
    $scope.carInfo={};
    var data={
    	CarNo:$scope.carNo
    }
	OrderService.getCarInfo(data).success(function(d){
		  if(d.status){
				$scope.carInfo=d.data[0];
			}
		  else{
		  	  $rootScope.openModal(d.message);
		  }
	})

	$scope.submitOrder=function(_carNo){
		if(!$rootScope.user)
		{
			$rootScope.Alert("您还没有登录，请先登录")
			$rootScope.outsiteLogin();
		}
		else{
			var data={
				CarNo:$scope.carNo
			}
			OrderService.submitOrder(data).success(function(d){
				if(d.status){
					$rootScope.openModal("恭喜，您已成功提交订单",function(){
						$location.path("/orderremit");
					});
				}
				else{
					$rootScope.openModal(d.message);
				}
			}).error(function(){
				$rootScope.openModal("系统打盹中。。。。。，请联系客服");
			})
		}
	}
	
	
}
orderController.$inject=["$scope","OrderService","$rootScope","$routeParams","$location"]
