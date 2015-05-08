<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>苏州市公共自行车调配及数据分析系统</title>

<link href="css/main_css.css" rel="stylesheet" type="text/css" />

<link rel="stylesheet" href="http://js.arcgis.com/3.13/dijit/themes/tundra/tundra.css">

	
<link rel="stylesheet" href="http://js.arcgis.com/3.13/esri/css/esri.css">

<script src="http://js.arcgis.com/3.13/"></script>


<script src="jquery/jquery-1.9.1.js"></script>


<script type="text/javascript" src="dojo/jsapi_vsdoc10_v38.js"></script>
<script type="text/javascript" src="js/commonAll.js"></script>
<script type="text/javascript" src="js/MainMap.js"></script>

<!-- 表格控件 -->

<script type="text/javascript" src="js/PlugIn/colResizable-1.3.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/PlugInCSS/colResizable-1.3.min.css" />


</head>
<body class="tundra">

	<div id="top">
		<div id="top_logo">
			<img alt="logo" src="images/common/logo.jpg" width="548" height="49"
				style="vertical-align: middle;">
		</div>
		<div id="top_links">
			<div id="top_op">
				<ul>
					<li><img alt="当前用户" src="images/common/user.jpg">： <span
						id="username"></span></li>
					<li><div id="search"></div></li>
				</ul>
			</div>
			<div id="top_close">
				<a href="javascript:void(0);" onClick="logout();" target="_parent">
					<img alt="退出系统" title="退出系统" src="images/common/close.jpg"
					style="position: relative; top: 10px; left: 25px;">
				</a>
			</div>
		</div>
	</div>

	<!-- side menu start -->
	<div id="side">
		<div id="left_menu">
			<ul id="TabPage2" style="height: 200px; margin-top: 50px;">

				<li id="left_tab1" class="selected" title="业务模块"><img
					title="业务模块" src="images/common/1_hover.jpg" width="33" height="31">
				</li>

				<li id="left_tab2" title="系统管理"><img title="系统管理"
					src="images/common/2.jpg" width="33" height="31"></li>

				<li id="left_tab3" title="其他"><img title="其他"
					src="images/common/3.jpg" width="33" height="31"></li>

			</ul>

			<div id="nav_show"
				style="position: absolute; bottom: 0px; padding: 10px;">
				<a href="javascript:;" id="show_hide_btn"> <img title="显示/隐藏"
					src="images/common/nav_hide.png" width="35" height="35">
				</a>
			</div>

		</div>

		<div id="left_menu_cnt">
			<div id="nav_module">
				<img src="images/common/module_1.png" width="210" height="58" />
			</div>
			<div id="nav_resource1" class="nav_resource">站点操作
			
			
		
		
		</div>
		
			<div id="nav_resource2" class="nav_resource">2</div>
			<div id="nav_resource3" class="nav_resource">3</div>

		</div>
	</div>
	<!-- 地图控件部分 	-->
	<div id="main">
		<div id="HomeButton"></div>
		<div id="titlePane" data-dojo-type="dijit/TitlePane"
			data-dojo-props="title:'地图测量', close:'true'">
			<div id="measurementDiv"></div>
		</div>
	</div>

</body>
</html>