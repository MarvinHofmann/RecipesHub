const router = require('express').Router();
const User = require('../models/userSchema')

// Authorization Middleware
const authorization = require("../middleware/verifyToken")

router.get("/tags", authorization, async (req, res) => {
    const query = User.findOne({ _id: req.userID }, { _id: 0, tags: 1 })
    await query.exec().then(function (tags) {
        if (!tags) return res.status(400).send({ message: "No tags for that user", code: "E1" });
        return res.status(200).send(tags)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for tags", code: "E2", error: err });
    });
});

router.get("/categories", authorization, async (req, res) => {
    const query = User.findOne({ _id: req.userID }, { _id: 0, categories: 1 })
    await query.exec().then(function (categories) {
        if (!categories) return res.status(400).send({ message: "No categories for that user", code: "E1" });
        return res.status(200).send(categories)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for categories", code: "E2", error: err });
    });
});

module.exports = router