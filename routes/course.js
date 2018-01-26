var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');  
var jsonParser = bodyParser.json();
var mysql = require('../mysql.js');
router.get('/', function(req, res, next) {
	var sql = "SELECT * FROM user_course";  
    mysql.query(sql,function(rows){ 
       	var img = JSON.parse(rows[0].data);
        var span = JSON.parse(rows[1].data);
        var li = JSON.parse(rows[2].data);
        res.render('course', { title:'郫县瓦力机器人学校', img,span,li});
    });
});

module.exports = router;