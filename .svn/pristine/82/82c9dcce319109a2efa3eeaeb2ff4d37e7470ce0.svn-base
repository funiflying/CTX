'use strict';

/*
 *版本：1.0
 *文件：Controllers
 *作者：dekent
 *时间：2015-10-22
 */


// 定义我们的根控制器

//车源信息发布
function AppController($scope, $route, $routeParams) {
	// 更新页面的渲染方式
	render = function() {

		// 取得当前所选路由的action值
		var renderAction = $route.current.action;

		// 接着，让我们修改renderPath变量，来使它更新到页面的相应位置。
		var renderPath = renderAction.split(".");

		// 从params中获得username变量
		// 注意：对于除了“contact”路由之外的任何路由，这个值都会是undefined。此处为了简化演示，我不对此做任何防御性编程。
		var username = ($routeParams.username || "");

		// 重置用于控制导航栏中css类的各个逻辑变量
		var isIndex = (renderPath[0] == "index");
		var isCarlist = (renderPath[0] == "carlist");
		var isCarinfo = (renderPath[0] == "carinfo");

		// 把这些变量保存到model（即$scope）中
		$scope.renderAction = renderAction;
		$scope.renderPath = renderPath;
		$scope.username = username;
		$scope.isIndex = isIndex;
		$scope.isCarlist = isCarlist;
		$scope.isCarinfo = isCarinfo;
	};

	// 开始监听“路由变化”事件，我们修改renderAction变量，以便它显示在Strong元素中
	$scope.$on(
		"$routeChangeSuccess",
		function($currentRoute, $previousRoute) {
			// 刷新显示内容
			render();
		}
	);
}
AppController.$inject = ["$scope", "$route", "$routeParams"];

//首页所有品牌信息
function IndexController($scope, CTXService, $timeout, $filter, $location, ngDialog) {
	//关键词搜索
	$scope.submit = function() {
		console.log($scope.carfilter);
		$location.path('/carlist/SearchWord/' + $scope.carfilter.SearchWord);
	}

	$scope.BrandList = function() {
		if (true) {
			CTXService.Getbrandlist().success(
				function(d) {
					//$scope.brandslist = d.data;
					//$(".sx-pinpai").addClass("active");
					//$("#AllBrand").show();
					//					var ABC = {
					//						"A": "",
					//						"B": "",
					//						"C": "",
					//						"D": "",
					//						"E": "",
					//						"F": "",
					//						"G": "",
					//						"H": "",
					//						"I": "",
					//						"J": "",
					//						"K": "",
					//						"L": "",
					//						"M": "",
					//						"N": "",
					//						"O": "",
					//						"P": "",
					//						"Q": "",
					//						"R": "",
					//						"S": "",
					//						"T": "",
					//						"U": "",
					//						"V": "",
					//						"W": "",
					//						"X": "",
					//						"Y": "",
					//						"Z": ""
					//					};
					//					var ABCData = ABC;
					//					var txt = "";
					//					var bl = d.data;
					//					for (var i = 0; i < bl.length; i++) {
					//
					//						for (var key in ABC) {
					//							if (bl[i].AbcOrder == key) {
					//								if (bl[i].brandName != null) {
					//									ABCData[key] = ABCData[key] + "<a href=\"#/carlist/brandID/" + bl[i].brandID + "\">" + bl[i].brandName + "</a>";
					//								}
					//							}
					//						}
					//					}
					//$scope.ABCBrand = ABCData;
					//console.log(ABCData);

					$(".sx-pinpai").hover(
						function() {
							$(this).addClass("active");
							$("#AllBrand").show();
						},
						function() {
							$(this).removeClass("active");
							$("#AllBrand").hide();
						}
					);

				}).error(
				function(e) {
					//alert("品牌数据读取错误");
					console.log("品牌数据读取错误");
					$("#AllBrand").hide();
				});

		}
	}

	$scope.GetIndexHot = function() {
		var obj = {
			"City": ""
		}
		CTXService.GetIndexHot(obj).success(function(carlist) {
			//console.log(carlist);
			var listhtml = "";
			var titlehtml = "";
			for (var i = 0, ln = carlist.data.length; i < ln; i++) {
				var tabname = carlist.data[i].name;
				var tabname1 = {
					'Carsource0': '最新上架',
					'Carsource1': '降价急售',
					'Carsource2': '准新车',
					'Carsource3': '练手车',
					'Carsource4': 'SUV',
					'Carsource5': '女车主'
				}[tabname] || '';
				titlehtml += "<a href=\"javascript:;\" data-name=\"" + tabname + "\">" + tabname1 + "</a>";
				//titlehtml += "<li data-name=\"" + tabname + "\">" + tabname1 + "</li>";
				if (carlist.data[i].name == "Carsource0") {
					listhtml += "<ul class=\"list-ul\" data-name=\"" + carlist.data[i].name + "\">";
				} else {
					listhtml += "<ul class=\"list-ul\" style=\"display:none;\" data-name=\"" + carlist.data[i].name + "\">";
				}
				for (var j = 0, jln = carlist.data[i].value.length; j < jln; j++) {
					if (carlist.data[i].value[j].HomePicID == "") {
						//listhtml += "<li><a href=\"#\"><img src=\""+carlist.data[i].value[0].HomePicID+"\"></a>";
						listhtml += "<li><a href=\"#/carinfo/" + carlist.data[i].value[j].CarNo + "/\"><img src=\"images/default.jpg\"></a>";
					} else {
						listhtml += "<li><a href=\"#/carinfo/" + carlist.data[i].value[j].CarNo + "/\"><img src=\"images/default.jpg\"></a>";
					}
					listhtml += "<p class=\"title\"><a href=\"#/carinfo/" + carlist.data[i].value[j].CarNo + "/\">" + carlist.data[i].value[j].SpecName + "</a></p>";
					listhtml += "<p><span>" + carlist.data[i].value[j].InitialDate + "上牌</span><span>|</span>行驶" + carlist.data[i].value[j].Mileage + "万公里</p>";
					listhtml += "<p class=\"price\"><span>￥" + carlist.data[i].value[j].Price + "万</span></p>";
					listhtml += "</li>";
					//console.log(listhtml);
				}
				listhtml += "</ul>";
			}
			//console.log(titlehtml);
			$("#tabcarlist a").remove();
			$("#carlist ul").remove();
			$("#tabcarlist").html(titlehtml);
			$("#carlist").html(listhtml);

			$(document).on("mouseover", "#tabcarlist a", function() {
				$(this).addClass('on').siblings().removeClass('on');
				var index = $(this).index();
				var number = index;
				$('#tabmain #carlist ul').hide();
				$('#tabmain #carlist ul:eq(' + index + ')').show();
				//console.log(index);
			});
			$(document).on("mouseover", "#tabcarlist a", function() {
				$(this).addClass('on').siblings().removeClass('on');
				var index = $(this).index();
				var number = index;
				$('#tabmain #carlist ul').hide();
				$('#tabmain #carlist ul:eq(' + index + ')').show();
				//console.log(index);
			});

		}).error(function(e) {
			alert(e);
		});
		//$location.path('/index');
	}
}

IndexController.$inject = ["$scope", "CTXService", "$timeout", "$filter", "$location", "ngDialog"];

//车源信息发布
function SellCarController($scope, CTXService, $timeout, $filter, $location, ngDialog) {

	//获取汽车所有品牌
	$scope.BrandList = function() {
		if (true) {
			CTXService.Getbrandlist().success(
				function(d) {
					$scope.brandslist = d.data;
					$("#ChangeBrand").show();
					//					ngDialog.open({
					//					    		template: 'partials/publish-car-brandlist.html',
					//					    		scope:$scope
					//					    	})
				}).error(
				function(e) {
					alert("品牌数据读取错误");
				});
		}
	}

	//选择汽车颜色
	$scope.ChangeCarColor = function() {
		$(".d-color-change > a").click(function() {
			var index = $(this).index();
			$('.d-color-change > a .d-color-check').hide();
			$('.d-color-change > a .d-color-check:eq(' + index + ')').show();
			$('.d-color-change > a').removeClass("cborder");
			$('.d-color-change > a:eq(' + index + ')').addClass("cborder");
			$('input[name=color]').val($(this).attr("data-value"));
		});

		$(".d-multiple-change > a").click(function() {
			var index = $(this).index();
			$('.d-multiple-change > a .d-color-check').hide();
			$('.d-multiple-change > a .d-color-check:eq(' + index + ')').show();
			$('.d-multiple-change > a').removeClass("cborder");
			$('.d-multiple-change > a:eq(' + index + ')').addClass("cborder");
			$('input[name=TeDian]').val($(this).attr("data-value"));
		});
	}
	
	//$scope.SellCarSubmit = function(){
		$('#sellcarform').submit(function(){
			console.log($(this).serialize());
		
			$.ajax({
				type: "POST",
				url: "http://192.168.0.105/common/car/Publish",
				async: false,
				data: $(this).serialize(),
				dataType: "json",
				beforeSend:function() {
					
//					$scope.errorMessage = "请稍后，您的车辆信息提交中...";
//					
//					ngDialog.open({
//						template: 'partials/DialogMessage.html',
//						appendTo: true,
//						showClose: true,
//						scope:$scope
//					});
				},
				success: function(ret) {
					//ngDialog.closeAll();
					console.log(ret);
					
					$scope.errorMessage = "您的车辆信息发布成功，稍后我们的人员会与您联系！";
					
					ngDialog.open({
						template: 'partials/DialogMessage.html',
						appendTo: true,
						showClose: false,
						scope:$scope
					});
					$location.path('/carlist');
				}
			});
			return false; 
		});

	//}
	
//	$('#sellcarform').submit(function(){
//		
//	});

}
SellCarController.$inject = ["$scope", "CTXService", "$timeout", "$filter", "$location", "ngDialog"];


//汽车列表
function CarListController($scope, CTXService, $timeout, $filter, $routeParams, $location, ngDialog) {
	//var _CTXCarList = _CTXCarList || [];
	//$scope.carfilter

	//	var add_step = $routeParams.clname;
	//	var add_level={"brandID":$routeParams.clvalue}[$routeParams.clname] || 0;
	//	console.log($scope.carfilter);

	$scope.carfilter = {
		"City": {
			"City": $routeParams.clvalue
		}[$routeParams.clname] || "xm",
		"brandID": {
			"brandID": $routeParams.clvalue
		}[$routeParams.clname] || "6",
		"Series": {
			"Series": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"PriceID": {
			"PriceID": $routeParams.clvalue
		}[$routeParams.clname] || "1",
		"PriceStart": {
			"PriceStart": $routeParams.clvalue
		}[$routeParams.clname] || "",
		"PriceEnd": {
			"PriceEnd": $routeParams.clvalue
		}[$routeParams.clname] || "",
		"CarYear": {
			"CarYear": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"Style": {
			"Style": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"Mileage": {
			"Mileage": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"GearBox": {
			"GearBox": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"OutputVolume": {
			"OutputVolume": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"DischargeStandard": {
			"DischargeStandard": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"Color": {
			"Color": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"Country": {
			"Country": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"IsUrgent":{
			"IsUrgent": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"IsUrgent":{
			"IsUrgent": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"QuasiNewCar":{
			"QuasiNewCar": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"WomenCar":{
			"WomenCar": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"SevenSeat":{
			"SevenSeat": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"Sort":{
			"Sort": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		
		"SearchWord": {
			"SearchWord": $routeParams.clvalue
		}[$routeParams.clname] || "",
		"PageNo": {
			"PageNo": $routeParams.clvalue
		}[$routeParams.clname] || "1"
	};

	//console.log($scope.carfilter);
	//console.log($routeParams);


	CTXService.Getbrandlist().success(
		function(d) {
			$scope.brandslist = d.data;

			//console.log($scope.brandslist);

			var listhtml = "";
			var titlehtml = "";

			//关键词搜索
			$scope.submit = function() {
				$scope.carfilter = {
					"City": "",
					"brandID": "0",
					"Series": "0",
					"PriceID": "0",
					"CarYear": "0",
					"Style": "0",
					"Mileage": "0",
					"GearBox": "0",
					"OutputVolume": "0",
					"DischargeStandard": "0",
					"Color": "0",
					"Country": "0",
					"PageNum": "1"
				};

				$scope.loadbrand();
				$scope.loadcarlist();
				return true;
			}

			//跳转页面
			$scope.gotopage = function(num) {
				//this.Attr("data-page");
				$scope.carfilter.PageNum = num;
				//console.log(num);
				$scope.loadbrand();
				//$location.path('/carlist');
				return true;
			}

			$scope.loadbrand = function(bid) {
				var brandhtml = "";
				var allbrandhtml = "";
				var chexihtml = "";
				var outbrandhtml = "";

				chexihtml = $("#data-chexilist").html();
				for (var j = 0, jln = $scope.brandslist.length; j < jln; j++) {
					if (j == 0) {
						if ($scope.carfilter.brandID == null || $scope.carfilter.brandID == "0") {
							if (j < 14) {
								brandhtml = " <a href=\"javascript:;\" data-value=\"0\" class=\"on\">不限</a> ";
							}
							allbrandhtml = " <a href=\"javascript:;\" data-value=\"0\" class=\"on\">不限</a> ";
						} else {
							if (j < 14) {
								brandhtml = " <a href=\"javascript:;\" data-value=\"0\">不限</a> ";
							}
							allbrandhtml = " <a href=\"javascript:;\" data-value=\"0\">不限</a> ";
						}
					}
					if ($scope.carfilter.brandID == $scope.brandslist[j].brandID) {
						chexihtml = "";
						if (j < 14) {
							brandhtml += "<a class=\"on\" href=\"javascript:;\" data-value=\"" + $scope.brandslist[j].brandID + "\">" + $scope.brandslist[j].brandName + "</a>";
						}else{
							outbrandhtml = "<a class=\"on\" href=\"javascript:;\" data-value=\"" + $scope.brandslist[j].brandID + "\">" + $scope.brandslist[j].brandName + "</a>";
						}
						allbrandhtml += "<a class=\"on\" href=\"javascript:;\" data-value=\"" + $scope.brandslist[j].brandID + "\">" + $scope.brandslist[j].brandName + "</a>";
						for (var k = 0, kn = $scope.brandslist[j].chexi.length; k < kn; k++) {
							if (k == 0) {
								if ($scope.carfilter.Series == null || $scope.carfilter.Series == "0") {
									chexihtml += " <a href=\"javascript:;\" data-value=\"0\" class=\"on\">不限</a> ";
								} else {
									chexihtml += " <a href=\"javascript:;\" data-value=\"0\" >不限</a> ";
								}
							}
							if ($scope.carfilter.Series == $scope.brandslist[j].chexi[k].SeriesID) {
								chexihtml += "<a class=\"on\" href=\"javascript:;\" data-brand=\"" + $scope.brandslist[j].brandID + "\" data-value=\"" + $scope.brandslist[j].chexi[k].SeriesID + "\">" + $scope.brandslist[j].chexi[k].SeriesName + "</a>";
							} else {
								chexihtml += "<a href=\"javascript:;\" data-brand=\"" + $scope.brandslist[j].brandID + "\" data-value=\"" + $scope.brandslist[j].chexi[k].SeriesID + "\">" + $scope.brandslist[j].chexi[k].SeriesName + "</a>";
							}
						}
					} else {
						if (j < 14) {
							brandhtml += "<a href=\"javascript:;\" data-value=\"" + $scope.brandslist[j].brandID + "\">" + $scope.brandslist[j].brandName + "</a>";
						}
						allbrandhtml += "<a href=\"javascript:;\" data-value=\"" + $scope.brandslist[j].brandID + "\">" + $scope.brandslist[j].brandName + "</a>";
					}
				}

				$("#data-brandID").html(brandhtml + outbrandhtml + "<span class=\"brand-all\" id=\"AllBrandOpen\"><em>全部<i></i></em></span>");
				$("#data-chexilist").html(chexihtml);
			}
			
			//价格段筛选
			$scope.priceSE = function() {
				var g_price_s = $("#m_price_s").val(), g_price_e = $("#m_price_e").val();
				$scope.carfilter.PriceStart = g_price_s;
				$scope.carfilter.PriceEnd   = g_price_e;
					
				if ((g_price_s !="") && (g_price_e !="")) {
					$scope.loadbrand();
				} else{
					$scope.errorMessage = "填写价格段有误，请确认是否为数字，并且在0到999之间";
					
					ngDialog.open({
						template: 'partials/DialogMessage.html',
						appendTo: true,
						showClose: true,
						scope:$scope
					});
				}	
			}

			$(document).on("click", "#data-brandID > a", function() {
				$(this).addClass('on').siblings().removeClass('on');
				$scope.carfilter.brandID = $(this).attr("data-value");
				$scope.carfilter.Series = "0";
				console.log($scope.carfilter);
				$scope.loadbrand();
				$scope.loadcarlist();
			});
			$(document).on("click", "#data-chexilist > a", function() {
				$(this).addClass('on').siblings().removeClass('on');
				$scope.carfilter.Series = $(this).attr("data-value");
				//$scope.carfilter.brandID = $(this).attr("data-brand");
				$scope.loadbrand();
				//loadcarlist(Sdata);
				$scope.loadcarlist();
				console.log($scope.carfilter);
			});
			$(document).on("click", "#data-pricelist > a", function() {
				$(this).addClass('on').siblings().removeClass('on');
				$scope.carfilter.PriceID = $(this).attr("data-value");
				//$scope.loadbrand();
				//console.log(Sdata);
				//loadcarlist(Sdata);
				$scope.loadcarlist();
			});
			$(document).on("click", "#data-caryearlist > a", function() {
				$(this).addClass('on').siblings().removeClass('on');
				$scope.carfilter.CarYear = $(this).attr("data-value");
				//$scope.loadbrand();
				//console.log(Sdata);
				//loadcarlist(Sdata);
				$scope.loadcarlist();
			});

			$("#chexing dd").hover(function() { //定义一个hover方法。 
					$(this).find(".more-btn").addClass("active");
					$(this).find(".more-box").show();
				},
				function() {
					$(this).find(".more-btn").removeClass("active");
					$(this).find(".more-box").hide();
				});

			$(document).on("click", ".more-box a", function() {

				$scope.carfilter[$(this).parent().attr("data-name")] = $(this).attr("data-value");
				console.log($scope.carfilter);
				$(this).parent().parent().parent().parent().find(".more-btn").html("<a href='javascript:;'>" + $(this).html() + "</a>");
				$scope.loadcarlist();
				//$scope.loadbrand();
				//$(this).parent(".moreitem-opts").parent(".more-in-wrap").find(".more-btn").html($(this));
			});
			
			//急售等多选过滤
			$(document).on("click", "#ChangeIsUrgent", function() {
				$scope.carfilter.IsUrgent = $(this).attr("data-value");
				//console.log($scope.carfilter.IsUrgent);
				$(this).attr("data-value",{"1":"0"}[$(this).attr("data-value")]||"1");
				$scope.loadcarlist();
			});
			$(document).on("click", "#ChangeNewCar", function() {
				$scope.carfilter.QuasiNewCar = $(this).attr("data-value");
				$(this).attr("data-value",{"0":"1"}[$(this).attr("data-value")]||"1");
				//console.log($scope.carfilter.QuasiNewCar);
				$scope.loadcarlist();
			});
			$(document).on("click", "#ChangeWomenCar", function() {
				$scope.carfilter.WomenCar = $(this).attr("data-value");
				$(this).attr("data-value",{"0":"1"}[$(this).attr("data-value")]||"1");
				//console.log($scope.carfilter.WomenCar);
				$scope.loadcarlist();
			});
			$(document).on("click", "#ChangeSevenSeat", function() {
				$scope.carfilter.SevenSeat = $(this).attr("data-value");
				$(this).attr("data-value",{"0":"1"}[$(this).attr("data-value")]||"1");
				//console.log($scope.carfilter.SevenSeat);
				$scope.loadcarlist();
			});
			
			//排序选择
			$(document).on("click", "#ChangeSort > a", function() {
				var dv,datavalue = $(this).attr("data-value");
				dv = {"0":"0","-1":"1","1":"-1","-2":"2","2":"-2","-3":"3","3":"-3"}[datavalue]||"0";
				$(this).attr("data-value",dv);
				$(this).addClass('Sort_on').siblings().removeClass('Sort_on');
				console.log(datavalue);
				console.log(dv);
				$scope.carfilter.Sort = datavalue;
				$scope.loadcarlist();
			});
			
			//全部品牌显示
			$(document).on("mouseover", "#AllBrandOpen", function() {
				$("#AllBrandShow").show();
			});
			$(document).on("mouseleave", "#AllBrandShow", function() {
				$("#AllBrandShow").hide();
			});

			$scope.loadcarlist = function() {
				listhtml = "";
				$("#carlist ul").remove();
				//$("#carlist").fadeOut();
				$.ajax({
					type: "POST",
					//url: "http://192.168.0.198/CarSource/RequestHomeData",
					url: "http://ctx/SearchCar.php",
					async: false,
					data: $scope.carfilter,
					dataType: "jsonp",
					beforeSend:function() {
						$("#carlist").html("请稍后，数据加载中...");
					},
					success: function(carlist) {
						listhtml += "<ul class=\"list-ul\">";
						for (var j = 0, jln = carlist.data[0].value.length; j < jln; j++) {
							//console.log(carlist.data[0].value.length);
							listhtml += "<li><a href=\"#/carinfo/" + carlist.data[0].value[j].CarNo + "\" data-value=\"" + carlist.data[0].value[j].CarNo + "\"><img src=\"" + carlist.data[0].value[j].HomePicID + "\"></a>";
							listhtml += "<p class=\"title\"><a href=\"#/carinfo/" + carlist.data[0].value[j].CarNo + "\" data-value=\"" + carlist.data[0].value[j].CarNo + "\">" + carlist.data[0].value[j].SpecName + "</a></p>";
							listhtml += "<p><span>" + carlist.data[0].value[j].InitialDate + "上牌</span><span>|</span>行驶" + carlist.data[0].value[j].Mileage + "万公里</p>";
							listhtml += "<p class=\"price\"><span>￥" + carlist.data[0].value[j].Price + "万</span></p>";
							listhtml += "</li>";
						}
						listhtml += "</ul>";
						//$("#carlist").fadeIn(1000);
						$("#carlist").html(listhtml);
					}
				});
			}
			
			//初始化加载默认车源及品牌信息
			$scope.loadbrand();
			$scope.loadcarlist();
		}).error(
		function(e) {
			alert("品牌数据读取错误");
		});

//	//关键词搜索
//	$scope.AllBrandOpen = function() {
//		$("#AllBrandOpen").hover(function() { //定义一个hover方法。 
//				$("#AllBrandShow").addClass("active");
//				//$("#AllBrandShow").show();
//			},
//			function() {
//				$(this).find("#AllBrandShow").removeClass("active");
//				//$("#AllBrandShow").hide();
//			});
//	}

}

CarListController.$inject = ["$scope", "CTXService", "$timeout", "$filter", "$routeParams", "$location", "ngDialog"];

//汽车列表
function CarInfoController($scope, CTXService, $timeout, $filter, $routeParams, $location, ngDialog) {

	//console.log($routeParams);
	//console.log(CTXService.GetCarInfo($routeParams));

	//	$.ajax({
	//		type: "POST",
	//		//url: "http://192.168.0.198/CarSource/RequestHomeData",
	//		url: "http://ctx/GetCardata.php?callback=jsonpReturn",
	//		async: true,
	//		data: $routeParams,
	//		dataType: "jsonp",
	//		success: function(jsonpReturn) {
	//			
	//
	//			$scope.carinfotitle = jsonpReturn.data[0].name;
	//			$scope.carinfodata = jsonpReturn.data[0].value[0];
	//			$scope.carinfoimg = jsonpReturn.data[1];
	//			
	//			console.log($scope.carinfodata);
	//
	//			var thumbhtml = "";
	//			var tstatus = 0;
	//			$("#data-info-name").html($scope.carinfotitle);
	//			$("#data-info-img").html("<img src='" + $scope.carinfodata.HomePicID + "' width='634'>");
	//			thumbhtml += "<ul class=\"d-thumb-img clearfix\">";
	//			for (var i = 0, ln = $scope.carinfoimg.value.length; i < ln; i++) {
	//				thumbhtml += "<li><img data-img=\"demo/carimg.jpg\" src='" + $scope.carinfoimg.value[i].PicAddr + "'></li>";
	//				if (i == 11) {
	//					thumbhtml += "</ul><ul class=\"display-ul d-thumb-img clearfix\">";
	//					tstatus = 1;
	//				} else {
	//					tstatus = 0;
	//				}
	//			}
	//			if (tstatus != 1) {
	//				thumbhtml += "</ul>";
	//			}
	//			$("#data-info-thumb").html(thumbhtml);
	//			//console.log($scope.carinfodata);
	//			//console.log($scope.carinfoimg);
	//			//console.log($scope.carinfoimg.value);
	//			//console.log($scope);
	//			$(document).on("click", "#data-info-thumb > ul >li", function() {
	//				$("#data-info-img").find("img").attr('src', $(this).find("img").attr('data-img'));
	//				console.log($(this).find("img").attr('data-img'));
	//			});
	//		}
	//	});

	CTXService.GetCarInfo($routeParams).success(
			function(d) {
				$scope.carinfotitle = d.data[0].name;
				$scope.carinfodata = d.data[0].value[0];
				$scope.carinfoimg = d.data[1];

				console.log($scope.carinfodata);

				var thumbhtml = "";
				var tstatus = 0;
				$("#data-info-name").html($scope.carinfotitle);
				$("#data-info-img").html("<img src='" + $scope.carinfodata.HomePicID + "' width='634'>");
				thumbhtml += "<ul class=\"d-thumb-img clearfix\">";
				for (var i = 0, ln = $scope.carinfoimg.value.length; i < ln; i++) {
					thumbhtml += "<li><img data-img=\"demo/carimg.jpg\" src='" + $scope.carinfoimg.value[i].PicAddr + "'></li>";
					if (i == 11) {
						thumbhtml += "</ul><ul class=\"display-ul d-thumb-img\">";
						tstatus = 1;
					} else {
						tstatus = 0;
					}
				}
				if (tstatus != 1) {
					thumbhtml += "</ul>";
				}
				$("#data-info-thumb").html(thumbhtml);
				//console.log($scope.carinfodata);
				//console.log($scope.carinfoimg);
				//console.log($scope.carinfoimg.value);
				//console.log($scope);
				$(document).on("click", "#data-info-thumb > ul >li", function() {
					$("#data-info-img").find("img").attr('src', $(this).find("img").attr('data-img'));
					console.log($(this).find("img").attr('data-img'));
				});
				
				$(document).on("click", "#thumb-prev", function() {
					console.log("123");
					//$("#data-info-thumb > ul");
					$("#data-info-thumb ul").addClass('display-ul').siblings().removeClass('display-ul');
				});
			})
		.error(
			function(e) {
				console.log(e);

			}
		);

}

CarInfoController.$inject = ["$scope", "CTXService", "$timeout", "$filter", "$routeParams", "$location", "ngDialog"];