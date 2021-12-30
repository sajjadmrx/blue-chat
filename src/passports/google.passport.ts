import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import { IUSER } from '../interfaces/User.interfaces';
import userModel from '../models/User.model';
const googleStrategy = GoogleStrategy.Strategy

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(async function (id, done) {
    const user = await userModel.findById(id)
    done(null, user)
})

passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, cb) {
        let user = await userModel.findOne({ email: profile._json.email })
        if (!user)
            user = await userModel.create({
                username: profile._json.name,
                email: profile._json.email,
                provider: 'google',
                avatar: profile._json.picture,
                //    password: 
            })
        return cb(null, user._id)
    }
));