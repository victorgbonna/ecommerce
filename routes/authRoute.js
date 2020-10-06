const express= require('express')
const router=express.Router()
const addUser=require('../modules/users/service/userService')
const registerSchema=require('../validation/regVal')
const {joiErrorFormatter, mongooseErrorFormatter} = require('../utils/validationFormatter')
const passport= require('passport')
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const flasherMiddleware = require('../middleware/flasherMiddleware')

// const authMiddleware = require('../middleware/authMiddleware')

router.get('/register',guestMiddleware, flasherMiddleware,(req, res)=>{
    return res.render('register')
})

router.post('/register', guestMiddleware, async(req,res)=>{
    try {
        const {error}= registerSchema.validate(req.body,{
            abortEarly: false
        })
        if (error){
            req.session.flashData={
                message:{ 
                    type: 'error',
                    body: 'Validation Errors'
                },
                errors: joiErrorFormatter(error),
                formData:req.body
            }
            // return res.send(joiErrorFormatter(error))
            return res.redirect('/register')
            // return res.render('register')
        }
        // return res.send(result)
        const user=await addUser(req.body)
        console.log('password -'+ req.body.password)
        return res.render('register', {message:{
            type: 'success',
            body: 'Registration success'
        },
        formData:req.body
    })
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
router.get('/login', guestMiddleware, flasherMiddleware,(req,res)=>{
    return res.render('login')

})
// app.get('/login', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//       if (err) { return next(err); }
//       if (!user) { return res.redirect('/login'); }
//       req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         return res.redirect('/users/' + user.username);
//       });
//     })(req, res, next);
//   });


router.post('/login', guestMiddleware, (req,res, next) =>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            console.log('ther ean error in login')
            console.error('Err: ',err)
            req.session.flashData={
                message:{ 
                    type: 'error',
                    body: 'Login failed'
                }
            }   
            return res.redirect('/login')
        }
        if (!user){
            console.log('no user on login')
            req.session.flashData={
                message:{ 
                    type: 'error',
                    body: info.message
                }
            }   
            return res.redirect('/login')
        } 
        req.login(user,(err)=>{
            if(err){
                console.error('Err: ',err)
                req.session.flashData={
                    message:{ 
                        type: 'error',
                        body: 'Login Failed'
                    }
                } 
            }
            return res.redirect('/homepage') 
        })
    })(req,res,next)
})
// passport.authenticate('local', {successRedirect:'/',
// failureRedirect:'/login',
// failureFlash: false}), (req,res)=>{
//     return res.render('login', {
//         message: {
//         type: 'success',
//         body: 'login success'
//     }
//     })
// })
// logs out the user
router.get('/logout', authMiddleware,(req,res) =>{
    req.logout()
    res.redirect('/')
})
module.exports=router