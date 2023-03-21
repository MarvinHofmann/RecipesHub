const router = require('express').Router();
const authorization = require("../middleware/verifyToken")
const { Recipe } = require("../models/recipeSchema")

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


router.get("/randomRecipes", authorization, (req, res) => {
    res.status(200).send("Random")
});

router.get("/recipe/:id", authorization, async (req, res) => {
    const recipe = await Recipe.findOne({ "_id": req.params.id }).exec();
    if (!recipe) return res.status(400).send({ message: "No Recipe with that id", code: "E1" });
    res.status(200).send(recipe)
});

router.get("/allRecipes", authorization, async (req, res) => {
    const recipes = await Recipe.find().exec();
    if (!recipes) return res.status(400).send({ message: "No Recipes in the DB", code: "E1" });
    res.status(200).send(recipes)
});
module.exports = router