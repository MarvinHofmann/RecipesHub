const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post("/register", async function (req, res) {
    const userCredentials = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    // Validation

    //check if user exists
    const userExists = false;
    if (userExists) {
        return res.status(400).send("User with this username already exists");
    }

    //Hash pass
    const salt = await bcrypt.genSalt(6)
    const hashPassword = await bcrypt.hash(password, salt)

    //Store new user
});

module.exports = router

