const router = require('express').Router();
const User = require('../models/userSchema')
// Authorization Middleware
const authorization = require("../middleware/verifyToken")

router.get("/list", authorization, async (req, res) => {
    const query = User.findOne({ _id: req.userID }, { _id: 0, shoppingList: 1 })
    await query.exec().then(function (sList) {
        if (!sList) return res.status(400).send({ message: "No tags for that user", code: "E1" });
        return res.status(200).send(sList)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for shoppingList", code: "E2", error: err });
    });
});

router.put("/shoppingElement", authorization, async (req, res) => {
    const { name, amount, unit } = req.body
    if (!name || !amount || !unit) return res.status(400).send({ message: "No information send", code: "E1" })
    const query = User.updateOne({ _id: req.userID }, { $addToSet: { shoppingList: { name: name, amount: amount, unit: unit } } })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send(updatedElement)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating shoppingList", code: "E2", error: err });
    });
});


module.exports = router