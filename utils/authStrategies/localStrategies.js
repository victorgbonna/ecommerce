const passport= require('passport')
const User = require('../../modules/users/models/user')
const localStrategy=require('passport-local').Strategy


passport.use(new localStrategy({
    usernameField:'email'
},
    async(email,password, done)=>{
        try{
            const user= await User.findOne({email})
            return done(null,user)
        }
        catch(e){
            done(e)
        }
    }
))

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser(async (_id,done)=>{
    try{
        const user= await User.findOne({_id}) 
        done(null,user)
    }
    catch(e){
        done(e)
    }
})


