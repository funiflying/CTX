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
		//console.log($scope.carfilter);
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
			console.log(carlist);
			var listhtml = "";
			var titlehtml = "";
			var dd;
			if (angular.isString(carlist.data)) {
				dd = JSON.parse(carlist.data);
			} else {
				dd = carlist.data;
			}
			//var dd = carlist.data;//JSON.parse(carlist.data);
			//console.log(carlist);
			console.log(dd);
			//return true;
			for (var i = 0, ln = dd.length; i < ln; i++) {
				//console.log(i);
				var tabname = dd[i].name;
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
				if (dd[i].name == "Carsource0") {
					listhtml += "<ul class=\"list-ul\" data-name=\"" + dd[i].name + "\">";
				} else {
					listhtml += "<ul class=\"list-ul\" style=\"display:none;\" data-name=\"" + dd[i].name + "\">";
				}
				//console.log(dd[i].value);
				for (var j = 0, jln = dd[i].value.length; j < jln; j++) {
					if (dd[i].value[j].HomePicID == "") {
						listhtml += "<li><a href=\"#/carinfo/" + dd[i].value[j].CarNo + "/\"><img src=\"images/default.jpg\"></a>";
					} else {
						listhtml += "<li><a href=\"#/carinfo/" + dd[i].value[j].CarNo + "/\"><img src=\"images/default.jpg\"></a>";
					}
					listhtml += "<p class=\"title\"><a href=\"#/carinfo/" + dd[i].value[j].CarNo + "/\">" + dd[i].value[j].SpecName + "</a></p>";
					listhtml += "<p><span>" + dd[i].value[j].InitialDate + "上牌</span><span>|</span>行驶" + dd[i].value[j].Mileage + "万公里</p>";
					listhtml += "<p class=\"price\"><span>￥" + dd[i].value[j].Price + "万</span></p>";
					listhtml += "</li>";
					//console.log(listhtml);
				}
				listhtml += "</ul>";
			}
			//console.log(listhtml);
			$("#tabcarlist a").remove();
			$("#carlistdata ul").remove();
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
			//alert(e);
			console.log(e);
		});
		//$location.path('/index');
	}
}

IndexController.$inject = ["$scope", "CTXService", "$timeout", "$filter", "$location", "ngDialog"];

//车源信息发布
function SellCarController($scope, CTXService, $timeout, $filter, $location, ngDialog) {


	//$scope.selectedBrand.brandID = 
	//$scope.selectedChexi.SeriesID
	$scope.sellformdata = {};
	$scope.sellformdata.SpecName = 'MG3 2011款 3 1.3 手动 舒适版';
	$scope.sellformdata.Series = '1';
	$scope.sellformdata.Color = '5';
	$scope.sellformdata.RegisterPlace = '福州';
	$scope.sellformdata.Mileage = '1.3';
	$scope.sellformdata.Price = '15';
	$scope.sellformdata.WholesalePrice = '10';
	$scope.sellformdata.Buyyear = '2015-11-1';
	$scope.sellformdata.TransferNo = 1;
	$scope.sellformdata.CarDemo = '';
	$scope.sellformdata.EngineNo = 'egn5678';
	$scope.sellformdata.FrameNumber = '56478';
	$scope.sellformdata.DrivingLicense = '112233';
	$scope.sellformdata.Registration = '258456';
	$scope.sellformdata.InitialDate = '2015-11-1';
	$scope.sellformdata.BodyBrand = '567894';
	$scope.sellformdata.PurchaseInvoices = '123456789';
	$scope.sellformdata.ViolationRecord = '0';
	$scope.sellformdata.ContactName = '车某某';
	$scope.sellformdata.MobilePhone = '18859463572';
	$scope.sellformdata.WeiXinNo = '123456';
	$scope.sellformdata.Annual_Inspect_Time = '2015-11-12';
	$scope.sellformdata.Compulsory_insurance_Time = '2015-11-12';
	$scope.sellformdata.Commercial_Insurance_Time = '2015-11-12';
	$scope.sellformdata.WomenCar = '1';

	//获取汽车所有品牌
	$scope.BrandList = function() {
		if (true) {
			CTXService.Getbrandlist().success(
				function(d) {
					$scope.brandslist = d.data;
					//$("#ChangeBrand").show();
					console.log(d.data);
				}).error(
				function(e) {
					//alert("品牌数据读取错误");
					console.log("品牌数据读取错误");
				});
		}
	}

	//获取汽车所有品牌
	$scope.CarNameLists = function() {
		var bcid = {
			"brandid": $scope.selectedChexi.brandID,
			"seriesid": $scope.selectedChexi.SeriesID
		};

		if ((bcid.brandid == "") && (bcid.seriesid == "")) {
			$scope.errorMessage = "请先选择<strong>品牌</strong>和<strong>车系</strong>...";

			ngDialog.open({
				template: 'partials/DialogMessage.html',
				appendTo: true,
				showClose: true,
				scope: $scope
			});

			return false;
		}

		//if (true) {
			CTXService.GetCarNameLists(bcid).success(
				function(d) {
					console.log(d);
					$scope.CNameList = d.data;
					console.log(d);
				}).error(
				function(e) {
					console.log("数据读取错误");
					//alert("品牌数据读取错误");
				});
		//}
	}

	//console.log($scope.selectedBrand);

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
	$('#sellcarform').submit(function() {

		//$(this).serialize().Series
		var postdata = {
			"Brand": $scope.selectedBrand.brandID,
			"Series": $scope.selectedChexi.chexi,
			"SpecName": $scope.sellformdata.SpecName,
			"Style": $scope.sellformdata.Style,
			"Color": $scope.sellformdata.Color,
			"RegisterPlace": $scope.sellformdata.RegisterPlace,
			"Mileage": $scope.sellformdata.Mileage,
			"Price": $scope.sellformdata.Price,
			"WholesalePrice": $scope.sellformdata.WholesalePrice,
			"Buyyear": $scope.sellformdata.Buyyear,
			"TransferNo": $scope.sellformdata.TransferNo,
			//"CarDemo": $scope.sellformdata.CarDemo,
			"EngineNo": $scope.sellformdata.EngineNo,
			"FrameNumber": $scope.sellformdata.FrameNumber,
			"DrivingLicense": $scope.sellformdata.DrivingLicense,
			"Registration": $scope.sellformdata.Registration,
			"InitialDate": $scope.sellformdata.InitialDate,
			"BodyBrand": $scope.sellformdata.BodyBrand,
			"PurchaseInvoices": $scope.sellformdata.PurchaseInvoices,
			"ViolationRecord": $scope.sellformdata.ViolationRecord,
			//			"ContactName": $scope.sellformdata.ContactName,
			//			"MobilePhone": $scope.sellformdata.MobilePhone,
			//			"WeiXinNo": $scope.sellformdata.WeiXinNo,
			"Annual_Inspect_Time": $scope.sellformdata.Annual_Inspect_Time,
			"Compulsory_insurance_Time": $scope.sellformdata.Compulsory_insurance_Time,
			//			"TeDian": $scope.sellformdata.TeDian,
			"WomenCar": 1,
			"SevenSeat": 1,
			"IsUrgent": 1,
			"QuasiNewCar": 1,
			"LearnerCar": 1,
			"CatalogID": 14,
			"HomePicID": "images/default.jpg"
		};

		CTXService.PostCarInfo(postdata).success(
			function(d) {

				console.log(d);
				$scope.errorMessage = "您的车辆信息发布成功...";

				ngDialog.open({
					template: 'partials/DialogMessage.html',
					appendTo: true,
					showClose: true,
					scope: $scope
				});
			}).error(
			function(e) {
				console.log("车源数据发布错误");
				//alert("车源数据发布错误");
			});

	});

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
		"CityID": {
			"City": $routeParams.clvalue
		}[$routeParams.clname] || "",
		"Brand": {
			"Brand": $routeParams.clvalue
		}[$routeParams.clname] || "4",
		"Series": {
			"Series": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"PriceID": {
			"PriceID": $routeParams.clvalue
		}[$routeParams.clname] || "0",
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
		"IsUrgent": {
			"IsUrgent": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"QuasiNewCar": {
			"QuasiNewCar": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"WomenCar": {
			"WomenCar": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"SevenSeat": {
			"SevenSeat": $routeParams.clvalue
		}[$routeParams.clname] || "0",
		"Sort": {
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
	//return true;
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
					"CityID": "",
					"Brand": "0",
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
				$scope.loadcarlist();
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
						if ($scope.carfilter.Brand == null || $scope.carfilter.brandID == "0") {
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
					if ($scope.carfilter.Brand == $scope.brandslist[j].brandID) {
						chexihtml = "";
						if (j < 14) {
							brandhtml += "<a class=\"on\" href=\"javascript:;\" data-value=\"" + $scope.brandslist[j].brandID + "\">" + $scope.brandslist[j].brandName + "</a>";
						} else {
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
				var g_price_s = $("#m_price_s").val(),
					g_price_e = $("#m_price_e").val();
				$scope.carfilter.PriceStart = g_price_s;
				$scope.carfilter.PriceEnd = g_price_e;

				if ((g_price_s != "") && (g_price_e != "")) {
					$scope.loadbrand();
				} else {
					$scope.errorMessage = "填写价格段有误，请确认是否为数字，并且在0到999之间";

					ngDialog.open({
						template: 'partials/DialogMessage.html',
						appendTo: true,
						showClose: true,
						scope: $scope
					});
				}
			}

			$(document).on("click", "#data-brandID > a", function() {
				$(this).addClass('on').siblings().removeClass('on');
				$scope.carfilter.Brand = $(this).attr("data-value");
				$scope.carfilter.Series = "0";
				//console.log($scope.carfilter);
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
				//console.log($scope.carfilter);
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
				$(this).attr("data-value", {
					"1": "0"
				}[$(this).attr("data-value")] || "1");
				$scope.loadcarlist();
			});
			$(document).on("click", "#ChangeNewCar", function() {
				$scope.carfilter.QuasiNewCar = $(this).attr("data-value");
				$(this).attr("data-value", {
					"0": "1"
				}[$(this).attr("data-value")] || "1");
				//console.log($scope.carfilter.QuasiNewCar);
				$scope.loadcarlist();
			});
			$(document).on("click", "#ChangeWomenCar", function() {
				$scope.carfilter.WomenCar = $(this).attr("data-value");
				$(this).attr("data-value", {
					"0": "1"
				}[$(this).attr("data-value")] || "1");
				//console.log($scope.carfilter.WomenCar);
				$scope.loadcarlist();
			});
			$(document).on("click", "#ChangeSevenSeat", function() {
				$scope.carfilter.SevenSeat = $(this).attr("data-value");
				$(this).attr("data-value", {
					"0": "1"
				}[$(this).attr("data-value")] || "1");
				//console.log($scope.carfilter.SevenSeat);
				$scope.loadcarlist();
			});

			//排序选择
			$(document).on("click", "#ChangeSort > a", function() {
				var dv, datavalue = $(this).attr("data-value");
				dv = {
					"0": "0",
					"-1": "1",
					"1": "-1",
					"-2": "2",
					"2": "-2",
					"-3": "3",
					"3": "-3"
				}[datavalue] || "0";
				$(this).attr("data-value", dv);
				$(this).addClass('Sort_on').siblings().removeClass('Sort_on');
				//console.log(datavalue);
				//console.log(dv);
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
				var obj={"CityID":"2"};
				//var obj={"City":2};
				console.log($scope.carfilter);
				console.log(obj);
				CTXService.GetCarlist(obj).success(
					function(carlist) {
						//console.log(carlist);
						//return;
						$("#carcount").html(carlist.count);
						$("#carcount1").html(carlist.count);

						listhtml += "<ul class=\"list-ul\">";
						for (var j = 0, jln = carlist.data[0].value.length; j < jln; j++) {
							//console.log(carlist.data[0].value.length);
							var homeimg = carlist.data[0].value[j].HomePicID;
							if (homeimg == "" || homeimg == null) {
								homeimg = "images/default.jpg";
							}
							listhtml += "<li><a href=\"#/carinfo/" + carlist.data[0].value[j].CarNo + "\" data-value=\"" + carlist.data[0].value[j].CarNo + "\"><img src=\"" + homeimg + "\"></a>";
							listhtml += "<p class=\"title\"><a href=\"#/carinfo/" + carlist.data[0].value[j].CarNo + "\" data-value=\"" + carlist.data[0].value[j].CarNo + "\">" + carlist.data[0].value[j].SpecName + "</a></p>";
							listhtml += "<p><span>" + carlist.data[0].value[j].InitialDate + "上牌</span><span>|</span>行驶" + carlist.data[0].value[j].Mileage + "万公里</p>";
							listhtml += "<p class=\"price\"><span>￥" + carlist.data[0].value[j].Price + "万</span></p>";
							listhtml += "</li>";
						}
						listhtml += "</ul>";
						//$("#carlist").fadeIn(1000);
						$("#carlist").html(listhtml);
					});
				//				$.ajax({
				//					type: "POST",
				//					url: "http://192.168.0.218/common/car/SearchCar",
				//					async: false,
				//					data: $scope.carfilter,
				//					dataType: "json",
				//					beforeSend: function() {
				//						$("#carlist").html("请稍后，数据加载中...");
				//					},
				//					success: function(carlist) {
				//						listhtml += "<ul class=\"list-ul\">";
				//						for (var j = 0, jln = carlist.data[0].value.length; j < jln; j++) {
				//							//console.log(carlist.data[0].value.length);
				//							listhtml += "<li><a href=\"#/carinfo/" + carlist.data[0].value[j].CarNo + "\" data-value=\"" + carlist.data[0].value[j].CarNo + "\"><img src=\"" + carlist.data[0].value[j].HomePicID + "\"></a>";
				//							listhtml += "<p class=\"title\"><a href=\"#/carinfo/" + carlist.data[0].value[j].CarNo + "\" data-value=\"" + carlist.data[0].value[j].CarNo + "\">" + carlist.data[0].value[j].SpecName + "</a></p>";
				//							listhtml += "<p><span>" + carlist.data[0].value[j].InitialDate + "上牌</span><span>|</span>行驶" + carlist.data[0].value[j].Mileage + "万公里</p>";
				//							listhtml += "<p class=\"price\"><span>￥" + carlist.data[0].value[j].Price + "万</span></p>";
				//							listhtml += "</li>";
				//						}
				//						listhtml += "</ul>";
				//						//$("#carlist").fadeIn(1000);
				//						$("#carlist").html(listhtml);
				//					}
				//				});
			}

			//初始化加载默认车源及品牌信息
			$scope.loadbrand();
			$scope.loadcarlist();
		}).error(
		function(e) {
			console.log("品牌数据读取错误");
			//alert("品牌数据读取错误");
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

	CTXService.GetCarInfo($routeParams).success(
			function(d) {
//								$scope.carinfotitle = d.data[0].SpecName;
//								$scope.carinfodata = d.data[0].value[0];
//								$scope.carinfoimg = d.data[1];

				console.log(d);

				//return false;
				$scope.carinfodata = d.data;

				var thumbhtml = "";
				var tstatus = 0;
				//$("#data-info-name").html($scope.data.SpecName);
				//$("#data-info-img").html("<img src='" + $scope.data.HomePicID + "' width='634'>");
//				thumbhtml += "<ul class=\"d-thumb-img clearfix\">";
//				for (var i = 0, ln = $scope.carinfoimg.value.length; i < ln; i++) {
//					thumbhtml += "<li><img data-img=\"demo/carimg.jpg\" src='" + $scope.carinfoimg.value[i].PicAddr + "'></li>";
//					if (i == 11) {
//						thumbhtml += "</ul><ul class=\"display-ul d-thumb-img\">";
//						tstatus = 1;
//					} else {
//						tstatus = 0;
//					}
//				}
//				if (tstatus != 1) {
//					thumbhtml += "</ul>";
//				}
//				$("#data-info-thumb").html(thumbhtml);
				//console.log($scope.carinfodata);
				//console.log($scope.carinfoimg);
				//console.log($scope.carinfoimg.value);
				//console.log($scope);
				$(document).on("click", "#data-info-thumb > ul >li", function() {
					$("#data-info-img").find("img").attr('src', $(this).find("img").attr('data-img'));
					console.log($(this).find("img").attr('data-img'));
				});

				$(document).on("click", "#thumb-prev", function() {
					//console.log("123");
					//$("#data-info-thumb > ul");
					$("#data-info-thumb ul").addClass('display-ul').siblings().removeClass('display-ul');
				});
			})
		.error(
			function(e) {
				console.log(e);
			}
		);

	CTXService.GetReport($routeParams).success(
		function(reportd) {
			var repdata = reportd["report"];
			for (var k in repdata) {
				if (repdata[k].rcss > 0) {
					$("#" + k).css("height", repdata[k].rcss + "%");
				}

				if (repdata[k].value == "1") {
					$("#" + k).addClass("report-check-no");
				}
			}
		}).error(
		function(e) {
			console.log(e);
		});


}

CarInfoController.$inject = ["$scope", "CTXService", "$timeout", "$filter", "$routeParams", "$location", "ngDialog"];

//评估师填写检测报告
function addReportController($scope, CTXService, $timeout, $filter, $routeParams, $location, ngDialog) {
	$scope.ReportData = {}
	$scope.ReportData.version = "v1.0";
	$scope.ReportData.report = {};

	$scope.ARSelect = function(divid) {
		var dv = $("#report-" + divid).attr("data-value");
		if (dv == "1") {
			$("#report-" + divid).addClass("report-check-no");
			$("#report-" + divid).attr("data-value", "0");
			$scope.ReportData.report[divid] = "1";
		} else {
			$("#report-" + divid).removeClass("report-check-no");
			$("#report-" + divid).attr("data-value", "1");
			delete $scope.ReportData.report[divid];
		}
		//console.log(dv);
		//$("#ddmessage").html($scope.ReportData);
		console.log($scope.ReportData);
	}

	$scope.ARSubmit = function() {
		var obj = {
				"AccidentCheckMemo": "车体骨架结构无变形、无扭曲、无更换、无烧焊、无褶皱；无火烧痕迹，无水泡痕迹。",
				"AICheckMemo": "经检测左后翼板子喷漆，右前翼板子更换，左前大灯更换，其他无更换。",
				"AppraiserCode": "1",
				"SecurityCheckMemo": "经检测，胎纹深度、刹车片厚度、液位均正常。",
				"TestDescription": "经过检测排除重大事故。排除水淹车和过火车，钣金喷漆部位比较多，内饰整洁干净，无异味。安全系统，刹车系统以及电子设备系统一切正常，发动机启动运行一切 正常，动力充沛，换挡平顺，一切正常。",
				"ControlCheckMemo": "经试驾员专业测试，发动机、变速箱正常，无怠速抖动，变速时无闯档顿挫，转向无乏力感。",
			}
			//$scope.ReportData;
			//console.log($scope.ReportData);
		CTXService.PostReport($scope.ReportData).success(
			function(retdata) {
				console.log(retdata);
			});
	}


	$("#report-safety .treelist").on("mousedown", function(e) {
		var dn = $(this).attr("data-name");
		var dh = Math.round($(this).attr("data-value"));
		if (dh >= 100 || dh < 0) {
			dh = 0;
		} else {
			dh = dh + 5;
		}
		$(this).attr("data-value", dh);
		$("#report-" + dn).css("height", dh + "%");
		console.log(dh);
	});


	//console.log($scope.ReportData);
}
addReportController.$inject = ["$scope", "CTXService", "$timeout", "$filter", "$routeParams", "$location", "ngDialog"];