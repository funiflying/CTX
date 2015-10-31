/*
 *@version:1.0.0
 *@author:wutianxiang
 *@date:2015-10-10
 */
util = {};
Array.prototype.remove = function(index) {
		if (isNaN(index) || index > this.length) {
			return false;
		}
		for (var i = 0, n = 0; i < this.length; i++) {
			if (this[i] != this[index]) {
				this[n++] = this[i]
			}
		}
		this.length -= 1
	}
/************************
  控制台日志
 ***********************/
util.Logger = {
		log: function(_msg) {
			if (!!window.console) {
				console.log(_msg);
			}
		},
		info: function(_msg) {
			if (!!window.console) {
				console.info(_msg);
			}
		},
		warn: function(_msg) {
			if (!!window.console) {
				console.warn(_msg);
			}
		},
		error: function(_msg) {
			if (!!window.console) {
				console.error(_msg);
			}
		}
	}
	/************************
	  cookies
	 ************************/
util.Cookie = {
		/*
		 *@param:name
		 *@param:value
		 *@param:options
		 *@return:cookie
		 */
		setCookie: function(COOKIE_NAME, COOKIE_VALUE, OPTIONS) {
			if (typeof COOKIE_VALUE != "undefined") {
				var options = OPTIONS || {};
				var date;
				var expires = '';
				if (COOKIE_VALUE === null) {
					COOKIE_VALUE = '';
					options.expires = -1;
				}
				if (options.expires && typeof options.expires == "number") {
					date = new Date();
					date.setDate(date.getDate() + options.expires)
					expires = ';expires=' + date;
				}
				var path = options.path ? ';path=' + options.path : '';
				var domain = options.domain ? '; domain=' + (options.domain) : '';
				var secure = options.secure ? '; secure' : '';
				document.cookie = [COOKIE_NAME, '=', encodeURIComponent(COOKIE_VALUE), expires, path, domain, secure].join('');
			}
		},
		/*
		 *@param:name
		 *@return:value
		 */
		getCookie: function(COOKIE_NAME) {
			if (document.cookie && document.cookie != "") {
				var COOKIE_VALUE = null;
				var cookies = document.cookie.split(';');

				for (var i = 0; i < cookies.length; i++) {
					var cookie = cookies[i].replace(/(^\s*)|(\s*$)/g, "");
					if (cookie.substring(0, COOKIE_NAME.length + 1) == COOKIE_NAME + '=') {
						COOKIE_VALUE = encodeURIComponent(cookie.substring(COOKIE_NAME.length + 1));
					}
				}
				return COOKIE_VALUE;
			}
		},
		/*
		 *@param:name
		 *@return:void
		 */
		clearCookie: function(COOKIE_NAME) {
			var cookie = this.getCookie(COOKIE_NAME);
			if (cookie != null) {
				this.setCookie(COOKIE_NAME, null);
			}
		}
	}
	/************************
	 Ajax
	************************/
util.Ajax = {
		getAjaxHttp: function() {
			var xhr;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else {
				xhr = new ActiveXObject('Microsoft.XMLHTTp');
			}
			return xhr;
		},
		ajaxRequest: function(url, methodType, async, params, callback) {
			var xhr = this.getAjaxHttp();
			xhr.open(methodType, url, async);
			if (methodType == 'post') {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.send(params);
			} else {
				xhr.send(null);
			}
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						callback == null ? null : callback.call(this, xhr.responseText);
					}
				}
			}
		},
		post: function(url, async, params, callback) {
			this.ajaxRequest(url, 'post', async, params, callback)
		},
		get: function(url, async, callback) {
			this.ajaxRequest(url, 'get', async, '', callback)
		}
	}
	/************************
	     pwd meter
	 ************************/
util.Meter = {
		meter: function(e) {
			var t = 0,
				n = 0,
				r = 0,
				i = 0,
				s = 0,
				o = 0,
				u = 0,
				a = 0,
				f = 0,
				l = 0,
				c = 0,
				h = 0,
				p = 0,
				d = 0,
				v = 4,
				m = 4,
				g = 6,
				y = 2,
				b = 2,
				w = 2,
				E = 2,
				S = 3,
				x = 3,
				T = "",
				N = "",
				C = "",
				k = "",
				L = "abcdefghijklmnopqrstuvwxyz",
				A = "01234567890",
				O = "Too Short";
			if (document.all) var M = 0;
			else var M = 1; if (e) {
				t = parseInt(e.length * v), n = e.length;
				var _ = e.replace(/\s+/g, "").split(/\s*/),
					D = _.length;
				for (var P = 0; P < D; P++) {
					_[P].match(new RegExp(/[A-Z]/g)) ? (T !== "" && T + 1 == P && (f++, h++), T = P, r++) : _[P].match(new RegExp(/[a-z]/g)) ? (N !== "" && N + 1 == P && (l++, h++), N = P, i++) : _[P].match(new RegExp(/[0-9]/g)) ? (P > 0 && P < D - 1 && u++, C !== "" && C + 1 == P && (c++, h++), C = P, s++) : _[P].match(new RegExp(/[^a-zA-Z0-9_]/g)) && (P > 0 && P < D - 1 && u++, k !== "" && k + 1 == P && h++, k = P, o++);
					for (var H = 0; H < D; H++) _[P].toLowerCase() == _[H].toLowerCase() && P != H && a++
				}
				for (var B = 0; B < 23; B++) {
					var j = L.substring(B, parseInt(B + 3)),
						F = this.strReverse(j);
					(e.toLowerCase().indexOf(j) != -1 || e.toLowerCase().indexOf(F) != -1) && p++
				}
				for (var B = 0; B < 8; B++) {
					var j = A.substring(B, parseInt(B + 3)),
						F = this.strReverse(j);
					(e.toLowerCase().indexOf(j) != -1 || e.toLowerCase().indexOf(F) != -1) && d++
				}
				return r > 0 && r < n && (t = parseInt(t + (n - r) * 2)), i > 0 && i < n && (t = parseInt(t + (n - i) * 2)), s > 0 && s < n && (t = parseInt(t + s * m)), o > 0 && (t = parseInt(t + o * g)), u > 0 && (t = parseInt(t + u * y)), (i > 0 || r > 0) && o === 0 && s === 0 && (t = parseInt(t - n)), i === 0 && r === 0 && o === 0 && s > 0 && (t = parseInt(t - n)), a > 0 && (t = parseInt(t - a * 1)), f > 0 && (t = parseInt(t - f * b)), l > 0 && (t = parseInt(t - l * w)), c > 0 && (t = parseInt(t - c * E)), p > 0 && (t = parseInt(t - p * S)), d > 0 && (t = parseInt(t - d * x)), t > 100 ? t = 100 : t < 0 && (t = 0), t >= 0 && t < 40 ? O = "Weak" : t >= 40 && t < 70 ? O = "Medium" : t >= 70 && t <= 100 && (O = "Strong"), O
			}
		},
		strReverse: function(e) {
			var e = "";
			for (var t = 0; t < this.length; t++) e = this.charAt(t) + e;
			return e
		}
	}
	/************************
	     表单验证
	 ************************/
util.Verify = {
		empty: function(str) {
			if (str.replace(/(^s*)|(s*$)/g, "").length == 0) {
				return true
			} else {
				return false;
			}
		},
		mobile: function(num) {
			if (this.empty(num)) {
				return false;
			}
			return !!num.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
		},
		IDCard: function(num) {
			if (this.empty(num)) {
				return false;
			}
			return !!num.match(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/)
		}
	}
	/************************
	     获取表单Name和Value，组成obj
	 ************************/
util.Form = {
	getForm: function(_formID) {

		var _form = $("#" + _formID);
		var _input = _form == null ? null : _form.find('input');
		var _select = _form.find('select');
		var o = {};
		var ck = [];
		if (_input != null) {
			$.each(_input, function(index, obj) {
				var _type = $(this).attr("type").toLowerCase();
				var _name = $(this).attr("name");
				var _value = $(this).val();
				switch (_type) {
					case 'text':
					case 'password':
					case 'file':
					case 'hidden':
					case 'email':
					case 'url':
					case 'number':
					case 'date':
					case 'range':
						if (_name != undefined & _name != "") {
							o[_name] = _value;  
						}
						break;
					case 'radio':
					case 'checkbox':
						if (this.checked) {
							if (_type == 'radio') {
								if (_name != undefined & _name != "") {
									o[_name] = _value
								}
							} else if (_type == 'checkbox') {
								if (_name != undefined & _name != null) {
									ck.push(_value)
									o[_name] = ck
								}
							}
						}
					default:
						break;
				}
			});
			if (_select != null) {
				$.each(_select, function(index, obj) {
					var _value = $(this).val();
					var _name = $(this).attr("name");
					o[_name] = _value;
				});
			}
			return o
		}
	},
	setForm: function(data, _formID) {
		var _form = $("#" + _formID);
		var _input = _form == null ? null : _form.find('input');
		var _select = _form.find('select');
		console.log(_form.find('name=Account').val())
		for (i in data) {
				_form.find('name=Account').val(data[i])
			}
	},
    clearForm:function(_formID){
        var _form = $("#" + _formID);
		var _input = _form == null ? null : _form.find('input');
		var _select = _form.find('select');
        $.each(_input,function(index,obj){
                var _type = $(this).attr("type").toLowerCase();
				var _name = $(this).attr("name");
				var _value = $(this).val();
				switch (_type) {
					case 'text':
					case 'password':
					case 'file':
					case 'hidden':
					case 'email':
					case 'url':
					case 'number':
					case 'date':
					case 'range':
						$(this).val("")
					case 'radio':
					case 'checkbox':
						$(this).removeAttr("chicked")
					default:
						break;
				}
        });
        $.each(_select, function(index, obj) {
            $(this).find("option").removeAttr("selected")
        })
    }
}