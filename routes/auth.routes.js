const {Router} = require ('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
    '/register',
    [
        check('email','Что-то с почтой').isEmail(),
        check('password','Что-то с паролем').isLength({min:6})
    ], 
    async(req, res)=>{
    try{
        const errosrs=validationResult(req)
        console.log(validationResult(req))
        console.log(req.body)
        
        if(!errosrs.isEmpty()){
            console.log('Проверка наличия ошибок')
            return escape.status(400).json({
                errors: errors.array(),
                message:'Incorrect registration data'
            })
        }
        const{email, password}=req.body
        const candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message:'User exists'})
        }
        const hashedPassword =await bcrypt.hash(password,12)
        const user = new User({email, password:hashedPassword})
        await user.save()
        res.status(201).json({message:'User created'})

    }catch(e){
        res.status(500).json({message:"Что-то пошло не так ,блять"})
    }

})
// /api/auth/login
router.post(
    '/login', 
    [
        check('email','Input correct email').normalizeEmail().isEmail(),
        check('password','Input password').exists()
    ],
    async(req, res)=>{
    try{
        console.log('Проверка 1')
        const errors=validationResult(req)
        console.log('Проверка 2')
            if(!errors.isEmpty()){
                console.log("ошибки", errors)
                return escape.status(400).json({
                    errors: errors.array(),
                    message:'Incorrect login data'
                })
            }
            console.log('Проверка 3')
        const{email,password}=req.body
        console.log('Проверка 4',email,password)
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'User not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({message: 'Incorrect pass'})
        }
        const token = jwt.sign(
            {userId:user.id},
            config.get('jwtSecret'),
            {expiresIn:'1h'}

        )
        res.json({token,userId:user.id})
        //console.log(token,userId)  
        

    }catch(e){
        res.status(500).json({message:"Что-то пошло не так"})
    }
})


module.exports = router