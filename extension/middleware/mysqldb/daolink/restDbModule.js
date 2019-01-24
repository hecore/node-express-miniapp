/**
 * 导入mysql 连接池 方法
 */
var querySearch = require('../dbtool');
let restDbModule = {};

// db.query('select * from user', [], function(results,fields){
// 	//查询后的回调
// 	//Results代表是查询的结果，如果是插入修改等操作，则返回影响数据库信息的对象
// 	// fields代表查询的字段信息
// }

/**
 * 通用sql执行方法
 * @sql 执行查询sql
 * @arr sql相关参数
 * @callback 回调sql执行结果的函数
 */
restDbModule.exeSql=function(sql,arr,callback){
    return querySearch(sql,arr,function(results,fields){
        callback(results);
    });
}

/**
 * 插入用户方法
 * @table 表名
 * @paramObj 对象
 * @callback 回调函数
 */
restDbModule.searchList = function (table,paramObj,callback,sort) {//查询用户
    console.log("查询开始");
    let whereStr='';
    //if(sort=='asc')
    let i=0;
    console.log(paramObj);
    for (const key in paramObj) {
        if (paramObj.hasOwnProperty(key)) {
            const element = paramObj[key];
            if(i==0){
                whereStr+=key+`='${element}'`;
                i=1;
            }else{
                whereStr+=` and `+key+`='${element}'`;
            }
        }
    }
    let query = `SELECT * FROM `+table+` WHERE `+whereStr;
    console.log("查询用户"+query);
    return querySearch(query, [], function(results,fields){
        //查询后的回调
        //Results代表是查询的结果，如果是插入修改等操作，则返回影响数据库信息的对象
        // fields代表查询的字段信息
        //console.log(results);
        callback(results);
        //return results;
    });
}


/**
 * 插入用户方法
 * @table 表名
 * @paramObj 对象
 * @callback 回调函数
 */
restDbModule.add=(table,paramObj,callback)=>{
    //js json遍历
    let keyArr=[];
    let valueArr=[];
    let valSetArr=[];
    for (const key in paramObj) {
        if (paramObj.hasOwnProperty(key)) {
            const value = paramObj[key];
            keyArr.push(key);
            valSetArr.push('?');
            valueArr.push(value);
        }
    }
    let query=`insert into `+table+`(`+keyArr.join(',')+`) values(`+valSetArr.join(',')+`)`;
    console.log(query);
    return querySearch(query,valueArr,function(results,fields){
        callback(results);
    })
}

//insertBatch


/**
 * 更新数据方法 by id
 * @table 表名
 * @paramObj 更新对象
 * @id  更新id
 * id 格式：
 * {
 *   "xh":5
 * }
 * 或
 * 5  
 */
restDbModule.update = (table,paramObj,id,callback)=>{
    let setArr=[];
    let paramArr=[];
    let query='';
    for (const key in paramObj) {
        if (paramObj.hasOwnProperty(key)) {
            const value = paramObj[key];
            setArr.push(key+`='`+value+`'`);
        }
    }
    if(typeof(id)=="number"){//默认主键是id
        query=`update `+table+` set `+setArr.join(',')+` where id=?`;
        console.log("当前默认主键:id");
        paramArr[0]=id;
    }else{//自定义主键
        for (const key in id) {
            if (id.hasOwnProperty(key)){
                console.log("当前主键:"+key);
                const element = id[key]
                query=`update `+table+` set `+setArr.join(',')+` where `+key+`=?`;
                paramArr[0]=element;
            }
        }
    }
    //let query=`update test set `+setArr.join(',')+` where `+keys(id)[0]+`=?`;
    // console.log(query);
    // console.log(id);
    return querySearch(query,paramArr,function(results,fields){
        callback(results);
    })
}

/**
 * 删除数据 by id
 * @table 表名
 * @id id 格式：
 * {
 *   "xh":5
 * }
 * 或
 * 5  
 * @callback 回调函数
 */
restDbModule.delete=(table,id,callback)=>{
    let query= `delete from `+table+` where id=?`;
    let paramArr=[];
    if(typeof(id)=="number"){//默认主键是id
        console.log("当前默认主键:id");
        paramArr[0]=id;
    }else{//自定义主键
        for (const key in id) {
            if (id.hasOwnProperty(key)){
                console.log("当前主键:"+key);
                const element = id[key]
                query= `delete from `+table+` where `+key+`=?`;
                paramArr[0]=element;
            }
        }
    }
    return querySearch(query,paramArr,function(results,fields){
        callback(results);
    })
}

/**
 * 批量删除
 * @table 表名
 * @id id格式     '1,2,3,4,5' 
 */
restDbModule.deleteBatch=(table,id,callback)=>{
    let query=``;
    let paramArr=[];
    for (const key in id) {
        if (id.hasOwnProperty(key)){
            console.log("当前主键:"+key);
            const element = id[key]
            query= `delete from `+table+` where `+key+` in (?)`;
            paramArr[0]=element;
        }      
    }
    return querySearch(query,paramArr,function(results,fields){
        callback(results);
    })
}

module.exports = restDbModule;