 define([  "dojo/_base/declare","esri/tasks/QueryTask","esri/tasks/query","dojo/_base/lang"],function(declare,QueryTask,Query,lang){
	 	return declare("ergod",null,{
	 		constructor :function(){
	 			var queryTask = new QueryTask("http://localhost:6080/arcgis/rest/services/BicyclePoint/FeatureServer/1");  
	 			var query = new Query();  
	 			query.returnGeometry = false;  
	 			query.outFields = ["*"];  
	 			query.outSpatialReference = { wkid: 102100 };  
	 			query.where = "ObjectID<10000";  
	 			queryTask.execute(query, function PointJson(resp){
	 				  var features=resp.features;
	 			      var dataString = "";
	 			      var data = "";
	 			      for(var i=0;i<features.length;i++){
	 			          var attr = features[i].attributes;
	 			          var address=attr.ADDRESS, name=attr.NAME
	 			          , state=attr.TYPE, number=attr.NO
	 			          , time=attr.TIME, tel=attr.TEL
	 			          , remarks=attr.STATE;
	 			          dataString+= "{\"address\":\""+address+"\",\"name\":\""+name+"\",\"state\":\""+state+"\",\"number\":"+number+",\"time\":\""+time+"\",\"tel\":\""+tel+"\",\"remarks\":\""+remarks+"\"},";
	 			      }
	 			     data = "["+dataString+"]";
	 			     this.JsonData = eval('(' + data + ')');
	 			    $('#bicycleTable').dataTable().api().clear().rows.add(JsonData).draw();
	 			}); 
	 		}
	 	});
	  }); 
		

