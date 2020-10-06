const express= require('express')
const session=require('express-session')
const bodyParser= require('body-parser')
const authRoute= require('./routes/authRoute')
const User= require('./modules/users/models/user')
require('./utils/db')

const app=express()
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'ejs')

// app.set('trust proxy',1)
app.use(session({
    secret: '642a3f8e31251692cd18d68281314984318abd3b',
    resave: false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

app.use('/', authRoute)

app.get('/', (req,res)=>{
    // console.log(req.session)
    // if(!req.session.name){
    //     req.session.name='John'
    // }
    // else{   
    //     console.log('Name', req.session.name)
    // }
    req.session.views=(req.session.views || 0) + 1
    console.log(req.session.views)
    return res.render('index')
})


app.listen(3000,()=>{
    console.log('Server running on port 3000');
})

module.exports= app