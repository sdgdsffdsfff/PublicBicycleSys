/**菜单跳转**/
function rightMain(url){
	$('#rightMain').attr('src', url);
}

function shake(ele,cls,times){
	var i = 0,t= false ,o =ele.attr("class")+" ",c ="",times=times||2;
	if(t) return;
	t= setInterval(function(){
		i++;
		c = i%2 ? o+cls : o;
		ele.attr("class",c);
		if(i==2*times){
			clearInterval(t);
			ele.removeClass(cls);
			}
		},200);
};

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
	//一般分析按钮
	$("#GeneralAnalysis").click(function(){
		console.log("generalanalysis");
		
		require(["dojo/dom","dojo/dom-construct","extras/Widgets/GeneralAnalysis", "dojo/_base/window","dojo/_base/fx","dojo/dom-style","dojo/domReady!"],
				function(dom,domConstruct,GeneralAnalysis,win,fx,style){
			
			if(dojo.byId("Widget_GeneralAnalysis")){
				style.set("Widget_GeneralAnalysis", "z-index", "200");
				fx.fadeIn({
					node : dom.byId("Widget_GeneralAnalysis"),
					duration : 500,
					onEnd : function() {
							}
			}).play();
				
			}else{
				var father = dom.byId('main');
				domConstruct.create("div",{ id: "Widget_GeneralAnalysis"}, father, "first");
				var generalAn = new GeneralAnalysis();
				var container = dom.byId('Widget_GeneralAnalysis');
				//generalAn.placeAt(win.body());
				generalAn.placeAt(container);
				generalAn.startup();
			}
		});
	});
	
	//工作人员管理
	$("#PeoManage").click(function(){
		console.log("PeoManage");
		
		require(["dojo/dom","dojo/dom-construct","extras/Widgets/PeoManage", "dojo/_base/window","dojo/_base/fx","dojo/dom-style","dojo/domReady!"],
				function(dom,domConstruct,PeoManage,win,fx,style){
			
			if(dojo.byId("Widget_PeoManage")){
				style.set("Widget_PeoManage", "z-index", "200");
				fx.fadeIn({
					node : dom.byId("Widget_PeoManage"),
					duration : 500,
					onEnd : function() {
							}
			}).play();
				
			}else{
				var father = dom.byId('main');
				domConstruct.create("div",{ id: "Widget_PeoManage"}, father, "first");
				var PeoManage = new PeoManage();
				var container = dom.byId('Widget_PeoManage');
				//generalAn.placeAt(win.body());
				PeoManage.placeAt(container);
				PeoManage.startup();
			}
		});
	});
	
	//车辆信息管理  CarManage
	
	$("#CarManage").click(function(){
		console.log("CarManage");
		
		require(["dojo/dom","dojo/dom-construct","extras/Widgets/CarManage", "dojo/_base/window","dojo/_base/fx","dojo/dom-style","dojo/domReady!"],
				function(dom,domConstruct,CarManage,win,fx,style){
			
			if(dojo.byId("Widget_CarManage")){
				style.set("Widget_CarManage", "z-index", "200");
				fx.fadeIn({
					node : dom.byId("Widget_CarManage"),
					duration : 500,
					onEnd : function() {
							}
			}).play();
				
			}else{
				var father = dom.byId('main');
				domConstruct.create("div",{ id: "Widget_CarManage"}, father, "first");
				var CarManage = new CarManage();
				var container = dom.byId('Widget_CarManage');
				//generalAn.placeAt(win.body());
				CarManage.placeAt(container);
				CarManage.startup();
			}
		});
	});
	
	//车辆调配中心管理
	
	 //车辆调度中心
	 $("#CarControlCenter").click(function(){
		  console.log("CarControlCenter");
		 
		  require(["dojo/dom","dojo/dom-construct","extras/Widgets/CarControlCenter", "dojo/_base/window","dojo/_base/fx","dojo/dom-style","dojo/domReady!"],
		    function(dom,domConstruct,CarControlCenter,win,fx,style){
		   
		   if(dojo.byId("Widget_CarControlCenter")){
		    style.set("Widget_CarControlCenter", "z-index", "200");
		    fx.fadeIn({
		     node : dom.byId("Widget_CarControlCenter"),
		     duration : 500,
		     onEnd : function() {
		       }
		   }).play();
		   
		   }else{
		    var father = dom.byId('main');
		    domConstruct.create("div",{ id: "Widget_CarControlCenter"}, father, "first");
		    var CarControlCenter = new CarControlCenter();
		    var container = dom.byId('Widget_CarControlCenter');
		    //generalAn.placeAt(win.body());
		    CarControlCenter.placeAt(container);
		    CarControlCenter.startup();
		   }
		  });
		});
	
	
	
	//单车跟踪监控  GPSMonitor
	
	$("#GPSMonitor").click(function(){
		console.log("GPSMonitor");

		require(["dojo/dom","dojo/dom-construct","extras/Widgets/GPSMonitor", "dojo/_base/window","dojo/_base/fx","dojo/dom-style","dojo/domReady!"],
				function(dom,domConstruct,GPSMonitor,win,fx,style){
			
			if(dojo.byId("Widget_GPSMonitor")){
				style.set("Widget_GPSMonitor", "z-index", "200");
				fx.fadeIn({
					node : dom.byId("Widget_GPSMonitor"),
					duration : 500,
					onEnd : function() {
							}
			}).play();
				
			}else{
				var father = dom.byId('main');
				domConstruct.create("div",{ id: "Widget_GPSMonitor"}, father, "first");
				var GPSMonitor = new GPSMonitor();
				var container = dom.byId('Widget_GPSMonitor');
				//generalAn.placeAt(win.body());
				GPSMonitor.placeAt(container);
				GPSMonitor.startup();
			}
		});
	});
	
	

	$("#GPSMonitors").click(function(){
		  console.log("DeployCarInfoPanel");
		  
			require(["dojo/dom","dojo/dom-construct","extras/Widgets/DeployCarInfoPanel", "dojo/_base/window","dojo/_base/fx","dojo/dom-style","dojo/domReady!"],
					function(dom,domConstruct,DployCarInfoPanel,win,fx,style){
				
				if(dojo.byId("Widget_DeployCarInfoPanel")){
					style.set("Widget_DeployCarInfoPanel", "z-index", "200");
					fx.fadeIn({
						node : dom.byId("Widget_DeployCarInfoPanel"),
						duration : 500,
						onEnd : function() {
								}
				}).play();
					
				}else{
					var father = dom.byId('main');
					domConstruct.create("div",{ id: "Widget_DeployCarInfoPanel"}, father, "first");
					var DployCarInfoPanel = new DployCarInfoPanel();
					var container = dom.byId('Widget_DeployCarInfoPanel');
					//generalAn.placeAt(win.body());
					DployCarInfoPanel.placeAt(container);
					DployCarInfoPanel.startup();
				}
			});
			
		 
	});
	
});

//页面初始化后就打开的GPS监控仪表盘
function DployGaugeOpen(){
	  console.log("DployGauge");
	 
	  require(["dojo/dom","dojo/dom-construct","extras/Widgets/DeployGauge", "dojo/_base/window","dojo/_base/fx","dojo/dom-style","dojo/domReady!"],
	    function(dom,domConstruct,DeployGauge,win,fx,style){
		  
		  if(dojo.byId("Widget_DeployGauge")){
				style.set("Widget_DeployGauge", "z-index", "10");
				fx.fadeIn({
					node : dom.byId("Widget_DeployGauge"),
					duration : 500,
					onEnd : function() {
							}
			}).play();
				
			}else{
				var father = dom.byId('nav_resource2');
				domConstruct.create("div",{ id: "Widget_DeployGauge"}, father, "first");
				var DeployGauge = new DeployGauge();
				var container = dom.byId('Widget_DeployGauge');
				DeployGauge.placeAt(container);
				DeployGauge.startup();
			}
	   
	  });
};

//页面初始化后就打开的分析选区域面板
function AnalysisArea(){
	  console.log("AnalysisArea");
	 
	  require(["dojo/dom","dojo/dom-construct","extras/Widgets/AnalysisArea", "dojo/_base/window","dojo/_base/fx","dojo/dom-style","dojo/domReady!"],
	    function(dom,domConstruct,AnalysisArea,win,fx,style){
		  
		  if(dojo.byId("Widget_AnalysisArea")){
				style.set("Widget_AnalysisArea", "z-index", "10");
				fx.fadeIn({
					node : dom.byId("Widget_AnalysisArea"),
					duration : 500,
					onEnd : function() {
							}
			}).play();
				
			}else{
				var father = dom.byId('nav_resource4');
				domConstruct.create("div",{ id: "Widget_AnalysisArea"}, father, "first");
				var AnalysisArea = new AnalysisArea();
				var container = dom.byId('Widget_AnalysisArea');
				AnalysisArea.placeAt(container);
				AnalysisArea.startup();
			}
	   
	  });
};


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
	
	if(index == 0){
		 console.log("模块一初始化");
	}else if(index == 1){
		 console.log("DployGauge模块初始化");
		//加载调配车辆监控模块
		try {
			/*******************************************************************/
			DployGaugeOpen();
			/*******************************************************************/
		} catch (e) {
			// TODO: handle exception
		}
	}else if(index == 2){
		 console.log("模块三初始化");
	}else if(index == 3){
		 console.log("AnalysisArea模块初始化");
		 //加载分析选取模块
		try {
			/*******************************************************************/
			AnalysisArea();
			/*******************************************************************/
		} catch (e) {
			// TODO: handle exception
		}
	}
	
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

		$('#map').css({
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
			$('#map').css({
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
			$('#map').css({
				left : '380px'
			});
			$("#show_hide_btn").find('img').attr('src', 'images/common/nav_hide.png');
		}
	}
}
