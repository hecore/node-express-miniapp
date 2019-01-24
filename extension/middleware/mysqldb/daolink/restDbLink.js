/**
 * 导入mysql 连接池 方法
 */
var querySearch = require('../dbtool');
let restDbLink = {};

// db.query('select * from user', [], function(results,fields){
// 	//查询后的回调
// 	//Results代表是查询的结果，如果是插入修改等操作，则返回影响数据库信息的对象
// 	// fields代表查询的字段信息
// }

//不可回调的请求
restDbLink.noCallSearchList = function (userName) {//查询用户
    console.log("查询开始");
    let query = `SELECT * FROM test WHERE user = '${userName}'`;
    console.log("查询用户"+query);
    return querySearch(query, [], function(results,fields){
        console.log(results);
        return results;
    });
}

/**
 * 通用sql执行方法
 * @sql 执行查询sql
 * @arr sql相关参数
 * @callback 回调sql执行结果的函数
 */
restDbLink.exeSql=function(sql,arr,callback){
    return querySearch(sql,arr,function(results,fields){
        callback(results);
    });
}

restDbLink.searchList = function (userName,callback) {//查询用户
    console.log("查询开始");
    let query = `SELECT * FROM test WHERE  userid = '${userName}'`;
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
 */
restDbLink.add=(paramObj,callback)=>{
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
    let query=`insert into test(`+keyArr.join(',')+`) values(`+valSetArr.join(',')+`)`;
    console.log(query);
    return querySearch(query,valueArr,function(results,fields){
        callback(results);
    })
}

//insertBatch


restDbLink.addUser = function (user) {//添加用户
    let query = `insert into MyClass values `;
    return querySearch(query)
}
restDbLink.jsError = function (jsError) {//添加JS错误信息
    let query = `insert into MyClass values `;
    return querySearch(query)
}

/**
 * 更新数据方法 by id
 * id 格式：
 * {
 *   "xh":5
 * }
 * 或
 * 5  
 */
restDbLink.update = (paramObj,id,callback)=>{
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
        query=`update test set `+setArr.join(',')+` where id=?`;
        console.log("当前默认主键:id");
        paramArr[0]=id;
    }else{//自定义主键
        for (const key in id) {
            if (id.hasOwnProperty(key)){
                console.log("当前主键:"+key);
                const element = id[key]
                query=`update test set `+setArr.join(',')+` where `+key+`=?`;
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
 * id 格式：
 * {
 *   "xh":5
 * }
 * 或
 * 5  
 */
restDbLink.delete=(id,callback)=>{
    let query= `delete from test where id=?`;
    let paramArr=[];
    if(typeof(id)=="number"){//默认主键是id
        console.log("当前默认主键:id");
        paramArr[0]=id;
    }else{//自定义主键
        for (const key in id) {
            if (id.hasOwnProperty(key)){
                console.log("当前主键:"+key);
                const element = id[key]
                query= `delete from test where `+key+`=?`;
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
 * id格式     '1,2,3,4,5' 
 */
restDbLink.deleteBatch=(id,callback)=>{
    let query=``;
    let paramArr=[];
    for (const key in id) {
        if (id.hasOwnProperty(key)){
            console.log("当前主键:"+key);
            const element = id[key]
            query= `delete from test where `+key+` in (?)`;
            paramArr[0]=element;
        }      
    }
    return querySearch(query,paramArr,function(results,fields){
        callback(results);
    })
}

module.exports = restDbLink;