const express= require('express')
const bodyParser= require('body-parser')
const authRoute= require('./routes/authRoute')
const User= require('./modules/users/models/user')
require('./utils/db')

const app=express()
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'ejs')

app.use('/', authRoute)

app.get('/', (req,res)=>{
    return res.render('index')
})

app.listen(3000,()=>{
    console.log('Server running on port 3000');
})

module.exports= app