module.exports=(app,dev)=>{
    console.log("config errcfg");
    // catch 404 and forward to error handler

    app.use(function(req, res, next) {
        var err = new Error('Not Found Page');
        err.status = 404;
        // 正式环境下面的不注释
        // res.render('error', {
        //     message: err.message,
        //     error: {}
        // });
        next(err);
    });
    
    // error handlers
    var dev = process.env.NODE_ENV !== 'production';

    // development error handler
    // will print stacktrace
    if (dev) {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
            message: err.message,
            error: err
            });
        });
    }
    
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}