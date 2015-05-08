dojo.require("esri.map");
dojo.require("esri.dijit.HomeButton");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.dijit.OverviewMap");

dojo.require("dojo.dom");
dojo.require("esri.Color");
dojo.require("dojo.keys");
dojo.require("dojo.parser");

dojo.require("esri.config");
dojo.require("esri.sniff");
dojo.require("esri.SnappingManager");
dojo.require("esri.dijit.Measurement");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.renderers.SimpleRenderer");
dojo.require("esri.tasks.GeometryService");
dojo.require("esri.symbols.SimpleLineSymbol");
dojo.require("esri.symbols.SimpleFillSymbol");
dojo.require("esri.InfoTemplate");
dojo.require("esri.dijit.Search");

dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.TitlePane");
dojo.require("dijit.form.CheckBox");
dojo.require("dojo.domReady!");

dojo.addOnLoad(function() {

	
			var map = new esri.Map("main", {
				logo : false,
				zoom : 14
			});
			// 瓦片全国地图图层
			var MyTiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(
					"http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaCities_Community_BaseMap_CHN/HangZhou_Community_BaseMap_CHN/MapServer");
			map.addLayer(MyTiledMapServiceLayer);

			// 内容填装
			var infoTemplate = new esri.InfoTemplate();
			infoTemplate.setTitle("${NAME}");
			infoTemplate.setContent("<b>站点名称：</b>${NAME}租赁点<br/>"
					+ "<b>站点编号：</b>${NO}<br/>" + "<b>服务时间：</b>${TIME}<br/>"
					+ "<b>值守状态：</b>${TYPE}<br/>"
					+ "<b>站点地址：</b>${ADDRESS}<br/>" + "<b>联系电话：</b>${TEL}<br/>"
					+ "<b>站点状态：</b>${STATE}<br/>"
			);

			var BicyclePoint = new esri.layers.FeatureLayer(
					"http://localhost:6080/arcgis/rest/services/BicyclePoint/MapServer/0",
					{
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : infoTemplate,
						outFields : [ "NO", "NAME", "TIME", "TYPE", "ADDRESS",
								"TEL", "STATE" ]
					});
			map.addLayer(BicyclePoint);

			
			 var s = new esri.dijit.Search({
				 map: map,
				 addLayersFromMap :true,
			 }, "search");
		     s.startup();
		         
		         
			// Home按钮
			var homeButton = new esri.dijit.HomeButton({
				theme : "HomeButton",
				map : map,
				extent : null,
				visible : true
			}, "HomeButton");
			homeButton.startup();

			// 比例尺
			scalebar = new esri.dijit.Scalebar({
				map : map,
				scalebarUnit : "dual"
			});

			// 鹰眼
			overviewMapDijit = new esri.dijit.OverviewMap({
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

			// //量算工具
			dojo.parser.parse();
			esriConfig.defaults.geometryService = new esri.tasks.GeometryService(
					"http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
			measurement = new esri.dijit.Measurement({
				map : map
			}, dojo.byId("measurementDiv"));
			measurement.startup();
			
	
		         
		         

		});
