'use strict';
/*
 *版本：1.0
 *文件：Controllers
 *作者：dekent
 *时间：2015-10-22
 */

//我要卖车-车源信息发布数据
angular.module('chetongxiang.services-dk', []).service("CTXService", function($http) {
	return {
		//获取品牌接口数据
		Getbrandlist: function(obj) {
			return $http.get('test/brandlist-new.json');
		},
		//获取品牌接口数据
		GetCarNameLists: function(obj) {
			return $http.get('http://192.168.0.218/carbrand/GetSpecByBrandSeries?brandid=' + obj.brandid + '&seriesid=' + obj.seriesid);
		},
		//获取首页推荐汽车接口数据
		GetIndexHot: function(obj) {
			//return $http.get('test/linshi1.json', obj);
			return $http.get('http://192.168.0.218/Common/Car/RequestHomeData?City=' + obj.City);
			//			return $.ajax({
			//				type: "POST",
			//				//url: "http://192.168.0.168/Common/Car/RequestHomeData",
			//				//url: "http://192.168.0.180/RequestHomeData.php",
			//				async: false,
			//				data: obj,
			//				dataType: "json"
			//			});
		},
		GetCarlist: function(obj) {
			return $http.post('http://192.168.0.218/common/car/SearchCar', obj);
		},
		PostCarInfo: function(obj) {
			return $http.post('http://192.168.0.218/common/car/Publish', obj);

		},
		//获取汽车详细接口数据
		GetCarInfo: function(obj) {
			//return $http.jsonp("http://192.168.0.180/GetCardata.php?callback=JSON_CALLBACK",obj)
			return $http.get("http://192.168.0.218/common/car/GetCardata?CarNo=" + obj.CarNo);
		},
		//获取汽车检测报告接口数据
		GetReport: function(obj) {
			return $http.get('test/carReport-list.json', obj);
		},

		PostReport: function(obj) {
			return $http.post('http://192.168.0.218/Alliance/TestReport/WriteTestReport', obj);
			//return $http.post('http://192.168.0.218/TestReport/WriteTestReport', obj);
			//			return $.ajax({
			//				type: "POST",
			//				//url: "http://192.168.0.180/PostReport.php",
			//				url: "http://192.168.0.180/TestReport/WriteTestReport",
			//				async: false,
			//				data: "ReportData="+obj,
			//				dataType: "json"
			//			});
		}

	}

})