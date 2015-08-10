var URL =  "http://219.231.176.26:6080/arcgis/rest/services"
var map = null;
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
	    "extras/ErgodicPoint",
	    
	    "esri/layers/FeatureLayer",
	    "esri/graphic",
	    "esri/symbols/PictureMarkerSymbol",
	    "esri/dijit/AttributeInspector",
	    "dojo/dom-construct",
	    "dijit/form/Button",
	    "esri/tasks/query",
          
	    
		"dojo/query",
		"dojo/dom-style",
		"dojo/on",
		"dojo/dom",
		"dojo/keys",
		"dijit/TitlePane",
		"dojo/domReady!"], 
 	function(
	 			parser, 
	 			esriConfig,
	 			GeometryService,
	 			Map,
	 			InfoTemplate,
	 			ArcGISTiledMapServiceLayer,
	 			FeatureLayer,
	 			Search,
	 			HomeButton, 
	 			Scalebar, 
	 			OverviewMap,
	 			Measurement,
	 			AttributeInspector, 
	 			Button, 
	 			domConstruct,
	 			Query,
	 			Graphic,
	 			PictureMarkerSymbol,
	 			//聚类图层
	 			ready, 
	 			arrayUtils, 
	 			Color,
	 			QueryTask, 
	 			esriRequest, 
	 			Extent,
	 	        SimpleMarkerSymbol, 
	 	        SimpleFillSymbol, 
	 	        ClassBreaksRenderer,
	 	        GraphicsLayer, 
	 	        SpatialReference, 
	 	        PopupTemplate, 
	 	        Point, 
	 	        webMercatorUtils,
	 	        ClusterLayer,
	 	        ErgodicPoint,
	 	        
	 	        FeatureLayer,
	 	        Graphic,
	 	        PictureMarkerSymbol,
	 	        AttributeInspector,
	 	        domConstruct, 
	 	        Button,
	 	        Query,
	 	        
	 	        query,
	 	        style,
	 	        on,
	 	        dom
 			) {
	
				parser.parse();
		
				esriConfig.defaults.io.proxyUrl = "/PublicBicycleSys/jsps/proxy.jsp";
				esriConfig.defaults.io.alwaysUseProxy = false;

				esriConfig.defaults.geometryService = new GeometryService(URL+"/Utilities/Geometry/GeometryServer");
	

		 
				map = new Map("main", {
					logo : false,
					zoom : 14,
					center: [120.171837, 30.251017]
				});
		
		          
				// 瓦片杭州地图图层
				var MyTiledMapServiceLayer = new ArcGISTiledMapServiceLayer(
				"http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer");
				//用于站点显示的FeatureLayer是一个FutureService
				var BicyclePoint = new FeatureLayer(URL+"/PublicBicyclePoint/FeatureServer/1",{
						mode : FeatureLayer.MODE_SNAPSHOT,
						outFields : [ "NO", "NAME", "TIME", "TYPE", "ADDRESS","TEL", "STATE" ],
						id: "BicyclePoint"
						});
				//显示调度服务区的点
				var PointFw = new FeatureLayer(URL+"/PublicBicyclePoint/FeatureServer/0", {
						mode: FeatureLayer.MODE_SNAPSHOT,
						outFields: ["*"],
						id: "PointFw"
						});
				map.addLayers([MyTiledMapServiceLayer,BicyclePoint,PointFw]);
	    
				var homeButton = new HomeButton({
						theme : "HomeButton",
						map : map,
						extent : null,
						visible : true
						}, "HomeButton");
				homeButton.startup();

				scalebar = new Scalebar({
						map : map,
						scalebarUnit : "dual"
						});

				overviewMapDijit = new OverviewMap({
						map : map,
						attachTo : "bottom-right",
						color : "blue",
						width : 300,
						height : 200,
						opacity : 0.30,
						visible : true,
						expandFactor : 1.2
						});
				overviewMapDijit.startup();

				measurement = new Measurement({
						map : map
						}, dojo.byId("measurementDiv"));
				measurement.startup();
		
		
				//编辑用的attribute的layerinfos设置
				layerInfos = [{
						'featureLayer' : BicyclePoint,//以前是pointedit
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
		
				map.on("load", function () {  
							//使用Query进行查询要素为聚类图层和站点信息表准备数据
		                    var queryTask = new QueryTask(URL+"/PublicBicyclePoint/FeatureServer/1");  
		                    var query = new Query();  
		                    query.returnGeometry = true;  
		                    query.outFields = ["*"];  
		                    query.outSpatialReference = { wkid: 102100 };  
		                    query.where = "1=1";  
		                    queryTask.execute(query, addClusters);  
		                });  
        
				on(map, "update-end", function(event){
		
		        });
		
		
				on(map.infoWindow, "hide", function(evt){
					map.graphics.clear();
					$('#bicycleTable').dataTable().api().search("").draw();
					var EPoint = new ergod();
				});
		
		
				on(map, "click", function(evt){
					//点击地图的点 来显示inforwindow
					var query = new Query();
					if (isAdd) {
							console.log("添加点开始");				 			
							var BicyclePoint = map.getLayer("BicyclePoint");
									  
							var charactors="1234567890";
							var number='',i;
							for(j=1;j<=5;j++){
							  	i = parseInt(10*Math.random()); 
							  	number = number + charactors.charAt(i);
							}
							
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
					         BicyclePoint.applyEdits([PointGraphic],null,null);
					          
					         PointEditing("新建点", number, "无", "无", "无", "无");				            
					
							 isAdd = false;
					}
							
							
					if (evt.graphic === undefined) {
					 
							 var node = dojo.query(".esriPopup");
							 var visibilityStyle = style.getComputedStyle(node[0]).visibility;
							 if( visibilityStyle == "visible"){
									
									map.infoWindow.hide();
									map.graphics.clear();
									
							 }
							 
					}else{
							map.graphics.clear();
							query.geometry = evt.graphic.geometry;
							var BicyclePoint = map.getLayer("BicyclePoint");
							BicyclePoint.queryFeatures(query, function(results) {
							var features = results.features;
							
							var picsms = new PictureMarkerSymbol("/PublicBicycleSys/images/animate.gif",21, 56);
							map.graphics.add(new Graphic(features[0].geometry, picsms));
						
							var screenPoint = map.toScreen(features[0].geometry);
							map.infoWindow.resize(300, 200);
							map.infoWindow.setTitle("站点信息");
							
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
							
							var EPoint = new ergod();
							$('#bicycleTable').dataTable().api().search(number).draw();
						});
					}
						
				});
		
			    function addClusters(resp) {  
		            		var BicycleInfo = {};  
		            		//将查询的要素安装ClusterLayer要求的数组对象进行重新组合  
			            	BicycleInfo.data = arrayUtils.map(resp.features, function (p) {  
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
			            	
			           			            	
			            	var features=resp.features;
				      	    var dataString = "";
				      	    var data = "";
				      	      for(var i=0;i<features.length;i++){
				      	          var attr = features[i].attributes;
				      	          var address=attr.ADDRESS.replace(/[\r\n]/g,""), 
				      	          name=attr.NAME.replace(/[\r\n]/g,""), 
				      	          state=attr.TYPE.replace(/[\r\n]/g,""), 
				      	          number=attr.NO, 
				      	          time=attr.TIME.replace(/[\r\n]/g,""), 
				      	          tel=attr.TEL, 
				      	          remarks=attr.STATE.replace(/[\r\n]/g,"");
				      	          dataString+= "{\"address\":\""+address+"\",\"name\":\""+name+"\",\"state\":\""+state+"\",\"number\":"+number+",\"time\":\""+time+"\",\"tel\":\""+tel+"\",\"remarks\":\""+remarks+"\"},";
				      	      }
				      	    data = "["+dataString+"]";
				      	    JsonData = eval('(' + data + ')');
		                
			            	//新建一个聚类图层
				            var clusterLayer = new ClusterLayer({  
				                "data": BicycleInfo.data,  
				                "distance": 80,  
				                "id": "clusters",  
				                "labelColor": "#fff",  
				                "showSingles": false,
				                "labelOffset": 10,  
				                "resolution": map.extent.getWidth() / map.width,  
				                "singleColor": "#888"  
				                  
				            });  
				            var defaultSym = new SimpleMarkerSymbol().setSize(4);  
				            var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");  
				
				            var blue = new PictureMarkerSymbol("/PublicBicycleSys/images/m1.png", 32, 32).setOffset(0, 15);  
				            var green = new PictureMarkerSymbol("/PublicBicycleSys/images/m2.png", 50, 50).setOffset(0, 15);  
				            var red = new PictureMarkerSymbol("/PublicBicycleSys/images/m3.png", 72, 72).setOffset(0, 15);  
				            
				            renderer.addBreak(0, 5, blue);  
				            renderer.addBreak(5, 70, green);  
				            renderer.addBreak(71, 3000, red);  
				
				            clusterLayer.setRenderer(renderer);  
				            clusterLayer.setScaleRange(0, 8000);
				            
				            
				            map.addLayer(clusterLayer);  
				      	    SetDataTable();
		            
			    }
			    
				/**
				 * 初始化DataTable
				 */
				function SetDataTable(){
					
					      	table = $('#bicycleTable').DataTable({
					      		"data": JsonData,
						  		"aoColumnDefs" : [{
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
						  		"columns" : [
						  		    {"class" : 'details-control',
						  		     "orderable" : false,
						  		     "data" : null,
						  		     "defaultContent" : ''},
						  		    {"data" : "name"}, 
						  		    {"data" : "number",
						  		     "class" : "details-search"}, 
						  		    {"data" : null,
						  		     "class" : 'details-edit',
						  		     "width" : "10%",
									 "render" : function(data, type, row, meta) {
										 			var context = {
													func : [{
														 	"name" : "修改",
														 	"fn" : "PointEditing(\'" + row.name + "\',\'" + row.number + "\',\'" + row.address + "\',\'" + row.remarks + "\',\'" + row.time + "\',\'" + row.tel + "\')",
														 	"type" : "primary"
													 		}]};
													var html = template(context);
													return html;
									 			}}
						  		],
						  		"order" : [[2, 'asc']],
							
								 "language" : {
									 "sProcessing" : "处理中...",
									 "sLengthMenu" : "显示 _MENU_ 项结果",
									 "sZeroRecords" : "没有匹配结果",
									 "sInfo" : "共 _TOTAL_ 项",
									 "sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
									 "sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
									 "sEmptyTable" : "表中数据为空",
									 "search":"站点检索：",
								 }
					      	});
							
							
						    $("div.add").html('<button id = "addpoint" class="button button-primary button-square button-small"><i class="fa fa-plus"></i></button>');
							$("#addpoint").click(function() {
								if(confirm("向地图上添加一个公共自行车站点，系统会记录您的操作!")){
									isAdd = true;
						 		}else{
						 	 		//alert("操作已放弃");
						 		}
							});
				} 
			    
		});

