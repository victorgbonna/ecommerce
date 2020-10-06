const flasherMiddleware=(req, res,next)=>{
    if(req.session.flashData){
        // console.log(req.session.flashData[key])
        for (const key in req.session.flashData){
            // console.log(key)
            // console.log(req.session.flashData[key])
            res.locals[key] = req.session.flashData[key]
        }
        req.session.flashData= null
    }
    next()
}

module.exports= flasherMiddleware