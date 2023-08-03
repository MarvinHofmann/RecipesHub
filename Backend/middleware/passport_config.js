const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const JWTstrategy = require('passport-jwt').Strategy;
const User = require('../models/userSchema')

/**
 * Extracts the "access_token" cookie from the request and returns the token.
 * @param {Object} req - The HTTP request object.
 * @returns {String|null} - The "access_token" from the cookies, or null if not found.
 */
const cookieExtractor = req => {
    const token = req.cookies.access_token;
    if (!token) return null;
    return token
}

/**
 * Initializes passport authentication strategies: "login" and "jwt".
 * The "login" strategy uses the localStrategy to authenticate users with a username and password.
 * The "jwt" strategy uses the JWTstrategy to authenticate users based on the "access_token" cookie.
 * @function init
 */
function init() {
    // "login" strategy
    passport.use('login',
        new localStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, async (username, password, done) => {
            try {
                const user = await User.findOne({ username: username });
                if (!user) return done(null, false, { message: 'User not found' });
                const validate = await user.isValidPassword(password);
                if (!validate) return done(null, false, { message: 'Wrong Password' });
                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
        )
    );
    // "jwt" strategy
    passport.use('jwt',
        new JWTstrategy({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: cookieExtractor,
        },
            async (token, done) => {
                try {
                    return done(null, token._id);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
}
module.exports = init;