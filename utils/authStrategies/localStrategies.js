const passport= require('passport')
const User = require('../../modules/users/models/user')
const localStrategy=require('passport-local').Strategy


passport.use(new localStrategy({
    usernameField:'email',
},
    async(email,password, done)=>{
        try{
            const user= await User.findOne({email})
            if(!user) {
                console.log('no user')
                return done(null, false, {message: "Incorrect Email"})                
            }

            if ( await user.checkPassword(password)) return done(null, user)
            console.log('no password')
            return done(null, false, {message: "Incorrect Password"})
        }
        catch(e){
            return done(e)
        }
    }
))

passport.serializeUser((user,done)=>{
    return done(null,user._id)
})

passport.deserializeUser(async (_id,done)=>{
    try{
        const user= await User.findOne({_id}) 
        return done(null,user)
    }
    catch(e){
        return done(e)
    }
})


