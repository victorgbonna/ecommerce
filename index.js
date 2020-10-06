const express= require('express')
require('./utils/db')
const app=express()

app.set('view engine', 'ejs')

app.get('/', (req,res)=>{
    return res.render('index')
})

app.get('/register', (req,res)=>{
    return res.render('register')
})


app.listen(3000,()=>{
    console.log('Server running on port 3000');
})

module.exports= app