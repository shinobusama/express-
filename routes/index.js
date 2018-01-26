var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');  
var jsonParser = bodyParser.json();
var mysql = require('../mysql.js');
router.get('/', function(req, res, next) {
	var sql = "SELECT * FROM user_index";  
    mysql.query(sql,function(rows){ 
       	var banner = JSON.parse(rows[0].data);
        var introduction = JSON.parse(rows[1].data);
        var course = JSON.parse(rows[2].data);
        var faq = JSON.parse(rows[3].data);
        res.render('index', { title:'郫县瓦力机器人学校', banner,introduction,course,faq});
    });
});

module.exports = router;
