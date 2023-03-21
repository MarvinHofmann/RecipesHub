const router = require('express').Router();
const authorization = require("../middleware/verifyToken")
const { Recipe } = require("../models/recipeSchema")

router.get("/randomRecipes", authorization, (req, res) => {
    res.status(200).send("Random")
});

router.post("/addRecipe", authorization, async (req, res) => {
    if (!req.body) return res.status(400).send({ message: "No information send", code: "E1" })
    // Create final recipe
    await Recipe.create({
        title: req.body.title,
        description: req.body.description,
        source: req.body.source,
        images: req.body.images,
        processingTime: req.body.processingTime,
        category: req.body.category,
        tags: req.body.tags,
        ingredients: req.body.ingredients,
        steps: req.body.steps
    }).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error while creating Recipe", code: "E2", error: err })
    })
    res.status(201).send({ message: "Recipe Created" })
})
module.exports = router