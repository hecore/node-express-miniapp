//引入roter模块
var express = require('express');
var router = express.Router();
// var db=require("../app.js").db;//从入口类中获取db--全局db
// var resdb=require('../tool/dbtool');
/**
 * --
 * custom db iface start
 * --
 * [1]dao 是默认的测试模块
 * 表结构如下
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
SET FOREIGN_KEY_CHECKS = 1;
 * [2]daoTable 是需要多传入表名 参数的 复用模块。建议后续使用都用daoTable模式,减少重复创建表名。
 */
const dao=require('../extension/middleware/mysqldb/daolink/restDbLink');
const daoTable=require('../extension/middleware/mysqldb/daolink/restDbModule');

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
router.get('/restDemo/query',function(req, res, next){
    dealEncode(req,res,next);
    //var dao=require('../daolink/poolQuery');
    dao.searchList('hecore',function(callback){
        console.log("打印data:"+callback);
        var json=[{name:"hecore"}];
        res.end(JSON.stringify(callback));
    });
})

router.get('/restDemo/queryEmpty',function(req,res,next){
    var data=dao.noCallSearchList('hecore');
    console.log("打印data:"+data);
    res.end(JSON.stringify(data));
})

router.get('/restDemo/queryTable',function(req,res,next){
    dealEncode(req,res,next);
    let paramObj={
        name:'枫柚master',       
        userid:"hecore"
    }
    daoTable.searchList("test",paramObj,function(callback){
        console.log("打印data:"+callback);
        res.end(JSON.stringify(callback));
    });
})

// insert
router.get('/restDemo/insert',function(req,res,next){
    // 可以写入对象的完整信息,也可以遍历对象,拿到对应的key-value.然后去对应数据库。ORM机制
    var paramObj={
        name:"枫柚master",
        userid:"hecore"
    };
    dao.add(paramObj,function(callback){
        res.end(JSON.stringify(callback));
    });
})

// update
router.get('/restDemo/update',function(req,res,next){
    var paramObj={
        name:"master",
        userid:"hecore",
        status:2
    };
    var tr={
        id:5
    }
    dao.update(paramObj,tr,function(callback){
        res.end(JSON.stringify(callback));
    })
})

// delete
router.get('/restDemo/detele',function(req,res,next){
    dao.delete(5,function(callback){
        res.end(JSON.stringify(callback));
    })
})
// delete batch
router.get('/restDemo/deteleBatch',function(req,res,next){
    var delData={
        "id":'6'
    }
    dao.deleteBatch(delData,function(callback){
        res.end(JSON.stringify(callback));
    })
})

 /**
 * --
 * custom db iface end
 * --
 */
module.exports = router;