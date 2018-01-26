function markAjax(tel)
{ 
  var mark={"mark":"已读",'tel':tel}; //这是一个json对象
  var xmlhttp;
  console.log('mark');
  console.log(tel);
  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log('服务器响应成功');
    }
  }
  xmlhttp.open("POST", "http://localhost/search", true);
  xmlhttp.setRequestHeader("Content-type","application/json");//需要设置成application/json
  xmlhttp.send(JSON.stringify(mark)); //body-parser解析的是字符串，所以需要把json对象转换成字符串
  location.reload();
}