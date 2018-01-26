var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');  
var jsonParser = bodyParser.json();
var mysql = require('../mysql.js');
router.get('/', function(req, res, next) {
	var sql = "SELECT * FROM user_introduction";  
    mysql.query(sql,function(rows){ 
       	var history = JSON.parse(rows[0].data);
        var team = JSON.parse(rows[1].data);
        var honor = JSON.parse(rows[2].data);
        var idea = JSON.parse(rows[3].data);
        res.render('introduction', { title:'郫县瓦力机器人学校',history,team,honor,idea});
    });
});

module.exports = router;