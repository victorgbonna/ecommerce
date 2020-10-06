const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/ecommerce',{
    useNewUrlParser:true, useUnifiedTopology: true
})
mongoose.connection.on('open', () =>{
    console.log('Connected succesfully')
})

module.exports= mongoose.connection