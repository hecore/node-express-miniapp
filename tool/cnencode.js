module.exports=(req, res, next)=>{
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
    response = {
          first_name:req.body.first_name,
          last_name:req.body.last_name
    };
}
