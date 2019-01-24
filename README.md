# Express Minimum Viable Product
When I start a development of a "Minimum Viable Product" orientend to web using node.js and express.js I always start doing the same things.
So I decide to create a repo with all this things ready to go.

- [x] Setup Express.js
- [x] Structure directories Routes, Controllers, Views and Libs
- [x] Add MongoDB query string
- [x] Add Bootstrap, jquery, Angular, etc
- [x] Install some security modules (helmet for Headers)
- [x] Add a basic bootstrap template with header, footer, menubar, etc
- [x] Local User Registration
- [x] Log-in for local users with Passportjs
- [x] Enable/disable local login
- [x] Log-in/Register for facebook users with Passportjs
- [x] Enable/disable facebook login/register
- [x] i18n
- [x] Geoip Language
- [x] Core e-mails lib
- [x] Contact form
- [x] Local User Register Confirmation enable/disable
- [x] Forgot Password
- [x] Newsletter suscription
- [x] My account menu
- [ ] Update profile, picture, name, etc.
- [ ] Account settings (chage password and delete account)
- [ ] Email preferences

## 1.Install

```bash
$ git clone git@github.com:hecore/node-express-miniapp.git
$ cd node-exppress-miniapp
$ npm install
```

## 2.Run

```bash
$ ./start.sh
```

(work in progress...)


## 3.project structure

default config--no need modify
appconfig/routecfg.js
appconfig/errcfg.js
appconfig/local.js

append config--append by userself
appconfig/commoncfg.js  --通用第三方模块加载

## 4.db use
current db -- mysql
code loaction: extension/middleware/mysqldb/dbtool.js

## 5.routes  --append new router then append this app.js routecfg.
mock.js  --- 前端模拟数据
restdb.js ---测试rest数据(关联数据库)--提供测试db和通用传db名称接口
miniapp.js ---小程序对接rest接口(关联数据库)--使用通用传db名称接口

#### 后续将进一步拆分,控制参数格式和相应验证。

index.js --对接ejs路由
myaccount.js --ejs接口模板

## 6.tool --no need modify
cn encode.js -- 解决中文乱码

