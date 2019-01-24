//引入roter模块
var express = require('express');
var router = express.Router();
const dao=require('../extension/middleware/mysqldb/daolink/restDbModule');

/**
 * 返回信息中文乱码解决
 * @param {*} req 请求
 * @param {*} res 响应
 * @param {*} next 下一个
 */
function dealEncode(req, res, next){
    // 输出 JSON 格式
    require('../tool/cnencode')(req, res, next);
}

// query
router.get('/miniapp/queryTable',function(req,res,next){
    dealEncode(req,res,next);
    let paramObj={
        name:'枫柚master',       
        userid:"hecore"
    }
    dao.searchList("test",paramObj,function(callback){
        console.log("打印data:"+callback);
        res.end(JSON.stringify(callback));
    });
})

// insert
router.get('/miniapp/insert',function(req,res,next){
    //获取外部请求参数
    //GET /miniapp/insert?uid=adb&pwd=1231
    // 可以写入对象的完整信息,也可以遍历对象,拿到对应的key-value.然后去对应数据库。ORM机制
    dealEncode(req,res,next);
    //console.log(req);
    let paramObj=req.query;
    console.log(paramObj);
    res.end(JSON.stringify(paramObj));
})

router.post("/miniapp/post",function(req,res,next){
    dealEncode(req,res,next);
    // console.log(req);
    // console.log(req.body);
    let paramObj=req.body;
    console.log(paramObj);
    res.end(JSON.stringify(paramObj));
})

module.exports = router;