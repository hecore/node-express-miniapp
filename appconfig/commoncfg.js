module.exports=(app)=>{
    // 获取路径
    var logger = require('morgan');
    var session = require('express-session');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var passport = require('passport');
    var helmet = require('helmet');
    var flash = require('connect-flash');
    
    // data for trans
    app.use(flash());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    
    app.use(session({
      secret: require("../config.js").sessionSecret,
      saveUninitialized: true,
      resave: true
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    //TODO: tune
    app.use(helmet());
}
