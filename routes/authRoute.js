const express= require('express')
const router=express.Router()
const addUser=require('../modules/users/service/userService')
const registerSchema=require('../modules/users/validation/regVal')
const {joiErrorFormatter, mongooseErrorFormatter} = require('../utils/validationFormatter')


router.get('/register',(req, res)=>{
    return res.render('register', {message: {},errors: {}, formData:{}})
})

router.post('/register', async(req,res)=>{
    try {
        const {error}= registerSchema.validate(req.body,{
            abortEarly: false
        })
        if (error){
            // return res.send(joiErrorFormatter(error))
            return res.render('register', {
                message:{
                    type: 'error',
                    body: 'Validation Errors'
                },
                errors: joiErrorFormatter(error),
                formData:req.body
            })
        }
        // return res.send(result)
        const user=await addUser(req.body)
        return res.render('register', {message:{
            type: 'success',
            body: 'Registration success'
        },
        errors: {},
        formData:req.body})
    } catch (e) {
        console.error(e)
        // return res.send(mongooseErrorFormatter(e))
        return res.status(400).render('register', {
            message:{
                type: 'error',
                body: 'Validation Errors'
            },
            errors: mongooseErrorFormatter(e),
            formData:req.body
        })
    }
})


module.exports=router