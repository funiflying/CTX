'use strict';

/* Filters */

angular.module('chetongxiang.filters', []).
filter('orderStatus', function() {
	return function(status) {
		var descr="";
		switch (status){
			case 0:
			    descr="支付预付款";
				break;
			case 1:
			    descr="预付款审核";
				break;
			case 2:
			    descr="评估检测";
				break;
			case 3:
			    descr="填写物流费";
				break;
			case 4:
			    descr="支付购车款";
				break;
			case 5:
			    descr="购车款审核"
				break;
			case 6:
			    descr="物流发车"
				break;
			case 7:
			    descr="确认到车"
				break;
			case 8:
			    descr="评估检测"
				break;
			case 9:
			    descr="客户提车"
				break;
			case 10:
			    descr="买方评价"
				break;
			case 11:
			    descr="卖方评价"
				break;
			case 12:
			    descr="完成"
				break;
			default:
				break; descr=""
		}
		return descr;
	}
}).filter('FormatPrice', function() {
	return function(num) {
		//return (num/100000000 > 1) ? (num/100000000).'亿' : ((num/10000 > 1) ? (num/10000).'万' : num);
		return num / 10000;
	}
}).filter('GetCatalog', function() {
	return function(str, mm) {
		var strdata;
		//return mm;
		if (str == undefined || str == null) {
			return '';
		} else {
			strdata = str.split("||");
			if (mm >= 0) {
				return strdata[mm];
			} else {
				return strdata;
			}
		}
	}
}).filter('userRole', function() {
	return function(status) {
		var flag="";
		switch (status){
			case "0":
			    flag="外网用户";
				break;
			case "1":
			    flag="普通员工";
				break;
			case "2":
			    flag="评估师";
				break;
			case "3":
			    flag="法人代表";
				break;
			case "11":
			    flag="普通员工";
				break;
			case "12":
			    flag="评估师"
				break;
			case "13":
			    flag="法人代表"
				break;
			case "14":
			    flag="股东"
				break;
			case "101":
			    flag="总部客服"
				break;
			case "102":
			    flag="总部财务"
				break;
			case "103":
			    flag="总部评估师"
				break;
			default:
				break; flag=""
		}
		return flag;
	}
})