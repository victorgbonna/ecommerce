const mongoose =require('mongoose')

const userSchema=mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Name is required'],
        maxlength:[30, 'Name cannot be greater than 30 characters'],
        minlength:[2, 'Name cannot be lesser than 2 characters']
    },
    name: {
        type:String,
        required:[true, 'Email is required'],
        maxlength:[120, 'Email cannot be greater than 30 characters'],
        minlength:[2, 'Email cannot be lesser than 2 characters'],
        index:true
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:False
    }
},{
    timestamps:true
})

const User=mongoose.model('users', userSchema)

module.exports=User