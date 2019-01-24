var mysql=require('mysql');
var env = process.env.NODE_ENV !== 'production';
if(env){
    //production
    var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'ylbx'
    });
}else{
    //dev
    var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'dev'
    });
}

function querySql(sql, arr, callback){
    //建立链接
    pool.getConnection(function(err,connection){
        if(err){throw err;return;}
        connection.query(sql,arr,function(error,results,fields){
            //将链接返回到连接池中，准备由其他人重复使用
            connection.release();
            if(error) throw error;
            //执行回调函数，将数据返回
            callback && callback(results,fields);
        });
    });
}

//https://blog.csdn.net/crazy_jialin/article/details/79674790
// module.export ={
//     env:env,
//     db:pool,
//     query:query
// }
//module.exports=pool;
module.exports=querySql;