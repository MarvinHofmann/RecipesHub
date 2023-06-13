const router = require('express').Router();
const bcrypt = require('bcryptjs')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const passport = require("passport")

/**
 * Endpoint to register a user with its credentials
 */
router.post("/register", async function (req, res) {
    const { username, firstName, lastName, email, password } = req.body
    if (!username || !firstName || !lastName || !email || !password) return res.status(400).send({ message: "No informations Send", code: "E0" })
    // Validation
    if (password.length < 6)
        return res.status(400).json({ message: "Password less than 6 characters" })

    //check if user exists
    const userExists = await User.findOne({ username: username }).exec();
    if (userExists) return res.status(400).send({ message: "User with this username already exists", code: "E1" });

    //Hash pass
    const salt = await bcrypt.genSalt(6)
    const hashPassword = await bcrypt.hash(password, salt)

    //Store new user
    await User.create({
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword
    }).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error while creating User", code: "E2" })
    })
    res.status(201).send(username)
});

/**
 * Endpoint to login, if user is authenticated with the password the function
 * returns a JWT token within a httpOnly cookie. Cookie maxAge and JWT token expiring time
 * are set to session if the user not pressed "remember me". Otherwise it will be set to 30d
 */
router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                console.log(err);
                const error = new Error('An error occurred.', err);
                return next(error);
            }
            req.login(user, { session: false },
                async (error) => {
                    if (error) return next(error);
                    const { username, password, rememberMe } = req.body
                    const sessionToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                    let jwtOptions = {};
                    let cookieOptions = {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                    }
                    // Set expiring date of jwt token and the cookie to 30d
                    if (rememberMe) {
                        cookieOptions.maxAge = 2592000000
                        jwtOptions = { expiresIn: 2592000000 };
                    }
                    res.cookie("access_token", token, cookieOptions)
                    user.password = undefined
                    res.status(200).send({ user: user, sessionToken: sessionToken })
                }
            );
        } catch (error) {
            return next(error);
        }
    }
    )(req, res, next);
}
);

/**
 * Deletes the httpOnly Cookie with the name access_token
 */
router.get("/logout", async (req, res) => {
    res.clearCookie("access_token")
    res.status(200).send({ message: "Logout successful" })
});


/**
 * Updates the userPW in DB
 */
router.put("/changePW",  passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if (newPassword.length < 6 || !oldPassword || !newPassword) return res.status(400).json({ message: "False Information" })

    //get user PW
    const userPW = await User.findOne({ _id: req.userID }, { password: 1 }).exec();
    if (!userPW) return res.status(400).send({ message: "Cant find user", code: "E1" });

    //check if password is correct
    const validPassword = await bcrypt.compare(oldPassword, userPW.password);
    if (!validPassword) return res.status(400).send({ message: "Old password is wrong", code: "E1" });

    //Hash new password
    const salt = await bcrypt.genSalt(6)
    const hashPassword = await bcrypt.hash(newPassword, salt)

    const query = User.updateOne({ _id: req.userID }, { password: hashPassword })
    await query.exec().then(function (result) {
        return res.status(200).send(result)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while changing PW", code: "E2", error: err });
    });
});

/**
 * Deletes the user, that sends the request
 */
router.delete("/delete",  passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await User.findOne({ "_id": req.userID }).exec();
    if (!user) return res.status(400).send({ message: "No User with that id", code: "E1" });

    await User.deleteOne({ "_id": req.userID }).then(function () {
        res.clearCookie("access_token")
        res.status(200).send({ message: "User deleted" })
    }).catch(function (error) {
        return res.status(400).send({ message: "Cant delete User", code: "E2", error: error });
    });
});

module.exports = router

