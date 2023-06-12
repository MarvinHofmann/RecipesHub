const router = require('express').Router();
const User = require('../models/userSchema')
const { Recipe } = require("../models/recipeSchema")

router.get("/plan", async (req, res) => {
    const query = User.findOne({ _id: req.user }, { _id: 0, weekPlan: 1 })
    await query.exec().then(function (wPlan) {
        if (!wPlan) return res.status(400).send({ message: "No tags for that user", code: "E1" });
        return res.status(200).send(wPlan)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for plan", code: "E2", error: err });
    });
});


router.put("/newWeekEvent", async (req, res) => {
    const { recipeID, date } = req.body
    if (!recipeID || !date) return res.status(400).send({ message: "No information send", code: "E1" })
    // Get title and color from Recipe
    const recipe = await Recipe.findOne({ _id: recipeID, userID: req.user }, { title: 1, color: 1 }).exec()
    if (!recipe) return res.status(400).send({ message: "No recipe found", code: "E2" })

    const query = User.updateOne({ _id: req.user }, { $addToSet: { weekPlan: { title: recipe.title, color: recipe.color, recipeID: recipeID, date: date } } })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send(updatedElement)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updateing weekPlan", code: "E3", error: err });
    });
});

module.exports = router