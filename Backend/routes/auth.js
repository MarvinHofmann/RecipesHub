const router = require('express').Router();
const bcrypt = require('bcryptjs')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const passport = require("passport");
const { Recipe } = require('../models/recipeSchema');

/**
 * POST endpoint to register a new user with the provided credentials.
 * @function
 * @name POST/register
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success status and the username of the newly registered user.
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
 * POST endpoint to log in a user and generate a JWT token within a httpOnly cookie.
 * The token's expiration time can be set to session or 30 days based on the "remember me" option.
 * @function
 * @name POST/login
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} - Success status, user data, and the JWT token as a session cookie.
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
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                    let cookieOptions = {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                    }
                    // Set expiring date of jwt token and the cookie to 30d
                    if (rememberMe) {
                        cookieOptions.maxAge = 2592000000
                    }
                    res.cookie("access_token", token, cookieOptions)
                    user.password = undefined
                    res.status(200).send({ user: user, sessionToken: token })
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
 * GET endpoint to log out a user by clearing the httpOnly cookie.
 * @function
 * @name GET/logout
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success status and a message confirming successful logout.
 */
router.get("/logout", async (req, res) => {
    res.clearCookie("access_token")
    res.status(200).send({ message: "Logout successful" })
});


/**
 * PUT endpoint to change the password of the user.
 * @function
 * @name PUT/changePW
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success status and the updated user data.
 */
router.put("/changePW", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if (newPassword.length < 6 || !oldPassword || !newPassword) return res.status(400).json({ message: "False Information" })

    //get user PW
    const userPW = await User.findOne({ _id: req.user }, { password: 1 }).exec();
    if (!userPW) return res.status(400).send({ message: "Cant find user", code: "E1" });

    //check if password is correct
    const validPassword = await bcrypt.compare(oldPassword, userPW.password);
    if (!validPassword) return res.status(400).send({ message: "Old password is wrong", code: "E1" });

    //Hash new password
    const salt = await bcrypt.genSalt(6)
    const hashPassword = await bcrypt.hash(newPassword, salt)

    const query = User.updateOne({ _id: req.user }, { password: hashPassword })
    await query.exec().then(function (result) {
        return res.status(200).send(result)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while changing PW", code: "E2", error: err });
    });
});


/**
 * DELETE endpoint to delete the authenticated user and associated recipes from the database.
 * @function
 * @name DELETE/delete
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success status and a message confirming successful user deletion.
 */
router.delete("/delete", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await User.findOne({ "_id": req.user }).exec();
    if (!user) return res.status(400).send({ message: "No User with that id", code: "E1" });

    // Delete all Recipes of the User
    await Recipe.deleteMany({ userID: req.user }).exec();

    await User.deleteOne({ "_id": req.user }).then(function () {
        res.clearCookie("access_token")
        res.status(200).send({ message: "User deleted" })
    }).catch(function (error) {
        return res.status(400).send({ message: "Cant delete User", code: "E2", error: error });
    });
});

module.exports = router

