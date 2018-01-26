var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');  
var mysql = require('../mysql.js');
var session = require('express-session'); 
var multer  = require('multer');
var fs = require("fs");
var MySQLStore = require('express-mysql-session');
var upload = multer({ dest: './public/images/' });
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '115040',
    database: 'mydata'
};
var sessionStore = new MySQLStore(options);
// create application/json parser  
var jsonParser = bodyParser.json()  
  
// create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
   
//  request from form of the html file  
 
router.use(session({
    key: 'session_cookie_name',
    secret :  'session_cookie_secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    store: sessionStore,
    cookie : {
        maxAge : 60*1000*60 // 设置 session 的有效时间，单位毫秒
    },
}));

router.post('/', urlencodedParser, function(req, res,next) {    
    if (!req.body) return res.sendStatus(400);  
    var username = req.body.username;
    var password = req.body.password;
    req.session.username = username;
    var sql = "SELECT * FROM login WHERE username = '"+username+"' AND password = '"+password+"'";  
    mysql.query(sql,function(rows){  
        if(rows!=""){
        	console.log('登陆成功');
        	res.render('backstage', { title:'后台'});
        }else {
            res.send('登陆失败！');
        }
    });
    
});  

router.get('/search', function(req, res, next) {
    if(req.session.username){
        var sql = "SELECT * FROM data";  
        mysql.query(sql,function(rows){ 
            var data = rows;
            res.render('search', { title:'查詢',data:data});
        });
    }else {
            res.send('登陆失败！');
    }
});

router.post("/search", urlencodedParser, function(req, res){
    if (!req.body) return res.sendStatus(400); 
    tel = req.body.tel;
    mark = req.body.mark;
    var sql = "update data set mark = '"+ mark +"' where tel = " + tel;
    mysql.query(sql,function(rows){  
            var data = rows;
        res.render('search', { title:'查詢',data:data});
    });
});

router.get('/change', function(req, res, next) {
    if(req.session.username){
        res.render('change', { title:"修改" });
    }else {
            res.send('登陆失败！');
    } 
});

router.get('/change/index', function(req, res, next) {
    if(req.session.username){
        res.render('change-index', { title:"修改/主頁" });
    }else {
            res.send('登陆失败！');
    }
});

router.get('/change/index/banner', function(req, res, next) {
    if(req.session.username){
        res.render('change-index-banner', { title:"修改/主頁/banner" });
    }else {
            res.send('登陆失败！');
    }
});
router.get('/change/index/about', function(req, res, next) {
    if(req.session.username){
        res.render('change-index-about', { title:"修改/主頁/about" });
    }else {
            res.send('登陆失败！');
    }
});
router.get('/change/index/course', function(req, res, next) {
    if(req.session.username){
        res.render('change-index-course', { title:"修改/主頁/course" });
    }else {
            res.send('登陆失败！');
    }
});
router.get('/change/index/faq', function(req, res, next) {
    if(req.session.username){
        res.render('change-index-faq', { title:"修改/主頁/faq" });
    }else {
            res.send('登陆失败！');
    }
});

router.post('/change/index/about',upload.array('robot'), function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    var files = req.files;
    var text = req.body;
    var sql = "SELECT * FROM user_index";
    mysql.query(sql,function(rows){
        var introduction = JSON.parse(rows[1].data);
        if(text.title!=null){
            introduction.introduction.h1 = text.title;
        };
        
        for(var i=0;i<text.li.length;i++){
            if(text.li[i]!=null){
                introduction.introduction.desc[i].li = text.li[i];
            }
        };
        if(text.button!=null){
            introduction.introduction.button = text.button;
        };
        if(files[0]!=null){
            readfile(0,files);
            introduction.introduction.robot = 'images/'+files[0].originalname;
        };
        
        var str = JSON.stringify(introduction);
        var sql2 = "update user_index set data ='"+ str +"' where uid = " + 2;
        mysql.query(sql2,function(){
            
        });
    });
    res.render('change-index-about', { title:"修改/主頁/about" });
});

router.post('/change/index/banner', upload.array('uploadbanner',3), function(req, res, next) {
        console.log(req.files);  
        var files = req.files;
        var sql = "SELECT * FROM user_index";
        
        mysql.query(sql,function(rows){
            var banner = JSON.parse(rows[0].data);
            for(var i=0;i<files.length;i++){
                if(files[i]!=null){
                    readfile(i,files);
                    banner.banner[i].img = 'images/'+files[i].originalname;
                }
                console.log(banner);
            };
            var str = JSON.stringify(banner);
            var sql2 = "update user_index set data ='"+ str +"' where uid = " + 1;
            mysql.query(sql2,function(){
            
            });
        });
        
        res.render('change-index-banner', { title:"修改/主頁/banner" });
}); 

router.post('/change/index/course',upload.array('icon'), function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    var files = req.files;
    var text = req.body;
    var sql = "SELECT * FROM user_index";
    mysql.query(sql,function(rows){
        var course = JSON.parse(rows[2].data);
        if(text.title!=null){
            course.course.title = text.title;
        };
        for(var i=0;i<text.p.length;i++){
            if(files[i]!=null){
                readfile(i,files);
                course.course.item[i].img = 'images/'+files[i].originalname;
            };
            if(text.h4[i]!=null){
                course.course.item[i].h4 = text.h4[i];
            };
            
            if(text.p[i]!=null){
                course.course.item[i].p = text.p[i];
            }
        };
        var str = JSON.stringify(course);
        var sql2 = "update user_index set data ='"+ str +"' where uid = " + 3;
        mysql.query(sql2,function(){
            
        });
    });
    res.render('change-index-course', { title:"修改/主頁/about" });
});

router.post('/change/index/faq',upload.array('faq-img'), function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    var files = req.files;
    var text = req.body;
    var sql = "SELECT * FROM user_index";
    mysql.query(sql,function(rows){
        var faq = JSON.parse(rows[3].data);
        if(text.title!=null){
            faq.faq.title = text.title;
        };
        
        for(var i=0;i<text.p1.length;i++){
            if(files[i]!=null){
                readfile(i,files);
                faq.faq.item[i].img = 'images/'+files[i].originalname;
            };
            if(text.question[i]!=null){
                faq.faq.item[i].question = text.question[i];
            };
            if(text.p1[i]!=null){
                faq.faq.item[i].p1 = text.p1[i];
            };
            if(text.p2[i]!=null){
                faq.faq.item[i].p2 = text.p2[i];
            };
            if(text.p3[i]!=null){
                faq.faq.item[i].p3 = text.p3[i];
            }
        };
        var str = JSON.stringify(faq);
        var sql2 = "update user_index set data ='"+ str +"' where uid = " + 4;
        mysql.query(sql2,function(){
            
        });
    });
    res.render('change-index-faq', { title:"修改/主頁/faq" });
});

router.get('/change/course', function(req, res, next) {
    if(req.session.username){
        res.render('change-course', { title:"修改/课程" });
    }else {
            res.send('登陆失败！');
    }
});

router.get('/change/course/img', function(req, res, next) {
    if(req.session.username){
        res.render('change-course-img', { title:"修改/课程/img" });
    }else {
            res.send('登陆失败！');
    }
});

router.get('/change/course/span', function(req, res, next) {
    if(req.session.username){
        res.render('change-course-span', { title:"修改/课程/span" });
    }else {
            res.send('登陆失败！');
    }
});

router.get('/change/course/li', function(req, res, next) {
    if(req.session.username){
        res.render('change-course-li', { title:"修改/课程/li" });
    }else {
            res.send('登陆失败！');
    } 
});

router.post('/change/course/img',upload.array('img'), function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    var files = req.files;
    var text = req.body;
    var sql = "SELECT * FROM user_course";
    mysql.query(sql,function(rows){
        var img = JSON.parse(rows[0].data);
        if(files[0]!=null){
            readfile(0,files);
            img.img = 'images/'+files[0].originalname;
        };
        var str = JSON.stringify(img);
        var sql2 = "update user_course set data ='"+ str +"' where uid = " + 1;
        mysql.query(sql2,function(){
            
        });
    });
    res.render('change-course-img', { title:"修改/课程/img" });
});

router.post('/change/course/span', function(req, res, next) {
    console.log(req.body);
    var text = req.body;
    var sql = "SELECT * FROM user_course";
    mysql.query(sql,function(rows){
        var span = JSON.parse(rows[1].data);
        console.log(span);
        for(var i=0;i<text.h4.length;i++){
            if(text.h4[i]!=null){
                span.all[i].h4 = text.h4[i];
            };
            
            if(text.p[i]!=null){
                span.all[i].p = text.p[i];
            }
        };
        var str = JSON.stringify(span);
        var sql2 = "update user_course set data ='"+ str +"' where uid = " + 2;
        mysql.query(sql2,function(){
            
        });
    });
    res.render('change-course-span', { title:"修改/课程/span" });
});

router.post('/change/course/li',upload.array('img'), function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    var files = req.files;
    var text = req.body;
    var sql = "SELECT * FROM user_course";
    mysql.query(sql,function(rows){
        var li = JSON.parse(rows[2].data);
        console.log(li);
        for(var i=0;i<text.p.length;i++){
            if(text.p[i]!=null){
                li.item[i].p = text.p[i];
            };
            
            if(files[i]!=null){
                li.item[i].img = 'images/'+files[i].originalname;
            };
        };
        var str = JSON.stringify(li);
        var sql2 = "update user_course set data ='"+ str +"' where uid = " + 3;
        mysql.query(sql2,function(){
            
        });
    });
    res.render('change-course-li', { title:"修改/课程/li" });
});

router.get('/change/introduction', function(req, res, next) {
    if(req.session.username){
        res.render('change-introduction', { title:"修改/介绍" });
    }else {
            res.send('登陆失败！');
    }
});

router.get('/change/introduction/history', function(req, res, next) {
    if(req.session.username){
        res.render('change-introduction-history', { title:"修改/介绍/history" });
    }else {
            res.send('登陆失败！');
    }
});

router.get('/change/introduction/team', function(req, res, next) {
    if(req.session.username){
        res.render('change-introduction-team', { title:"修改/介绍/team" });
    }else {
            res.send('登陆失败！');
    }
});
router.get('/change/introduction/honor', function(req, res, next) {
    if(req.session.username){
        res.render('change-introduction-honor', { title:"修改/介绍/honor" });
    }else {
            res.send('登陆失败！');
    }
});
router.get('/change/introduction/idea', function(req, res, next) {
    if(req.session.username){
        res.render('change-introduction-idea', { title:"修改/介绍/idea" });
    }else {
            res.send('登陆失败！');
    }
});

router.post('/change/introduction/history',upload.array('img'), function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    var files = req.files;
    var text = req.body;
    var sql = "SELECT * FROM user_introduction";
    mysql.query(sql,function(rows){
        var history = JSON.parse(rows[0].data);
        if(files[0]!=null){
            readfile(0,files);
            history.item1.img = 'images/'+files[0].originalname;
        };
        if(text.title!=null){
            history.item1.title = text.title;
        };
        if(text.desc1!=null){
            history.item1.desc1 = text.desc1;
        };
        if(text.desc2!=null){
            history.item1.desc2 = text.desc2;
        };
        for(var i=0;i<text.desc3_li.length;i++){
            if(text.desc3_li[i]!=null){
                history.item1.desc3[i].li = text.desc3_li[i];
            };
        };
        console.log(history);
        var str = JSON.stringify(history);
        var sql2 = "update user_introduction set data ='"+ str +"' where uid = " + 1;
        mysql.query(sql2,function(){
            
        });
    });
    res.render('change-introduction-history', { title:"修改/介绍/history" });
});

router.post('/change/introduction/team',upload.array('img'), function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    var files = req.files;
    var text = req.body;
    var sql = "SELECT * FROM user_introduction";
    mysql.query(sql,function(rows){
        var team = JSON.parse(rows[1].data);
        if(text.title!=null){
            team.item2.title = text.title;
        };
        if(text.desc1!=null){
            team.item2.desc1 = text.desc1;
        };
        if(text.desc2!=null){
            team.item2.desc2 = text.desc2;
        };
        
        for(var i=0;i<text.images_title.length;i++){
            if(files[i]!=null){
                readfile(i,files);
                team.item2.imgs[i].img = 'images/'+files[i].originalname;
            };
            if(text.images_title[i]!=null){
                team.item2.imgs[i].title = text.images_title[i];
            };
        };
        console.log(team);
        var str = JSON.stringify(team);
        var sql2 = "update user_introduction set data ='"+ str +"' where uid = " + 2;
        mysql.query(sql2,function(){
            
        });
    });
    res.render('change-introduction-team', { title:"修改/介绍/team" });
});

router.post('/change/introduction/honor',upload.array('img'), function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    var files = req.files;
    var text = req.body;
    var sql = "SELECT * FROM user_introduction";
    mysql.query(sql,function(rows){
        var honor = JSON.parse(rows[2].data);
        if(text.title!=null){
            honor.item3.title = text.title;
        };
        if(text.desc1!=null){
            honor.item3.desc1 = text.desc1;
        };
        if(text.desc2!=null){
            honor.item3.desc2 = text.desc2;
        };

        for(var i=0;i<text.images_title.length;i++){
            if(files[i]!=null){
                readfile(i,files);
                honor.item3.imgs[i].img = 'images/'+files[i].originalname;
            }
            if(text.images_title[i]!=null){
                honor.item3.imgs[i].title = text.images_title[i];
            }
        };
        console.log(honor);
        var str = JSON.stringify(honor);
        var sql2 = "update user_introduction set data ='"+ str +"' where uid = " + 3;
        mysql.query(sql2,function(){
            
        });
    });
    res.render('change-introduction-honor', { title:"修改/介绍/honor" });
});

router.post('/change/introduction/idea', function(req, res, next) {
    console.log(req.body);
    var text = req.body;
    var sql = "SELECT * FROM user_introduction";
    mysql.query(sql,function(rows){
        var idea = JSON.parse(rows[3].data);
        if(text.title!=null){
            idea.item4.title = text.title;
        };
        if(text.desc1!=null){
            idea.item4.desc1 = text.desc1;
        };
        if(text.desc2!=null){
            idea.item4.desc2 = text.desc2;
        };
        for(var i=0;i<text.desc3_li.length;i++){
            if(text.desc3_li[i]!=null){
                idea.item4.desc3[i].li = text.desc3_li[i];
            }
        }
        console.log(idea);
        var str = JSON.stringify(idea);
        var sql2 = "update user_introduction set data ='"+ str +"' where uid = " + 4;
        mysql.query(sql2,function(){
            
        });
    });
    res.render('change-introduction-idea', { title:"修改/介绍/idea" });
});

function readfile(n,files){
    var des_file1 = './public/images/'+files[n].originalname;
    fs.readFile('./'+files[n].path,function(err,data){
        // 读取文件失败/错误  
        if (err) {  
            throw err;  
        }  
        // 读取文件成功  
        console.log("读取成功");
        fs.writeFile(des_file1,data,function(){
            if(err){
                console.error(err.message);
            }else{
                var message='File uploaded successfully';
            }
            //删除临时文件
            fs.unlink('./'+files[n].path,function(err){
                if(err){
                    console.error(err.message);
                }else{
                    console.log(message);
                }
            });
            
        })
    })  
    
};

module.exports = router;