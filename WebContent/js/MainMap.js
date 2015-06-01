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
    
	"dojo/on",
	"dojo/dom",
	"dojo/keys",
	"dijit/TitlePane",
	"dojo/domReady!"], 
 	function(
 			parser, esriConfig,GeometryService,Map,InfoTemplate,ArcGISTiledMapServiceLayer,FeatureLayer,Search,
 			HomeButton, Scalebar, OverviewMap,Measurement,AttributeInspector, Button, domConstruct,on,dom
 			) {
	
		parser.parse();
		
		//esriConfig.defaults.io.proxyUrl = "/proxy/";
		//esriConfig.defaults.io.alwaysUseProxy = false;

		esriConfig.defaults.geometryService = new GeometryService("http://localhost:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");
	
		map = new Map("main", {
			logo : false,
			zoom : 14
		});
		// 瓦片杭州地图图层
		MyTiledMapServiceLayer = new ArcGISTiledMapServiceLayer(
				"http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaCities_Community_BaseMap_CHN/HangZhou_Community_BaseMap_CHN/MapServer");

		// 内容模板infoTemplate
		//var infoTemplate = new InfoTemplate();
		//infoTemplate.setTitle("${NAME}");
		//infoTemplate.setContent("<b>站点名称：</b>${NAME}租赁点<br/>"
		//		+ "<b>站点编号：</b>${NO}<br/>" + "<b>服务时间：</b>${TIME}<br/>"
		//		+ "<b>值守状态：</b>${TYPE}<br/>"
		//		+ "<b>站点地址：</b>${ADDRESS}<br/>" + "<b>联系电话：</b>${TEL}<br/>"
		//		+ "<b>站点状态：</b>${STATE}<br/>"
		//);
		
		//用于站点显示的FeatureLayer是一个FutureService
		BicyclePoint = new FeatureLayer("http://localhost:6080/arcgis/rest/services/BicyclePoint/FeatureServer/0",
				{
					mode : FeatureLayer.MODE_SNAPSHOT,   //MODE_SNAPSHOT
					//infoTemplate : infoTemplate,
					outFields : [ "NO", "NAME", "TIME", "TYPE", "ADDRESS","TEL", "STATE" ]
				});
		
		//用于站点属性编辑的FeatureLayer是一个FutureService
		PointEdit = new FeatureLayer("http://localhost:6080/arcgis/rest/services/BicyclePoint/FeatureServer/0", {
	          mode: FeatureLayer.MODE_SELECTION,
	          outFields: [ "NO", "NAME", "TIME", "TYPE", "ADDRESS","TEL", "STATE" ]
	        });
	    map.addLayers([MyTiledMapServiceLayer,BicyclePoint,PointEdit]);

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
			GetPointData();
			$('#bicycleTable').dataTable().api().clear().rows.add(JsonData).draw();
        });
		
		//初始化站点管理的表格
		on(map, "click", function(event){
			ClickMap();
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
    $("div.add").html('<button class="button button-primary button-square button-small"><i class="fa fa-plus"></i></button>');
}

/**
 * 地图点击
 */
function ClickMap(){
	console.log("地图被点击了"); 
}