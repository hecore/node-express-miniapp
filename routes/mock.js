//引入roter模块
var express = require('express');
var router = express.Router();
//引入oath模块
/**
 * --
 * custom mock data start
 * --
 */
var json={
   name:"hecore",
   address:"北京市西城区南礼士路",
   message:{
      telephone:18235436145,
      wechat:"枫柚master",
      wechatnum:"hecorewecha"
   }
}

function dealEncode(req, res, next){
   // 输出 JSON 格式
   require('../tool/cnencode')(req, res, next);
}

/**
 * --
 * custom mock data end
 * --
 */
/**
 * --
 * custom router start
 * --
 */

 router.get("/json",function(req, res, next){
   dealEncode(req, res, next);  
   // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
   // response = {
   //     first_name:req.body.first_name,
   //     last_name:req.body.last_name
   // };
   res.end(JSON.stringify(json));
 });

 /**
  * --
  * custom router end
  * --
  */
 module.exports = router;