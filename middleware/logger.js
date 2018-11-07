
function logger(req, res, next){
    console.log('logged the message..');
    next();
}

module.exports=logger;