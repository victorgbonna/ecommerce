const mongoose=require('mongoose')
const config=require('./config')
mongoose.connect(config.mongoUrl,{
    useNewUrlParser:true, useUnifiedTopology: true
})
mongoose.connection.on('open', () =>{
    console.log('Connected succesfully')
})

module.exports= mongoose.connection