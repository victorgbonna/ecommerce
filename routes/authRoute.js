const express= require('express')
const router=express.Router()
const addUser=require('../modules/users/service/userService')


router.get('/register',(req, res)=>{
    return res.render('register', {message: null})
})

router.post('/register', async(req,res)=>{
    try {
        const user=await addUser(req.body)
        return res.render('register', {message:"Registration Sucessful"})
    } catch (e) {
        console.error(e)
        return res.status(400).render('register', {message:'Something went wrong'})
    }
})


module.exports=router