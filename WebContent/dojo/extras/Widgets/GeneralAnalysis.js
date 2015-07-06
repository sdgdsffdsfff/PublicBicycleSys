define(["dojo/_base/declare", "dojo/dnd/Moveable", "dijit/_WidgetBase",
        "dijit/_AttachMixin", "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dojo/text!./templates/GeneralAnalysis.html", "dojo/dom",
		"dojo/_base/lang", "dojo/_base/fx","dojo/dom-style",
		
		//进度条
		"dijit/ProgressBar", 
		
		// 查询
		"esri/tasks/AreasAndLengthsParameters",
		"esri/tasks/GeometryService",
		"esri/layers/FeatureLayer",
		"esri/tasks/QueryTask", 
		"esri/tasks/query",
		// 图形绘制
		"esri/toolbars/draw",
		"esri/symbols/SimpleMarkerSymbol",
		"esri/symbols/SimpleLineSymbol",
		"esri/symbols/SimpleFillSymbol",
		"esri/symbols/CartographicLineSymbol", 
		"esri/graphic",
		"esri/Color",
		//柱状图
		"dojox/charting/Chart", "dojox/charting/themes/MiamiNice",
		"dojox/charting/action2d/MouseIndicator", // 注意位置
		"dojox/charting/action2d/MouseZoomAndPan",
		"dojox/charting/plot2d/Columns",
		"dojox/charting/plot2d/Markers",
		"dojox/charting/axis2d/Default",

		"dijit/form/RadioButton", "dijit/form/Button",
		"dijit/form/FilteringSelect", "dijit/layout/TabContainer",
		"dijit/layout/ContentPane", "dojo/domReady!" ],
		function(declare, Moveable, _WidgetBase, _AttachMixin, _TemplatedMixin,_WidgetsInTemplateMixin, temstring, dom, lang, fx, style,
				ProgressBar,
				AreasAndLengthsParameters,
				GeometryService,FeatureLayer,QueryTask,Query, Draw, SimpleMarkerSymbol, SimpleLineSymbol,SimpleFillSymbol, CartographicLineSymbol, Graphic, Color,
				Chart, theme, MouseIndicator, MouseZoomAndPan) {
				return declare([ _WidgetBase, _TemplatedMixin, _AttachMixin,_WidgetsInTemplateMixin ],{
				templateString : temstring,
				widgetsInTemplate : true,
				constructor : function() {
							//console.log("constructor");
							},
				postMixInProperties : function() {
							//console.log("postMixInProperties");
							},
				postCreate : function() {
							//console.log("postcreate");
							},
				setChart : function(chartD,chartE) {
							// 数据密度
							var chartData = chartD;
							Chart_md = new Chart("Chart_md");
							Chart_md.setTheme(theme);
							Chart_md.addPlot("default", {type : "Columns", markers : true, gap : 5});
							var xStr = [ "站点密度", "车场密度"];
							var myLabelFunc = function(text, value, precision) {
								return xStr[text - 1];
							};
							Chart_md.addAxis("x", {
								labelFunc : myLabelFunc
							});
							Chart_md.addAxis("y", {
								vertical : true,
								fixLower : "major",
								fixUpper : "major"
							});
							Chart_md.addSeries("PointValue", chartData,{stroke : {color : "#5782AE"},fill : "#5782AE"});
							var str1, str2;
							// 鼠标指标
							new MouseIndicator(Chart_md, "default", {
								series : "PointValue",
								fontColor : "#ffffff",
								lineStroke : "#ED9A07", // 指标线颜色
								stroke : "#ED9A07",// 指标外壳颜色
								fill : "ED9A07",// 填充色
								markerStroke : "#ED9A07",// 圆圈标记颜色
								markerFill : "#fff",
								fillFunc : function(v) {
									return v.y > 20 ? "#ED9A07" : "red";
								},
								labelFunc : function(v) {
									// str1 = "温度: "+v.y;
									str1 = "密度:" + v.y + "个/平方千米";
									return str1;
								}
							});
							Chart_md.render();
							
							
							// 数据覆盖率
							var chartData2 = chartE;
							console.log(chartData2);
							Chart_fgl = new Chart("Chart_fgl");
							Chart_fgl.setTheme(theme);
							Chart_fgl.addPlot("default", {type : "Columns",markers: true, gap: 5});
							var xStr = ["站点覆盖率", "车场覆盖率"];
							var myLabelFunc = function(text, value, precision) {
								return xStr[text - 1];
							};
							Chart_fgl.addAxis("x", {
								labelFunc : myLabelFunc
							});
							Chart_fgl.addAxis("y", {
								vertical : true,
								fixLower : "major",
								fixUpper : "major"
							});
							Chart_fgl.addSeries("PointValue", chartData2,{stroke :{color : "#5782AE"},fill : "#5782AE"});
							var str3, str4;
							// 鼠标指标
							new MouseIndicator(Chart_fgl, "default", {
								series : "PointValue",
								fontColor : "#ffffff",
								lineStroke : "#ED9A07", // 指标线颜色
								stroke : "#ED9A07",// 指标外壳颜色
								fill : "ED9A07",// 填充色
								markerStroke : "#ED9A07",// 圆圈标记颜色
								markerFill : "#fff",
								fillFunc : function(v) {
									return v.y > 20 ? "#ED9A07" : "red";
								},
								labelFunc : function(v) {
									str1 = "覆盖率:" + v.y + "%";
									return str1;
								}
							});
							Chart_fgl.render();
							
							},
				close : function() {
					console.log("fadeOut");
						   fx.fadeOut({
							   node : dom.byId("dijit__WidgetsInTemplateMixin_0"),
								duration : 300,
								onEnd : function() {
									map.enableMapNavigation();
									map.graphics.clear();
									Chart_md.removeSeries("PointValue");
									style.set("dijit__WidgetsInTemplateMixin_0", "z-index", "-10");
									}
				            }).play();
						   //修改z-index
						   //
						},
				startup : function() {
						this.inherited(arguments);
						// 获取到图层
						var BicyclePoint = map.getLayer("BicyclePoint");
						// 渐变显示
						fx.fadeIn({
									node : dom.byId("dijit__WidgetsInTemplateMixin_0"),
									duration : 300,
									onEnd : function() {
											map.graphics.clear();
											}
						}).play();
						// 可移动
						var dnd = new Moveable(dom.byId("dijit__WidgetsInTemplateMixin_0"));
						// 设置图表
						this.setChart([ 50, 25], [50, 25 ]);
						},
				startAnalysis : function() {
							
						

							//dijit.byId("setTestBar").startAnimation();
							geometryService = new GeometryService("http://localhost:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");
							// 开始分析
							console.log("startAnalysis"+ dijit.byId('fruit').get('displayedValue'));
							// 获取选项的值
							var FSelectA = dijit.byId('fruit').get('displayedValue');
							var FSelectB = dijit.byId('fruit2').get('Value');
							var fillSymbol = new SimpleFillSymbol(
									SimpleFillSymbol.STYLE_SOLID,
									new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color('#008CFF'), 2),
									new Color([ 125, 125, 125, 0.35 ]));
							tb = new Draw(map);
							map.disableMapNavigation();
							// 开始绘制
							tb.on("draw-end", function addGraphic(evt) {
								//显示无刻度进度条
								style.set("GeneralA_progress", "display", "block");
								console.log("draw-end");
								tb.deactivate();
								map.enableMapNavigation();
								map.graphics.add(new Graphic(evt.geometry,fillSymbol));
								// 得到图形 传给计算方法
								calculate(evt.geometry);
							});
							
							var isRadioOne = dijit.byId('radioOne').get('checked');
							var isRadioTwo = dijit.byId('radioTwo').get('checked');
							if (isRadioOne) {
								/**
								 * 按城市区划来计算信息
								 */
								//显示无刻度进度条
								style.set("GeneralA_progress", "display", "block");
								// 按照城市区划来选择图形 通过查询得到对应的geometry
								var queryTask = new QueryTask("http://localhost:6080/arcgis/rest/services/BicyclePoint/FeatureServer/2");
								var query = new Query();
								query.returnGeometry = true;
								query.outFields = [ "*" ];
								query.outSpatialReference = {
									wkid : 102100
								};
								query.where = "NAME = '" + FSelectA + "'";
								queryTask.execute(query,function Data(resp) {
									
											var features = resp.features;
											if (features.length > 0) {
											// 得到面积和图形
											var area = features[0].attributes.Area_mi;
											var graphic = new Graphic(features[0].geometry,fillSymbol);
											map.graphics.clear();
											map.graphics.add(graphic);
											
//											geometryService.labelPoints([features[0].geometry], function(labelPoints){
//												var a = labelPoints;
//											var pointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CROSS, 22,
//											new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 4));
//											
//											var labelPointGraphic = new Graphic(labelPoints,pointSymbol);
//											
//											map.graphics.add(labelPointGraphic);
//												map.centerAndZoom(labelPoints, 12);
//												
//											});
											
											map.setZoom(12);
											// 传给计算方法 接收：geometry返回密度 和覆盖率
											calculate(features[0].geometry);
											};
								});
							}else if(isRadioTwo){
								/**
								 * 按绘制区域计算信息
								 */
								// 按照选项 绘制图形得到对应的geometry
								// disableMapNavigation不允许所有地图导航除了滑块。
								map.disableMapNavigation();
								// 开始绘制
								if (FSelectB == "Polygon") {
									map.graphics.clear();
									tb.activate(Draw.POLYGON);
								} else if (FSelectB == "Circle") {
									map.graphics.clear();
									tb.activate(Draw.CIRCLE);
								} else if (FSelectB == "FreehandPolygon") {
									map.graphics.clear();
									tb.activate(Draw.FREEHAND_POLYGON);
								}
								// 在绘制完成的回调函数中将geometry传给计算方法
							}
							//计算密度
							function calculate(geometry){
								 console.log("calculate_in");
								 var query = new Query();
					             query.geometry = geometry;
					             var Point = map.getLayer("PointEdit");
					             var PointFW = map.getLayer("PointFw");
					             
					             //得到站点个数
					             Point.selectFeatures(query, FeatureLayer.SELECTION_NEW, function(results){
					              contentsZD = results.length;
					              
					              PointFW.selectFeatures(query, FeatureLayer.SELECTION_NEW, function(results){
						              contentsFW = results.length;
						              //计算面积
							             var areasAndLengthParams = new AreasAndLengthsParameters();
							             //areasAndLengthParams.lengthUnit = GeometryService.UNIT_FOOT;
							             areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_KILOMETERS;
							             geometryService.simplify([geometry], function(simplifiedGeometries) {
							            	    	areasAndLengthParams.polygons = simplifiedGeometries;
							            	    	geometryService.areasAndLengths(areasAndLengthParams);
							             });
						             });
					              
					             });
							};
							
							geometryService.on("areas-and-lengths-complete",outputAreaAndLength);
						      function outputAreaAndLength(evtObj){
						        var result = evtObj.result.areas[0];
						        //计算站点密度和覆盖率  服务点密度和覆盖率
						        var ZDMD = parseFloat((contentsZD/result).toFixed(2));
						        var FWMD = parseFloat((contentsFW/result).toFixed(2));

						        var ZDFGL = parseFloat((contentsZD*3.14/result).toFixed(2));
						        var FWFGL = parseFloat((contentsFW*3.14*100/result).toFixed(2));
						        
						        reflashChart([ZDMD,FWMD],[ZDFGL,FWFGL]);
						    };
						     
						    function reflashChart(newChartDataA,newChartDataB){
						    	
						    	Chart_md.removeSeries("PointValue");
								Chart_md.addSeries("PointValue",newChartDataA, {stroke : {color : "#5782AE"},fill : "#5782AE"});
								Chart_md.render();
								
								Chart_fgl.removeSeries("PointValue");
								Chart_fgl.addSeries("PointValue",newChartDataB, {stroke : {color : "#5782AE"},fill : "#5782AE"});
								Chart_fgl.render();
								
								//计算结束隐藏无刻度进度条
								style.set("GeneralA_progress", "display", "none");
								
						    };
						},
				cleanMap : function() {
						// 清除地图
						map.enableMapNavigation();
						console.log("cleanMap");
						map.graphics.clear();
						// 刷新图表
						//Chart_md.removeSeries("PointValue");
						//Chart_fgl.removeSeries("PointValue");
						}
				});
	});