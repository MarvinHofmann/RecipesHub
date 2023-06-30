const router = require('express').Router();
const User = require('../models/userSchema')
const { Recipe } = require("../models/recipeSchema")
const ObjectId = require('mongoose').Types.ObjectId;

router.get("/plan", async (req, res) => {
    const query = User.findOne({ _id: req.user }, { _id: 0, weekPlan: 1 })
    const curr = new Date; // get current date
    let responseArray = [];
    // First day is the day of the month - the day of the week
    for (let i = 1; i <= 7; i++) {
        const first = curr.getDate() - curr.getDay() + i;
        const date = new Date(curr.setDate(first)).toDateString();
        responseArray.push({ date: date, recipes: [] })
    }
    await query.exec().then(function (wPlan) {
        if (!wPlan) return res.status(400).send({ message: "No tags for that user", code: "E1" });
        wPlan = wPlan.weekPlan
        for (let i = 0; i < wPlan.length; i++) {
            responseArray.forEach(responseElem => {
                if (new Date(wPlan[i].date).toDateString() == new Date(responseElem.date).toDateString()) {
                    responseElem.recipes.push(wPlan[i])
                }
            })
        }
        return res.status(200).send(responseArray)
    }).catch(function (err) {
        console.log(err);
        return res.status(500).send({ message: "Error while searching for plan", code: "E2", error: err });
    });
});

router.get("/today", async (req, res) => {
    const query = User.findOne({ _id: req.user }, { _id: 0, weekPlan: 1 })
    let todaysRecipes = []
    await query.exec().then(function (wPlan) {
        if (!wPlan) return res.status(400).send({ message: "No tags for that user", code: "E1" });
        wPlan = wPlan.weekPlan
        for (let i = 0; i < wPlan.length; i++) {
            if (new Date(wPlan[i].date).toDateString() === new Date().toDateString()) {
                todaysRecipes.push(wPlan[i])
            }
        }
        return res.status(200).send(todaysRecipes)
    }).catch(function (err) {
        console.log(err);
        return res.status(500).send({ message: "Error while searching for plan", code: "E2", error: err });
    });
});


router.post("/newWeekEvent", async (req, res) => {
    const { recipeID, date } = req.body
    if (!recipeID || !date) return res.status(400).send({ message: "No information send", code: "E1" })
    // Get title and color from Recipe
    const recipe = await Recipe.findOne({ _id: recipeID, userID: req.user }, { title: 1, category: 1 }).exec()
    if (!recipe) return res.status(400).send({ message: "No recipe found", code: "E2" })

    const query = User.updateOne({ _id: req.user }, { $addToSet: { weekPlan: { title: recipe.title, color: recipe.color, recipeID: recipeID, date: date } } })
    await query.exec().then(function () {
        return res.status(200)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updateing weekPlan", code: "E3", error: err });
    });
});

router.post("/deleteWeekEvent", async (req, res) => {
    const { recipeID, date } = req.body;
    if (!recipeID || !date) return res.status(400).send({ message: "No information send", code: "E1" })
    const query = User.updateOne({ "_id": req.user, }, { $pull: { 'weekPlan': { "recipeID": new ObjectId(recipeID), "date": date } } })
    await query.exec().then(async function (result) {
        if (result.deletedCount < 1) return res.status(400).send({ message: "Element not found, nothing deleted", code: "E2" });
        return res.redirect(302, 'plan');
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while deleting Element", code: "E3", error: err });
    });
})

module.exports = router