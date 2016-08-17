//顶部固定
$(function () {
	var fixHeader = false;
	var fixLinkbar = false;
	
	var navHeightFixed=62;
	var winHei = $(window).height();
	$(window).scroll(function () {
		var scrollTop = $(window).scrollTop();
		if ( scrollTop > navHeightFixed) {
			if(!fixHeader) {
				fixHeader = true;
				$(".header").css({ "position": "fixed", "z-index": 500, "top": 0, "margin-top": "0px", "width":"100%" });
			}
			if(scrollTop > winHei)
			{
				if (!fixLinkbar){
					fixLinkbar = true;
					$("#link-bar").css({"position": "fixed", "z-index": 500, "top": navHeightFixed, "margin-top": "0px"});
				}
			}
			else
			{
				if(fixLinkbar) {
					fixLinkbar = false;
					$("#link-bar").removeAttr("style");
				}
				
			}
			
		}else {
			if(fixHeader) {
				fixHeader = false;
				$(".header").removeAttr("style");
			}
			if(fixLinkbar) {
				fixLinkbar = false;
				$("#link-bar").removeAttr("style");
			}
		}

	});
})

//模拟弹出alert
function myAlert(msg,type){
	var dtype = arguments.length > 1 ? type : 3;
	var newPanel = $.layer({
		type: 0,
		title: false,
		area: ['auto', 'auto'],
		fadeIn: 500,
		time: 2,
		border: [10, 0.5, '#bc0c39'],
		shade: [0], //遮罩
		closeBtn: [0, false], //去掉默认关闭按钮
		//move: '.login_video',		//设置鼠标拖拽元素
		//shift: 'right', //从左动画弹出
		dialog: {
			type: dtype,
			msg: msg
		}
	});
}


