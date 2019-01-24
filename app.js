/**
 * 模块 
 */
//1.1 引入必须相应模块和对象 
var express = require('express');
var path = require('path');
var app = express();
var dev = process.env.NODE_ENV !== 'production';
var i18n = require("i18n-express");
var favicon = require('serve-favicon');
// 1.2 路由模块导入
var routeCfg={
  miniappRoutes:require('./routes/miniapp'),
  restMock:require('./routes/mock'),
  restDb:require('./routes/restdb'),
  indexRoutes: require('./routes/index'),
  myAccountRoutes:require('./routes/myaccount')
};

/**
 * 视图
 */
//2.1 view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//2.2 resources config.
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ["en","es"]
}));

/**
 *  配置模块
 */
// 2.3 app.use && route && err处理
require("./appconfig/commoncfg")(app);
//default cfg locals 
require("./appconfig/local")(app);
require('./appconfig/routecfg')(app,routeCfg);
require('./appconfig/errcfg')(app,dev)


/**
 * 端口配置
 */
var ServerConf=require("./appconfig/servercfg");
process.env.PORT=ServerConf.ServicePort;

module.exports =app;