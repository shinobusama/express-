var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');  
var mysql = require('../mysql.js');
var sd = require('silly-datetime');

// create application/json parser  
var jsonParser = bodyParser.json()  
  
// create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
   
//  request from form of the html file  
 
router.post('/', urlencodedParser, function(req, res, next) {    
    if (!req.body) return res.sendStatus(400);  
    var time = sd.format(new Date(),'YYYY-MM-DD HH:mm');
    var mark = "未读";
    var name = req.body.name;
    var age = req.body.age;
    var tel = req.body.tel;
    var sql = 'INSERT INTO data (name,age,tel,time,mark) VALUES(?,?,?,?,?)';
    var sqlvalues = [''+name+'',''+age+'',''+tel+'',''+time+'',''+mark+''];  
    res.render('showMessage', { name:name, age:age, tel:tel,mark:mark,time:time});
    mysql.insert(sql,sqlvalues,function(){
    	console.log('预约成功！');
        
    });
});  


module.exports = router;