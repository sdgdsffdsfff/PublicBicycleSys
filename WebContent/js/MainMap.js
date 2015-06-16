var map = null;
var MyTiledMapServiceLayer;
/**
 *  显示站点的动态图层是一个MapService
 */
var BicyclePoint = null;
/**
 * 用来编辑站点的FeatureLayer
 */
var PointEdit = null;
/**
 * 用来编辑站点的AttributeInspector的layerInfos
 */
var layerInfos ;
/**
 * graphics遍历得来的所有点的属性字符串
 */
var data = "";
var JsonData;
/**
 * 显示租赁点的jquery的DataTable
 */
var table = null;
/**
 * 防止DataTable在map的update-end事件中多次被调用导致错误
 */
var isfirst = true;
/**
 * 点击地图时功能是否为增加点
 */
var isAdd = false;

require([	
	"dojo/parser",
	"esri/config",

	"esri/tasks/GeometryService",
	"esri/map",
	"esri/InfoTemplate",
	"esri/layers/ArcGISTiledMapServiceLayer",
	"esri/layers/FeatureLayer",
	"esri/dijit/Search",
	"esri/dijit/HomeButton",
	"esri/dijit/Scalebar",
	"esri/dijit/OverviewMap",
	"esri/dijit/Measurement",
	
	"esri/dijit/AttributeInspector",
    "dijit/form/Button",
    "dojo/dom-construct",
    
    "esri/tasks/query",
    
    "esri/graphic",
    "esri/symbols/PictureMarkerSymbol",
    //聚类图层
    "dojo/ready",
    "dojo/_base/array",
    "esri/Color",
    "esri/tasks/QueryTask",  
    "esri/request",
    "esri/geometry/Extent",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/renderers/ClassBreaksRenderer",
    "esri/layers/GraphicsLayer",
    "esri/SpatialReference",
    "esri/dijit/PopupTemplate",
    "esri/geometry/Point",
    "esri/geometry/webMercatorUtils",
    "extras/ClusterLayer",
    
	"dojo/on",
	"dojo/dom",
	"dojo/keys",
	"dijit/TitlePane",
	"dojo/domReady!"], 
 	function(
 			parser, esriConfig,GeometryService,Map,InfoTemplate,ArcGISTiledMapServiceLayer,FeatureLayer,Search,
 			HomeButton, Scalebar, OverviewMap,Measurement,AttributeInspector, Button, domConstruct,Query,Graphic,PictureMarkerSymbol,
 			//聚类图层
 			ready, arrayUtils, Color,QueryTask, esriRequest, Extent,
 	        SimpleMarkerSymbol, SimpleFillSymbol, ClassBreaksRenderer,
 	        GraphicsLayer, SpatialReference, PopupTemplate, Point, webMercatorUtils,
 	        ClusterLayer,
 	        
 			on,dom
 			) {
	
		parser.parse();
		
		//esriConfig.defaults.io.proxyUrl = "/proxy/";
		//esriConfig.defaults.io.alwaysUseProxy = false;

		esriConfig.defaults.geometryService = new GeometryService("http://localhost:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");
	

		 
		map = new Map("main", {
		 
			logo : false,
			zoom : 14,
			isKeyboardNavigation : false,
			center: [120.171837, 30.251017]
			});
		
		          
		// 瓦片杭州地图图层
		MyTiledMapServiceLayer = new ArcGISTiledMapServiceLayer(
				"http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer");
		
		//用于站点显示的FeatureLayer是一个FutureService
		BicyclePoint = new FeatureLayer("http://localhost:6080/arcgis/rest/services/BicyclePoint/FeatureServer/0",
				{
					mode : FeatureLayer.MODE_SNAPSHOT,   //MODE_SNAPSHOT
					//infoTemplate : infoTemplate,
					outFields : [ "NO", "NAME", "TIME", "TYPE", "ADDRESS","TEL", "STATE" ],
					id: "BicyclePoint"
				});
		
		//用于站点属性编辑的FeatureLayer是一个FutureService
		PointEdit = new FeatureLayer("http://localhost:6080/arcgis/rest/services/BicyclePoint/FeatureServer/0", {
	          mode: FeatureLayer.MODE_SELECTION,
	          outFields: [ "NO", "NAME", "TIME", "TYPE", "ADDRESS","TEL", "STATE" ],
	          id: "PointEdit"
	        });
	    map.addLayers([MyTiledMapServiceLayer,BicyclePoint,PointEdit]);

	    
//	    
//	    //聚类显示
//		//新建聚类图层
		var clusterLayer;
	
		map.on("load", function () {  
            //使用Query 进行查询要素  
                    var queryTask = new QueryTask("http://localhost:6080/arcgis/rest/services/BicyclePoint/FeatureServer/0");  
                    var query = new Query();  
                    query.returnGeometry = true;  
                    query.outFields = ["*"];  
                    query.outSpatialReference = { wkid: 102100 };  
                    query.where = "ObjectID<10000";  
                    queryTask.execute(query, addClusters);  
                });  
		
        function addClusters(resp) {  
            var photoInfo = {};  
            //将查询的要素安装ClusterLayer要求的数组对象进行重新组合  
                photoInfo.data = arrayUtils.map(resp.features, function (p) {  
                    var attributes = {  
                        "站点编号": p.attributes["NO"],  
                        "站点名称": p.attributes["NAME"],  
                        "营业时间": p.attributes["TIME"],  
                        "站点类型": p.attributes["TYPE"],
                        "站点地址": p.attributes["ADDRESS"],  
                        "值班电话": p.attributes["TEL"],  
                        "运行状态": p.attributes["STATE"]
                    };  
                    return {  
                        "x": p.geometry.x,  
                        "y": p.geometry.y,  
                        "attributes": attributes  
                    };  
                });  
           // cluster layer that uses OpenLayers style clustering  
            clusterLayer = new ClusterLayer({  
                "data": photoInfo.data,  
                "distance": 100,  
                "id": "clusters",  
                "labelColor": "#fff",  
                "labelOffset": 10,  
                "resolution": map.extent.getWidth() / map.width,  
                "singleColor": "#888"  
                  
            });  
            var defaultSym = new SimpleMarkerSymbol().setSize(4);  
            var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");  

            var picBaseUrl = "http://static.arcgis.com/images/Symbols/Shapes/";  
            var blue = new PictureMarkerSymbol(picBaseUrl + "BluePin1LargeB.png", 32, 32).setOffset(0, 15);  
            var green = new PictureMarkerSymbol(picBaseUrl + "GreenPin1LargeB.png", 64, 64).setOffset(0, 15);  
            var red = new PictureMarkerSymbol(picBaseUrl + "RedPin1LargeB.png", 72, 72).setOffset(0, 15);  
            renderer.addBreak(0, 2, blue);  
            renderer.addBreak(2, 50, green);  
            renderer.addBreak(51, 1001, red);  

            clusterLayer.setRenderer(renderer);  
            map.addLayer(clusterLayer);  

            // close the info window when the map is clicked  
            map.on("click", cleanUp);  
            // close the info window when esc is pressed  
            map.on("key-down", function (e) {  
                if (e.keyCode === 27) {  
                    cleanUp();  
                }  
            });  
        }  
        
        
        function cleanUp() {  
            map.infoWindow.hide();  
            clusterLayer.clearSingles();  
        }  

        function error(err) {  
            console.log("something failed: ", err);  
        }       
        
//        //以上为新加的
		
	    //搜索栏
		 var s = new Search({
			 map: map,
			 addLayersFromMap :true,
		 }, "search");
	     s.startup();
	         
		// Home按钮
		var homeButton = new HomeButton({
			theme : "HomeButton",
			map : map,
			extent : null,
			visible : true
		}, "HomeButton");
		homeButton.startup();

		// 比例尺
		scalebar = new Scalebar({
			map : map,
			scalebarUnit : "dual"
		});

		// 鹰眼
		overviewMapDijit = new OverviewMap({
			map : map,
			attachTo : "bottom-right",
			color : "grey",
			width : 400,
			height : 250,
			opacity : 0.30,
			visible : true,
			expandFactor : 1.2
		});
		overviewMapDijit.startup();

		 //量算工具
		measurement = new Measurement({
			map : map
		}, dojo.byId("measurementDiv"));
		measurement.startup();
		
		//编辑用的attribute的layerinfos设置
		layerInfos = [{
			'featureLayer' : PointEdit,
			'showDeleteButton':true,
			'showAttachments' : false,
			'isEditable' : true,
			'fieldInfos' : [{'fieldName' : 'NO','isEditable' : false,'label' : '站点编号:'}, 
							{'fieldName' : 'NAME','isEditable' : true,'label' : '站点名称:'}, 
							{'fieldName' : 'TIME','isEditable' : true,'label' : '营业时间:'}, 
							{'fieldName' : 'TYPE','isEditable' : true,'tooltip': 'The name of this oil field', 'label': 'Field Name:'}, 
							{'fieldName' : 'ADDRESS','isEditable' : true,'label' : '站点地址:'}, 
							{'fieldName' : 'TEL','isEditable' : true,'label' : '值班电话:'}, 
							{'fieldName' : 'STATE','isEditable' : true,'label' : '运行状态:'}]
		}];
		
		
		//初始化站点管理的表格
		on(map, "update-end", function(event){
			//拿到json格式的字符串
			if(isfirst){
			GetPointData();
				SetDataTable();
				isfirst = false;
			}
			//修改数据时进行表格更新  用个isEdit来判断一下
			if (isEdit) {
				GetPointData();
				$('#bicycleTable').dataTable().api().clear().rows.add(JsonData).draw();
				isEdit = false;
			}
			
        });
		
		
		
		on(map.infoWindow, "hide", function(evt){
			map.graphics.clear();
			$('#bicycleTable').dataTable().api().search("").draw();
			console.log("infoWindow.hide");
		});
		
		
		//初始化站点管理的表格
		on(map, "click", function(evt){
			
			//点击地图的点显示inforwindow的demo
				 var query = new Query();
				 if (evt.graphic === undefined) {
						console.log("hide"); 
						map.infoWindow.hide();
						map.graphics.clear();
				} else {
							map.graphics.clear();
							query.geometry = evt.graphic.geometry;
							BicyclePoint.queryFeatures(query, function(results) {
							var features = results.features;
							console.log(features.length); 
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
						    var tamplet2 = "<b>站点名称：</b>"+name+"租赁点<br/>"
															+ "<b>站点编号：</b>"+number+"<br/>" 
															+ "<b>服务时间：</b>"+time+"<br/>"
															+ "<b>值守状态：</b>"+state+"<br/>"
															+ "<b>站点地址：</b>"+address+"<br/>" 
															+ "<b>联系电话：</b>"+tel+"<br/>"
															+ "<b>站点状态：</b>"+state+"<br/>";
							map.infoWindow.setContent(tamplet2);
							map.infoWindow.show(screenPoint, map.getInfoWindowAnchor(screenPoint));
							
							//表格查询并锁定
							GetPointData();
							$('#bicycleTable').dataTable().api().clear().rows.add(JsonData).draw();
							$('#bicycleTable').dataTable().api().search(number).draw();
						});
				}
			ClickMap(evt);
        });
		
});



/**
 * 拿到图层中所有graphic的attribute
 * Json数据格式
 * {"address":"孝女路与学士路东北角","name":"市一医院北","state":"有人值守","number":1010,"time":"6:00-21:00","tel":"13606524069","remarks":"正常营运中"}
 */
function GetPointData(){
	
	  var graphics=BicyclePoint.graphics;
      var dataString = "";
      for(var i=0;i<graphics.length;i++){
          var attr = graphics[i].attributes;
          var address=attr.ADDRESS, name=attr.NAME
          , state=attr.TYPE, number=attr.NO
          , time=attr.TIME, tel=attr.TEL
          , remarks=attr.STATE;
          dataString+= "{\"address\":\""+address+"\",\"name\":\""+name+"\",\"state\":\""+state+"\",\"number\":"+number+",\"time\":\""+time+"\",\"tel\":\""+tel+"\",\"remarks\":\""+remarks+"\"},";
      }
      data = "["+dataString+"]";
      console.log("更新了dataString"+graphics.length); 
      JsonData = eval('(' + data + ')'); 
}
/**
 * 初始化DataTable
 */
function SetDataTable(){
	
      	table = $('#bicycleTable').DataTable({
   	 
    	"data": JsonData,
    	  
  		"aoColumnDefs" : [{
  			//设置第一列不排序
  			"bSortable" : false,
  			"aTargets" : [1, 3]
  		}],
  		"autoWidth" : false,
  		"scrollCollapse" : true,
  		"scrollY" : "727px",
  		"scrollCollapse" : true,
  		"paging" : false,

  		"dom" : '<"top"f<"add">>t<"bottom"i><"clear">',

  		"deferRender" : true,
  		
  		 "columns" : [{
		 "class" : 'details-control',
		 "orderable" : false,
		 "data" : null,
		 "defaultContent" : ''
	 }, {
		 "data" : "name",
	 }, {
		 "data" : "number",
		 "class" : "details-search"
	 }, {
		 "data" : null,
		 "class" : 'details-edit',
		 "width" : "10%",
		 "render" : function(data, type, row, meta) {
			 var context = {
				 func : [{
					 "name" : "修改",
					 "fn" : "PointEditing(\'" + row.name + "\',\'" + row.number + "\',\'" + row.address + "\',\'" + row.remarks + "\',\'" + row.time + "\',\'" + row.tel + "\')",
					 "type" : "primary"
				 }]
			 };
			 var html = template(context);
			 return html;
		 }
	 }],

	 "order" : [[1, 'asc']],

	 "language" : {
		 "sProcessing" : "处理中...",
		 "sLengthMenu" : "显示 _MENU_ 项结果",
		 "sZeroRecords" : "没有匹配结果",
		 "sInfo" : "共 _TOTAL_ 项",
		 "sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
		 "sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
		 "sSearch" : "条件筛选：",
		 "sEmptyTable" : "表中数据为空",
		 "sLoadingRecords" : "载入中...",
		 "sInfoThousands" : ",",
		 "oPaginate" : {
			 "sFirst" : "首页",
			 "sPrevious" : "上页",
			 "sNext" : "下页",
			 "sLast" : "末页"
		 },
	 }
  	});
      //添加按钮
    $("div.add").html('<button id = "addpoint" class="button button-primary button-square button-small"><i class="fa fa-plus"></i></button>');
	/**
	 *点的添加
	 */
	$("#addpoint").click(function() {
		alert("在数据库和地图上添加一个站点，并记录操作数据1");
		
		//给鼠标加一个图标（暂时不做）
		//更改一个标志值，使点击事件的结果为添加点
		isAdd = true;
		//剩下的事交给地图的点击监听来做（写成回调）
		
	});
}

/**
 * 地图点击
 */
function ClickMap(evt){
	console.log("地图被点击了");
	if (isAdd) {
		console.log("添加点开始");
		//添加点的方法
		 require([
		          "esri/layers/FeatureLayer",
		          "esri/graphic",
		          "esri/symbols/PictureMarkerSymbol",
		          "esri/dijit/AttributeInspector",
		          "dojo/dom-construct",
		          "dijit/form/Button",
		          "esri/tasks/query",

		        ], function(
		        		FeatureLayer,Graphic,PictureMarkerSymbol,AttributeInspector,domConstruct, Button,Query
		        ) {
			 			
		  var PointEdit = map.getLayer("PointEdit");
		  var BicyclePoint = map.getLayer("BicyclePoint");
		  
		  var charactors="1234567890";
		  var number='',i;
		  for(j=1;j<=5;j++){
		  	i = parseInt(10*Math.random()); 
		  	number = number + charactors.charAt(i);
		  }
		  
		  //新建临时属性
		  var PointAttributes = {
				 NO:number,
				 NAME:"站点名称",
		  		 TIME:"营业时间",
		  		 TYPE:"值守状态",
		  		 ADDRESS:"站点地址",
		  		 TEL:12345678901,
		  		 STATE:"运行状态"
	      };
		  //添加点
		 var picsms = new PictureMarkerSymbol("/PublicBicycleSys/images/animate.gif",21, 56);
         var PointGraphic = new Graphic(evt.mapPoint, picsms, PointAttributes);
         PointEdit.applyEdits([PointGraphic],null,null);
          
         PointEditing("新建点", number, "无", "无", "无", "无");
            
		 });
		 isAdd = false;
	} else {

		
	}
	
	
	
	
}