/**菜单跳转**/
function rightMain(url){
	$('#rightMain').attr('src', url);
}

$(function() {
	var loginname = getCookie("loginname");
	document.getElementById("username").innerHTML = loginname;
	
	$('#TabPage2 li').click(function() {
		//获取当前所点击的li的id；
		var index = $(this).index();
		//指定深色的图标
		$(this).find('img').attr('src', 'images/common/' + (index + 1) + '_hover.jpg');
		//指定对应li的背景为浅色
		$(this).css({
			background : '#ffffff'
		});
		//指定侧拉菜单上方显示的当前菜单名的图片
		$('#nav_module').find('img').attr('src', 'images/common/module_' + (index + 1) + '.png');
		//遍历使其他li使得其为浅色图标深色背景
		$('#TabPage2 li').each(function(i, ele) {
			if (i != index) {
				$(ele).find('img').attr('src', 'images/common/' + (i + 1) + '.jpg');
				$(ele).css({
					background : '#044599'
				});
			}
		});
		// 显示侧边栏（应该为显示对应的div）
		switchBar(index);
		switchSysBar(true);
	});

	
	
	// 显示隐藏侧边栏
	$("#show_hide_btn").click(function() {
		switchSysBar();
	});
	
	$("#GeneralAnalysis").click(function(){
		console.log("generalanalysis");
		
		require(["dojo/dom","extras/Widgets/GeneralAnalysis", "dojo/_base/window","dojo/_base/fx","dojo/dom-style","dojo/domReady!"],
				function(dom,GeneralAnalysis,win,fx,style){
			
			if(dojo.byId("dijit__WidgetsInTemplateMixin_0")){
				style.set("dijit__WidgetsInTemplateMixin_0", "z-index", "10");
				fx.fadeIn({
					node : dom.byId("dijit__WidgetsInTemplateMixin_0"),
					duration : 500,
					onEnd : function() {
							}
			}).play();
				
			}else{
				var generalAn = new GeneralAnalysis();
				generalAn.placeAt(win.body());
				generalAn.startup();
			}
		});
	});
});

/*
 * 获取cookie中的用户名
 */
function getCookie(name){  
    var arr = document.cookie.split(";");  
    for(var i=0;i<arr.length;i++){ 
        var item = arr[i].split("=");  
        if(item[0]==name){  
             return item[1];  
        }  
    }  
    return "未获取到用户名";  
}  


/**选择显示的菜单和工作条**/
function switchBar(index) {
	
	$(".nav_resource").css('display','none'); 
	var id = "nav_resource"+(index+1);
	$("#"+id).css('display','block'); 
	
	
	$(".WorkingTab").css('display','none'); 
	var id = "WorkingTab"+(index+1);
	$("#"+id).css('display','block'); 
}


/**退出系统**/
function logout() {
	if (confirm("您确定要退出本系统吗？")) {
		window.location.href = "PublicBicycleSys/jsps/UserLogin.jsp";
	}
}


/**隐藏或者显示侧边栏**/
function switchSysBar(flag) {
	var side = $('#side');
	var left_menu_cnt = $('#left_menu_cnt');
	
	//判断switchSysBar是否含参（直接命令菜单关闭或打开，例如界面初始化时 flag传参未true）
	if (flag == true) {
		left_menu_cnt.show(0);
		side.css({
			width : '380px'
		});

		$('#main').css({
			left : '380px'
		});
	} else {
	//当点击打开或关闭菜单按钮时来判断（打开时运行关闭操作，关闭时运行打开操作）	
		if (left_menu_cnt.is(":visible")) {
			//状态：关闭  动作：打开
			left_menu_cnt.hide(0);
			
			side.css({
				width : '60px'
			});
			$('#main').css({
				left : '60px',
			});
			//更换图片
			$("#show_hide_btn").find('img').attr('src', 'images/common/nav_show.png');
		} else {
			//状态：打开  动作：关闭
			left_menu_cnt.show(0);
			side.css({
				width : '380px'
			});
			$('#main').css({
				left : '380px'
			});
			$("#show_hide_btn").find('img').attr('src', 'images/common/nav_hide.png');
		}
	}
}
