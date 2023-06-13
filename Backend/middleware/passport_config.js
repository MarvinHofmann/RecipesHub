// passport login middleware
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const JWTstrategy = require('passport-jwt').Strategy;
const User = require('../models/userSchema')

/**
 * Extracts the cookie names access_token from the request cookies and
 * returns the token
 * @param {*} req http request
 * @returns access_token from tokens
 */
const cookieExtractor = req => {
    const token = req.cookies.access_token;
    if (!token) return null;
    return token
}

function init() {
    passport.use('login',
        new localStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, async (username, password, done) => {
            try {
                const user = await User.findOne({ username: username });
                console.log(user);
                if (!user) return done(null, false, { message: 'User not found' });
                const validate = await user.isValidPassword(password);
                console.log(validate);
                if (!validate) return done(null, false, { message: 'Wrong Password' });
                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                console.log("Error while Login ",  err);
                return done(error);
            }
        }
        )
    );
    passport.use(
        new JWTstrategy({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: cookieExtractor,
        },
            async (token, done) => {
                try {
                    return done(null, token._id);
                } catch (error) {
                    console.log("Error while verifying JWT ",  err);
                    done(error);
                }
            }
        )
    );
}
module.exports = init;




