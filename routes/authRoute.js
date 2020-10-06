const express= require('express')
const router=express.Router()
const addUser=require('../modules/users/service/userService')
const registerSchema=require('../modules/users/validation/regVal')


router.get('/register',(req, res)=>{
    return res.render('register', {message: null})
})

router.post('/register', async(req,res)=>{
    try {
        const {error}= registerSchema.validate(req.body,{
            abortEarly: false
        })
        if (error){
            return res.render('register', {message:'Validation Errors'})
        }
        // return res.send(result)
        const user=await addUser(req.body)
        return res.render('register', {message:"Registration Sucessful"})
    } catch (e) {
        console.error(e)
        return res.status(400).render('register', {message:'Something went wrong'})
    }
})


module.exports=router