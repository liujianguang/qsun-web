/*===============配置区域开始==================*/
var ROOT_PATH = '/assets/biz-logic/';
var SRC_PATH = ROOT_PATH + '';			//资源路径

var POP_WRAP_TPL = 	' <div class="vedio-web">'+
				'   <div class="vedio-panel" style="width:{width}px;height:{height}px">'+
				'		<div class="vedio-close"><img src="'+SRC_PATH+'images/close.jpg" /></div>'+
				'		{html}'+
				'	</div>'+
				'	<div class="vedio-footer"><img src="'+SRC_PATH+'images/logo.png" /></div>'+
				'</div>'



$(window).ready(function() {
	$('a').bind('focus',
	function() {
		$(this).blur()
	})
});

function tAlert(msg)
{
	layer.open({
		content: msg, 
		time: 1,
		shade:false,
		style: 'background-color:#cf0012; color:#fff;'
	});
}

//ajax加载效果
function ajaxLoading(msg){ 
	var loadingTxt = arguments.length > 0 ? msg : "正在处理，请稍候。。。";
	$("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:$(document).height(),'zIndex':9001}).appendTo("body"); 
	$("<div class=\"datagrid-mask-msg\"></div>").html(loadingTxt).appendTo("body").css({display:"block",'zIndex':9001,left:($(document.body).outerWidth(true) - 190) / 2,top:($(window).height()+2*$(document).scrollTop() - 45) / 2}); 
}

function ajaxLoaded(){ 
 $("div.datagrid-mask").remove(); 
 $("div.datagrid-mask-msg").remove();             
}  


function ajaxSubmit(frm, fn) {
	var dataPara = getFormJson(frm);
	$.ajax({
		url: frm.action,
		type: frm.method,
		data: dataPara,
		beforeSend: function() {
			showMask()
		},
		success: fn,
		error: function(xhr, textStatus, errorThrown) {
			hideMask();
			alert('操作出错，消息:' + textStatus)
		}
	})
}
function getFormJson(frm) {
	var o = {};
	var a = $(frm).serializeArray();
	$.each(a,
	function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]]
			}
			o[this.name].push(this.value || '')
		} else {
			o[this.name] = this.value || ''
		}
	});
	return o
}

//清空表单数据
function ClearForm(id) {
    var objId = document.getElementById(id);
    if (objId == undefined) {
        return;
    }
    for (var i = 0; i < objId.elements.length; i++) {
        if (objId.elements[i].type == "text") {
            objId.elements[i].value = "";
        }
        else if (objId.elements[i].type == "password") {
            objId.elements[i].value = "";
        }
        else if (objId.elements[i].type == "radio") {
            objId.elements[i].checked = false;
        }
        else if (objId.elements[i].type == "checkbox") {
            objId.elements[i].checked = false;
        }
        else if (objId.elements[i].type == "select-one") {
            objId.elements[i].options[0].selected = true;
        }
        else if (objId.elements[i].type == "select-multiple") {
            for (var j = 0; j < objId.elements[i].options.length; j++) {
                objId.elements[i].options[j].selected = false;
            }
        }
        else if (objId.elements[i].type == "textarea") {
            objId.elements[i].value = "";
        }
        //else if (objId.elements[i].type == "file") {
        // //objId.elements[i].select();
        // //document.selection.clear();
        // // for IE, Opera, Safari, Chrome
        // var file = objId.elements[i];
        // if (file.outerHTML) {
        // file.outerHTML = file.outerHTML;
        // } else {
        // file.value = ""; // FF(包括3.5)
        // }
        //}
    }
}



function SetHome(obj, vrl) {
	try {
		obj.style.behavior = 'url(#default#homepage)';
		obj.setHomePage(vrl)
	} catch(e) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
			} catch(e) {
				alert("抱歉！您的浏览器不支持直接设为首页。请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为“true”，点击“加入收藏”后忽略安全提示，即可设置成功。")
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', vrl)
		}
	}
}
function addfavorite(sURL, sTitle) {
	try {
		window.external.addFavorite(sURL, sTitle)
	} catch(e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "")
		} catch(e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加")
		}
	}
}
function setCookie(objName, objValue, objHours) {
	var str = objName + "=" + escape(objValue);
	if (objHours > 0) {
		var date = new Date();
		var ms = objHours * 3600 * 1000;
		date.setTime(date.getTime() + ms);
		str += "; expires=" + date.toGMTString()
	}
	document.cookie = str
}
function getCookie(objName) {
	var arrStr = document.cookie.split("; ");
	var cookieVal = "";
	for (var i = 0; i < arrStr.length; i++) {
		var temp = arrStr[i].split("=");
		if (temp[0] == objName) cookieVal = unescape(temp[1])
	}
	return cookieVal
}
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
}
function getURLParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null
}
function sortGo(str) {
	str = $.trim(str);
	var url = location.href;
	url = url.indexOf('?') == -1 ? url + '?rank=yes': url;
	var site = url.indexOf("&sort");
	var sortUrl = "";
	if (site == "-1") {
		if (url.indexOf("?") == -1) sortUrl = url + "?sort=" + str + "-asc";
		else sortUrl = url + "&sort=" + str + "-asc"
	} else {
		var str_sort = url.substr(site, (url.length - site));
		var site_sort = str_sort.indexOf("-");
		var con = str_sort.substr(6, site_sort - 6);
		var aORd = str_sort.substr(site_sort + 1, 3);
		var url_this = url.substr(0, site);
		if (con == str) {
			if (aORd == "asc") {
				sortUrl = url_this + "&sort=" + str + "-desc"
			} else {
				sortUrl = url_this + "&sort=" + str + "-asc"
			}
		} else {
			sortUrl = url_this + "&sort=" + str + "-asc"
		}
	}
	document.location = sortUrl
}
function isMobile(value) {
	var reg = ''
	if (/^13\d{9}$/g.test(value)) return true;
	else if (/^15[0-9]{9}$/g.test(value)) return true;
	else if (/^18\d{9}$/g.test(value)) return true;
	else return false
}



/**
 * 和PHP一样的时间戳格式化函数
 * @param  {string} format    格式
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 */
function date(format, timestamp){ 
    var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
    var pad = function(n, c){
        if((n = n + "").length < c){
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"};
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
    var f = {
        // Day
        d: function(){return pad(f.j(), 2)},
        D: function(){return f.l().substr(0,3)},
        j: function(){return jsdate.getDate()},
        l: function(){return txt_weekdays[f.w()]},
        N: function(){return f.w() + 1},
        S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'},
        w: function(){return jsdate.getDay()},
        z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0},

        // Week
        W: function(){
            var a = f.z(), b = 364 + f.L() - a;
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
            if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
                return 1;
            } else{
                if(a <= 2 && nd >= 4 && a >= (6 - nd)){
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                    return date("W", Math.round(nd2.getTime()/1000));
                } else{
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                }
            }
        },

        // Month
        F: function(){return txt_months[f.n()]},
        m: function(){return pad(f.n(), 2)},
        M: function(){return f.F().substr(0,3)},
        n: function(){return jsdate.getMonth() + 1},
        t: function(){
            var n;
            if( (n = jsdate.getMonth() + 1) == 2 ){
                return 28 + f.L();
            } else{
                if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
                    return 31;
                } else{
                    return 30;
                }
            }
        },

        // Year
        L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0},
        //o not supported yet
        Y: function(){return jsdate.getFullYear()},
        y: function(){return (jsdate.getFullYear() + "").slice(2)},

        // Time
        a: function(){return jsdate.getHours() > 11 ? "pm" : "am"},
        A: function(){return f.a().toUpperCase()},
        B: function(){
            // peter paul koch:
            var off = (jsdate.getTimezoneOffset() + 60)*60;
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
            var beat = Math.floor(theSeconds/86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if ((String(beat)).length == 1) beat = "00"+beat;
            if ((String(beat)).length == 2) beat = "0"+beat;
            return beat;
        },
        g: function(){return jsdate.getHours() % 12 || 12},
        G: function(){return jsdate.getHours()},
        h: function(){return pad(f.g(), 2)},
        H: function(){return pad(jsdate.getHours(), 2)},
        i: function(){return pad(jsdate.getMinutes(), 2)},
        s: function(){return pad(jsdate.getSeconds(), 2)},
        //u not supported yet

        // Timezone
        //e not supported yet
        //I not supported yet
        O: function(){
            var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
            return t;
        },
        P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))},
        //T not supported yet
        //Z not supported yet

        // Full Date/Time
        c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()},
        //r not supported yet
        U: function(){return Math.round(jsdate.getTime()/1000)}
    };

    return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
        if( t!=s ){
            // escaped
            ret = s;
        } else if( f[s] ){
            // a date function exists
            ret = f[s]();
        } else{
            // nothing special
            ret = s;
        }
        return ret;
    });
}



function isEmail(strEmail) {
	if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) return true;
	else return false
}
function isAccount(str) {
	var reg = /^[A-Za-z_\d]{6,18}$/;
	var objExp = new RegExp(reg);
	if (objExp.test(str)) return true;
	else return false
}
function isCode(code) {
	var reg = /\d{4}/;
	var objExp = new RegExp(reg);
	if (objExp.test(code)) return true;
	else return false
}
function isBank(str) {
	var reg = /\d{16,25}/;
	var objExp = new RegExp(reg);
	if (objExp.test(code)) return true;
	else return false
}