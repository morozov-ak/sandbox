const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next) =>{
    if (req.method==='OPTIONS'){
        console.log('wtf')
        return next()
    }
    try{
        console.log('wtf2')
        const token = req.headers.authorization.split(' ')[1]
        
        if (!token){
            return res.status(401).json({message:'Нет авторизации'})
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        console.log("decoded:", decoded)
        req.user = decoded
        req.user2 = decoded
        next()
    }catch(e){
        
        res.status(401).json({message:'Нет авторизации',e})


    }


}