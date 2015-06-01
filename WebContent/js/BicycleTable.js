var namesearch;
var template;
var editFlag;
var updateFeature;
/**
 *判断是否编辑 
 */
var	editFlag = true;

$(document).ready(function() {

	var tpl = $("#tpl").html();
	//预编译模板
	template = Handlebars.compile(tpl);
   
	/**
	 *点的添加
	 */
	$("div.add").click(function() {
		alert("在数据库和地图上添加一个站点，并记录操作数据1");
	});

   /**
    *点击行点中心显示 
    */ 
	$('#bicycleTable tbody').on('click', 'td.details-search', function() {
		var tr = $(this).closest('tr');
		namesearch = $('td', tr).eq(2).text();
		console.log(namesearch);
		Show();
	});
	/**
    *点击行点中心显示 
    */ 
	$('#bicycleTable tbody').on('click', 'td.sorting_1', function() {
		var tr = $(this).closest('tr');
		namesearch = $('td', tr).eq(2).text();
		console.log(namesearch);
		Show();
	});
	/**
 	*点击显示详情 
 	*/
	$('#bicycleTable tbody').on('click', 'td.details-control', function() {
		var tr = $(this).closest('tr');
		console.log(tr);
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		} else {
			// Open this row
			row.child(format(row.data())).show();
			tr.addClass('shown');
		}
	});
	
	// $('#bicycleTable tbody').on('click', 'td.details-edit', function() {
		// var Edit_tr = $(this).closest('tr');
		// var Edit_row = table.row(Edit_tr);
		// console.log(namesearch+"霍一心");
// 		
	// });
	
});

//点击条目展开后显示的样式
function format(d) {
	return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:6px; padding-right:6px;">' + '<tr>' + '<td>地址:</td>' + '<td>' + d.address + '</td>' + '</tr>' + '<tr>' + '<td>状态:</td>' + '<td>' + d.state + d.remarks + '</td>' + '</tr>' + '<tr>' + '<td>运行时间:</td>' + '<td>' + d.time + '</td>' + '</tr>' + '<tr>' + '<td>值班电话:</td>' + '<td>' + d.tel + '</td>' + '</tr>' + '</table>';
}

/**
 *编辑按钮点击后开始编辑，获得表中的参数并修改
 */
function PointEditing(name, number, address, remarks, time, tel) {
	console.log(name + number);
	/**
	 *点击后开始按编号查询  弹出对象的可编辑infowindow
	 */
	require([
		"esri/graphic",	
        "esri/layers/FeatureLayer",
        "esri/dijit/AttributeInspector",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/PictureMarkerSymbol",
        "esri/Color",
        "esri/config",
        "esri/tasks/query",
        "dojo/query",
        "dojo/parser", 
        "dojo/dom-construct",
        "dijit/form/Button",
        "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"
				], 
	function(
 		Graphic,FeatureLayer,AttributeInspector,
        SimpleLineSymbol, SimpleFillSymbol,PictureMarkerSymbol, Color,esriConfig,
        Query,dojoQuery,
        parser, domConstruct, Button
			) {

		//设置AttributeInspector
		var attInspector = new AttributeInspector({layerInfos : layerInfos}, domConstruct.create("div"));
   		var saveButton = new Button({ label: "保存", "class": "saveButton"},domConstruct.create("div"));
		domConstruct.place(saveButton.domNode, attInspector.deleteBtn.domNode, "after");

		//点击保存
        saveButton.on("click", function() {
          	 console.log("saveButton");
        	if(confirm("将进行修改操作，操作记录将会被详细记录。是否确认修改！")){
	 			//先是在地图属性中修改
         		updateFeature.getLayer().applyEdits(null, [updateFeature], null);
           		map.infoWindow.hide();
				map.graphics.clear();

                //alert("点数据已经修改");
	 		}else{
	 	 		//alert("操作已放弃");
	 		}
           		
        });
        
		//内容更改
        attInspector.on("attribute-change", function(evt) {
          	console.log("attribute-change");
         	updateFeature.attributes[evt.fieldName] = evt.fieldValue;
        });

        attInspector.on("next", function(evt) {
          	console.log("attribute-next");
            updateFeature = evt.feature;
            console.log("Next " + updateFeature.attributes.objectid);
        });
		
		//点击删除按钮后
        attInspector.on("delete", function(evt) {
         	console.log("delete");
			if(confirm("将进行删除操作，操作记录将会被详细记录。是否确认删除！")){
	 		//先是在地图属性中删除
         		evt.feature.getLayer().applyEdits(null, null, [evt.feature]);
          		map.infoWindow.hide();
          		map.graphics.clear();

	 		}else{
	 	 	//alert("操作已放弃");
	 		}        
     	});
         
		/**
		 *通过获取被点击表格信息的编号，查询图层得到对应的  
		 */
		// var selectQuery = new Query();
		// selectQuery.where = "NO = '" + number + "'";
		// PointEdit.queryFeatures(selectQuery, function(results) {
			// updateFeature = results.features;
			// console.log(updateFeature);
			// var screenPoint = map.toScreen(updateFeature[0].geometry);
			// selectQuery.geometry = updateFeature[0].geometry;
			
		    // PointEdit.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW, function(features) {
              // if (features.length > 0) {
				// //拿到当前查到的图形
                // updateFeature = features[0];
                // map.infoWindow.setTitle("属性编辑");
                // console.log("坐标"+screenPoint.x+screenPoint.y);
                // //显示含有attribute的IforWindows
                // map.infoWindow.show(screenPoint, map.getInfoWindowAnchor(screenPoint));
                // //设置标志
				// var picsms = new PictureMarkerSymbol("/PublicBicycleSys/images/animate.gif",21, 56);
				// map.graphics.add(new Graphic(updateFeature.geometry, picsms));
                // //设置显示点居中显示
                // map.centerAndZoom(updateFeature.geometry, 16);
              // }
              // else {
                // map.infoWindow.hide();
              // }
            // });
         
		// });
		map.graphics.clear();
		
		var selectQuery = new Query();
		selectQuery.where = "NO = '" + number + "'";		
		PointEdit.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW, function(features) {
              if (features.length > 0) {
				//拿到当前查到的图形
                updateFeature = features[0];
                //拿到屏幕坐标
                var screenPoint = map.toScreen(updateFeature.geometry);
                map.infoWindow.setTitle("属性编辑");
                console.log("坐标"+screenPoint.x+screenPoint.y);
                //显示含有attribute的IforWindows
                map.infoWindow.show(screenPoint, map.getInfoWindowAnchor(screenPoint));
                //设置标志
				var picsms = new PictureMarkerSymbol("/PublicBicycleSys/images/animate.gif",21, 56);
				map.graphics.add(new Graphic(updateFeature.geometry, picsms));
                //设置显示点居中显示
                map.centerAndZoom(updateFeature.geometry, 16);
              }
              else {
                map.infoWindow.hide();
              }
            });
            
		map.infoWindow.setContent(attInspector.domNode);
		map.infoWindow.resize(300, 400);
	
	});

	
	//当编辑结束时刷新显示图层
	    PointEdit.on("edits-complete", function() {
	    	console.log("BicyclePoint.refresh");
          	BicyclePoint.refresh();
        });
}

/**
 *根据编号信息定位点的位置并显示对应的特殊图标和InforWinow
 */
function Show() {

	require(["esri/graphic", "dojo/dom", "esri/tasks/query", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/PictureMarkerSymbol","dojo/_base/Color", "esri/tasks/query", "esri/tasks/QueryTask"], function(Graphic, dom, query, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol,PictureMarkerSymbol, Color, Query, QueryTask) {
		console.log(namesearch);
		map.graphics.clear();
		//map.infoWindow.hide();
		var query = new Query();
		query.where = "NO = '" + namesearch + "'";
		BicyclePoint.queryFeatures(query, function(results) {
			var features = results.features;
			//设置标志
			var picsms = new PictureMarkerSymbol("/PublicBicycleSys/images/animate.gif",21, 56);
			map.graphics.add(new Graphic(features[0].geometry, picsms));
			//显示InforWindow
			var screenPoint = map.toScreen(features[0].geometry);
			map.infoWindow.resize(300, 200);
			map.infoWindow.setTitle("站点信息");
			//获取InforWindow显示的数据
			var attr = features[0].attributes;
          	var address=attr.ADDRESS, name=attr.NAME, state=attr.TYPE, number=attr.NO, time=attr.TIME, tel=attr.TEL, remarks=attr.STATE;
          	var tamplet = "<b>站点名称：</b>"+name+"租赁点<br/>"
									+ "<b>站点编号：</b>"+number+"<br/>" 
									+ "<b>服务时间：</b>"+time+"<br/>"
									+ "<b>值守状态：</b>"+state+"<br/>"
									+ "<b>站点地址：</b>"+address+"<br/>" 
									+ "<b>联系电话：</b>"+tel+"<br/>"
									+ "<b>站点状态：</b>"+state+"<br/>";
			map.infoWindow.setContent(tamplet);
			map.infoWindow.show(screenPoint, map.getInfoWindowAnchor(screenPoint));
			//移动到视野中心
			map.centerAndZoom(features[0].geometry, 16);
		});
		
	});

}
