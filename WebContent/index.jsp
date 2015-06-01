<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>杭州市公共自行车调配及数据分析系统</title>

<link href="css/main_css.css" rel="stylesheet" type="text/css" />



<!-- buttons按钮css库 -->
<link href="css/PlugInCSS/buttons.css" rel="stylesheet" type="text/css" />
<link href="css/PlugInCSS/font-awesome.min.css" rel="stylesheet" type="text/css" />
<!-- font-awesome图标字体库 -->
<link rel="stylesheet" href="css/PlugInCSS/font-awesome.css">

<!-- Arcgis API CSS-->
<!-- <link rel="stylesheet" href="http://js.arcgis.com/3.13/dijit/themes/tundra/tundra.css"> -->
<!-- <link rel="stylesheet" href="http://localhost:8081/arcgis_js_api/library/3.13/3.13/dijit/themes/tundra/tundra.css"> -->
   <link rel="stylesheet" href="http://js.arcgis.com/3.13/dijit/themes/claro/claro.css">
<link rel="stylesheet" href="http://js.arcgis.com/3.13/esri/css/esri.css">
<!-- <link rel="stylesheet" href="http://localhost:8081/arcgis_js_api/library/3.13/3.13/esri/css/esri.css"> -->

<!-- 表格控件css -->
<link rel="stylesheet" type="text/css" href="css/PlugInCSS/jquery.dataTables.css">
<link rel="stylesheet" type="text/css" href="css/PlugInCSS/tabledemo.css">


<script src="http://js.arcgis.com/3.13/"></script>
<!-- <script src="http://localhost:8081/arcgis_js_api/library/3.13/3.13/init.js"></script> -->


<script type="text/javascript" language="javascript" src="jquery/jquery.js"></script>

<!-- handlebars -->
<script type="text/javascript" language="javascript" src="js/PlugIn/handlebars-1.0.0.beta.6.js"></script>
<!-- 整体页面控制jquery -->
<script type="text/javascript" src="js/commonAll.js"></script>
<!-- 地图操作部分dojo -->
<script type="text/javascript" src="js/MainMap.js"></script>


<!-- 表格 -->
<script type="text/javascript" language="javascript" src="js/PlugIn/jquery.dataTables.js"></script>
<script type="text/javascript" language="javascript" src="js/PlugIn/shCore.js"></script>
<script type="text/javascript" language="javascript" src="js/PlugIn/demo.js"></script>
<script type="text/javascript" language="javascript" src="js/BicycleTable.js"></script>

<!-- <script type="text/javascript" language="javascript" src="/PublicBicycleSys/js/PlugIn/pace1.0.2.js"></script> -->
<!-- <link rel="stylesheet" type="text/css" href="/PublicBicycleSys/css/PlugInCSS/pace-themes/white/pace-theme-flat-top.css"> -->

</head>
<body class="claro">

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

				<li id="left_tab1" class="selected" title="站点管理"><img
					title="站点管理" src="images/common/1_hover.jpg" width="33" height="31">
				</li>

				<li id="left_tab2" title="站点监控"><img title="站点监控"
					src="images/common/2.jpg" width="33" height="31"></li>

				<li id="left_tab3" title="任务分配"><img title="任务分配"
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
				<img src="images/common/module_1.png" width="280" height="58" />
			</div>
			<div id="nav_resource1" class="nav_resource">
				<table id="bicycleTable" class="display" cellspacing="0" width="100%">
					<thead>
						<tr>
							<th></th>
							<th>租赁点名</th>
							<th>NO.</th>
							<th></th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
<!--定义操作列按钮模板-->
<script id="tpl" type="text/x-handlebars-template">
    {{#each func}}
    <button type="button" class="button button-{{this.type}} button-box button-tiny" onclick="{{this.fn}}"><i class="fa fa-pencil fa-lg"></i></button>
    {{/each}}
</script>
			</div>
			<div id="nav_resource2" class="nav_resource"></div>
			<div id="nav_resource3" class="nav_resource"></div>
		</div>
	</div>
	<!-- 地图控件部分 	-->
	<div id="main">
		<div id="HomeButton"></div>
		<div id="BasemapToggle"></div>
		<div id="titlePane" data-dojo-type="dijit/TitlePane" data-dojo-props="title:'地图测量', close:'true'">
		<div id="measurementDiv"></div>
		</div>
	</div>

</body>
</html>
