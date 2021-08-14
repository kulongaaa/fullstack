var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
        res.send('err');
    } else {
        console.log(ret);
        res.send(ret);
    }
};

// 登录用户接口
router.post('/login', (req, res) => {
    var sql = $sql.user.login;
    var params = req.body;
    conn.query(sql, [params.username,params.password], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
            for(var i = 0; i < result.length; i++){
                console.log("请求回来！",result[i])
                console.log("请求结果！",typeof result[i],result[i].password);
            }
        }
    })
});

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    console.log(params.birth);
    conn.query(sql, [params.username, params.password], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 登陆时先查询看有没有这一条数据
router.post('/select',(req,res)=>{
    var sql = $sql.user.select;
    var params = req.body;
    conn.query(sql,[params.username,params.password],function(error,result){
        if(error){
            console.log(error)
        }
        if(result){
            jsonWrite(res,result)
        }
    })
})

// 查询所有
router.post('/query',(req,res)=>{
    var sql = $sql.user.query;
    var params = req.body;
    conn.query(sql,function(error,result){
        if(error){
            console.log(error)
        }
        if(result){
            jsonWrite(res,result)
        }
    })
})

// 删除
router.post('/delete',(req,res)=>{
    var sql = $sql.user.delete;
    var params = req.body;
    conn.query(sql,[params.id],function(error,result){
        if(error){
            console.log(error)
        }
        if(result){
            jsonWrite(res,result)
        }
    })
})

// 新增数据  先查询该用户存不存在，
// 若存在提示(用户已存在，重新输入)，
// 若不存在，提示新增成功跳转到首页
router.post('/selectStudent',(req,res)=>{
    var sql = $sql.user.selectStudent;
    var params = req.body;
    conn.query(sql,[params.studentName],function(error,result){
        if(error){
            console.log(error)
        }
        if(result){
            jsonWrite(res,result)
        }
    })
})
// 添加学生表信息
router.post('/addStudent',(req,res)=>{
    var sql = $sql.user.addStudent;
    var params = req.body;
    conn.query(sql,[params.user1,params.studentName,params.studentPwd,params.Content],function(error,result){
        if(error){
            console.log(error)
        }
        if(result){
            jsonWrite(res,result)
        }
    })
})

// 修改数据
router.post("/updateStudent",(req,res)=>{
    var sql = $sql.user.update;
    var params = req.body;
    console.log(params.id);
    // 传的参数一定要与sql语句参数对应
    conn.query(sql,[params.studentName,params.studentPwd,params.Content,params.id],function(error,result){
        if (error) {
            console.log(error)
        }
        if (result) {
            jsonWrite(res,result)
        }
    })
})

module.exports = router;
