function loadmap(){
	// 百度地图API功能
	var map = new BMap.Map("signup-map");
	var point = new BMap.Point(103.905847,30.798925);
	map.centerAndZoom(point,18);
	map.enableScrollWheelZoom(true);
	var marker = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker);              // 将标注添加到地图中
	var opts = {
	  width : 200,     // 信息窗口宽度
	  height: 100,     // 信息窗口高度
	  title : "瓦力双语机器人学校" , // 信息窗口标题
	}
	var infoWindow = new BMap.InfoWindow("地址：成都市郫都区金融中心", opts);  // 创建信息窗口对象 
	marker.addEventListener("mouseover", function(){          
		map.openInfoWindow(infoWindow,point); //开启信息窗口
	});
}
loadmap();