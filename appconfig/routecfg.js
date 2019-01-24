module.exports = (app,routeCfg) => {
    console.log(typeof(routeCfg));
    for(var p in routeCfg){
        //动态注册路由
        app.use('/',routeCfg[p]);
    }
}

// app.use('/', routeCfg.indexRoutes);
// app.use('/', routeCfg.myAccountRoutes);