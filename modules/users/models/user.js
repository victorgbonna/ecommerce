const mongoose =require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Name is required'],
        maxlength:[30, 'Name cannot be greater than 30 characters'],
        minlength:[2, 'Name cannot be lesser than 2 characters']
    },
    email: {
        type:String,
        required:[true, 'Email is required'],
        maxlength:[120, 'Email cannot be greater than 120 characters'],
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
        default:false
    }
},{
    timestamps:true
})
userSchema.pre('save', async function(next){
    if (!this.isModified('password')) next()
    this.password= await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.checkPassword= async function(password){
    console.log(password)
    const result= await bcrypt.compare(password, this.password)
    console.log(result)
    return result
}

const User=mongoose.model('users', userSchema)

module.exports=User