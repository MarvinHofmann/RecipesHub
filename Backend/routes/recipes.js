const router = require('express').Router();
const authorization = require("../middleware/verifyToken")
const { Recipe } = require("../models/recipeSchema")

router.get("/randomRecipes", authorization, (req, res) => {
    res.status(200).send("Random")
});

router.post("/addRecipe", authorization, async (req, res) => {
    if (!req.body.recipe) return res.status(400).send({ message: "No information send", code: "E1" })

    // Create final recipe
    await Recipe.create({
        title: req.body.recipe.title,
        description: req.body.recipe.description,
        source: req.body.recipe.source,
        images: req.body.recipe.images,
        processingTime: req.body.recipe.processingTime,
        category: req.body.recipe.category,
        tags: req.body.recipe.tags,
        ingredients: req.body.recipe.ingredients,
        steps: req.body.recipe.steps
    }).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error while creating Recipe", code: "E2", error: err })
    })
    res.status(201).send({ message: "Recipe Created" })
})
module.exports = router