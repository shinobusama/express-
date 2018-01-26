var mysql = require('mysql');
var connection = mysql.createConnection({
  	host : 'localhost',
  	user : 'root',
  	password : '115040',
  	database: 'mydata'
});

//查询数据  
function query(sql,callback){  
    connection.query(sql, function(err, rows) {  
        if (err){
          console.log(err.message);
        }
        else {
          callback(rows);       
        } 
    }); 
}  
//插入数据
function insert(sql,sqlvalues,callback){
	connection.query(sql,sqlvalues,function(err,result) {  
        if (err){
        	console.log(err.message);
        }
        else {
        	callback(true);     	
        }     
    });  
    //connection.end();
}
//修改数据
exports.query = query; 
exports.insert = insert; 