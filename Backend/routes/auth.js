const router = require('express').Router();
const bcrypt = require('bcryptjs')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')

// Authorization Middleware
const authorization = require("./verifyToken")

router.post("/register", async function (req, res) {
    const { username, firstName, lastName, email, password } = req.body
    // Validation
    if (password.length < 6)
        return res.status(400).json({ message: "Password less than 6 characters" })

    //check if user exists
    const userExists = await User.findOne({ username: username }).exec();
    if (userExists)
        return res.status(400).send({ message: "User with this username already exists", code: "E1" });

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

router.post("/login", async (req, res) => {
    const { username, password } = req.body

    //check if user exists
    const user = await User.findOne({ username: username }).exec();
    if (!user) return res.status(400).send({ message: "Username or password is wrong", code: "E1" });

    //check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send({ message: "Username or password is wrong", code: "E1" });

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    });
    user.password = undefined
    res.status(200).send(user)
})


router.get("/update", authorization, (req, res) => {
    res.status(200).send("Access Granted")
});

router.delete("/user", authorization, (req, res) => {
    res.status(200).send("Access Granted")
});

module.exports = router

