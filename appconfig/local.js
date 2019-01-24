module.exports=(app)=>{
  var baseFile="../config.js";
  app.use(function(req, res, next) {
    req.app.locals.registerEnabled=registerEnabled = require(baseFile).registerEnabled;
    req.app.locals.facebookLoginEnabled=require(baseFile).facebookLoginEnabled;
    req.app.locals.localLoginEnabled=require(baseFile).localLoginEnabled;
    req.app.locals.loggedUser = req.user;
    next();
  });
}