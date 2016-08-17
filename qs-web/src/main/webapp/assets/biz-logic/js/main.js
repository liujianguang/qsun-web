//弹出包含html的框
function showPanel(html,widht,hight){
	layer.closeAll();
	var insertHtml = POP_WRAP_TPL.replace('{html}',html).replace('{width}',widht).replace('{height}',hight);	
	var newPanel = $.layer({
		type: 1,
		title: false,
		area: [widht+'px', hight+'px'],
		fadeIn: 500,
		border: [0], //去掉默认边框
		shade: [0.8, '#000'], //遮罩
		shadeClose: true,
		
		closeBtn: [0, false], //去掉默认关闭按钮
		//move: '.login_video',		//设置鼠标拖拽元素
		//shift: 'right', //从左动画弹出
		page: {html: insertHtml,scrolling: 'yes'}
	});
	
	//自设关闭
	$('div.vedio-close').on('click', function(){
		layer.close(newPanel);
	});
	return newPanel;
}


$(document).ready(function(){
//    nav-li hover e
    var num;
    $('.nav-main>li[id]').hover(function(){
       /*图标向上旋转*/
        $(this).children().removeClass().addClass('hover-up');
        /*下拉框出现*/
        var Obj = $(this).attr('id');
        num = Obj.substring(3, Obj.length);
        var bbb = $('#box-'+num).length;
        console.log(bbb);
        $('#box-'+num).slideDown(300);
    },function(){
        /*图标向下旋转*/
        $(this).children().removeClass().addClass('hover-down');
        /*下拉框消失*/
        $('#box-'+num).hide();
    });
//    hidden-box hover e
    $('.hidden-box').hover(function(){
        /*保持图标向上*/
        $('#li-'+num).children().removeClass().addClass('hover-up');
        $(this).show();
    },function(){
        $(this).slideUp(200);
        $('#li-'+num).children().removeClass().addClass('hover-down');
    });
    
    //弹出视频播放
    var aaa = $('#vedio-left-1');
	aaa.click(function() {
		var videoUrl = 'http://static.song-1.com/video/DOMIGOtiaoyinshipian-baoyubanwupiantou.mp4';
		var html = '<video height="636" width="1128" controls autobuffer  autoplay="autoplay">'+
		'<source src="'+videoUrl+'" type="video/mp4"  >示例视频1</source> '+
			        '您的浏览器不支持video标签 '+ 
			  	'</video>'
		showPanel(html, 1140, 636);
	});
	
	//弹出视频播放
    var b = $('#vedio-left-2');
	b.click(function() {
		var videoUrl = 'http://static.song-1.com/video/domigoshejishipian-baoyunbaowupiantou.mp4';
		var html = '<video height="636" width="1128" controls autobuffer  autoplay="autoplay">'+
		'<source src="'+videoUrl+'" type="video/mp4"  >示例视频1</source> '+
			        '您的浏览器不支持video标签 '+ 
			  	'</video>'
		showPanel(html, 1140, 636);
	});
});
