 /**
  * 通过获取公共自行车点数据的图层信息 来更新表格中的数据
  */
define([  "dojo/_base/declare","esri/tasks/QueryTask","esri/tasks/query","dojo/_base/lang"],function(declare,QueryTask,Query,lang){
	 	return declare("ergod",null,{
	 		constructor :function(){
	 			var queryTask = new QueryTask(URL+"/PublicBicyclePoint/FeatureServer/1");  
	 			var query = new Query();  
	 			query.returnGeometry = false;  
	 			query.outFields = ["*"];  
	 			query.outSpatialReference = { wkid: 102100 };  
	 			query.where = "1=1";  
	 			queryTask.execute(query, function PointJson(resp){
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
	 			     this.JsonData = eval('(' + data + ')');
	 			    console.log("获取到新的图层数据，刷新显示");
	 			    $('#bicycleTable').dataTable().api().clear().rows.add(JsonData).draw();
	 			}); 
	 		}
	 	});
	  }); 
		

