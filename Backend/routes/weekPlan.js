const router = require('express').Router();
const User = require('../models/userSchema')
// Authorization Middleware
const authorization = require("../middleware/verifyToken")

router.get("/plan", authorization, async (req, res) => {
    const query = User.findOne({ _id: req.userID }, { _id: 0, weekPlan: 1 })
    await query.exec().then(function (wPlan) {
        if (!wPlan) return res.status(400).send({ message: "No tags for that user", code: "E1" });
        return res.status(200).send(wPlan)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for plan", code: "E2", error: err });
    });
});


router.put("/newWeekEvent", authorization, async (req, res) => {
    const { title, color, recipeID, date } = req.body
    if (!title || !color || !recipeID || !date) return res.status(400).send({ message: "No information send", code: "E1" })
    const query = User.updateOne({ _id: req.userID }, { $addToSet: { weekPlan: { title: title, color: color, recipeID: recipeID, date: date } } })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send(updatedElement)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updateing weekPlan", code: "E2", error: err });
    });
});

module.exports = router