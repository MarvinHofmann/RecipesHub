const router = require('express').Router();
const authorization = require("../middleware/verifyToken")
const { Recipe } = require("../models/recipeSchema")
const ObjectId = require('mongoose').Types.ObjectId;


/**
 * Endpoint to create a Recipe
 */
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
        steps: req.body.steps,
        portions: req.body.portions
    }).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error while creating Recipe", code: "E2", error: err })
    })
    res.status(201).send({ message: "Recipe Created" })
})


/**
 * Returns four random recipes useing the sample method of mongodb
 */
router.get("/randomRecipes", authorization, async (req, res) => {
    const query = Recipe.aggregate([{ $sample: { size: 4 } }])
    await query.exec().then(function (randomRecipes) {
        if (!randomRecipes) return res.status(404).send({ message: "No Recipes found", code: "E1" });
        randomRecipes.forEach(recipe => {
            recipe.imgSrc = "http://localhost:3443/api/images/recipeImage/" + recipe._id
        });
        return res.status(200).send(randomRecipes)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for random Document", code: "E2", error: err });
    });
});

/**
 * Returns the complete documnent of the recipe with the given id
 */
router.get("/recipe/:id", authorization, async (req, res) => {
    // Validate given Object ID
    if (!ObjectId.isValid(req.params.id)) return res.status(404).send({ message: `${req.params.id} isnt a valid ObjectID`, code: "E1" });
    const query = Recipe.findOne({ "_id": req.params.id }, { images: 0 })
    await query.lean().then(function (recipe) {
        if (!recipe) return res.status(404).send({ message: "No Recipe with that id", code: "E2" });
        recipe.imgSrc = "http://localhost:3443/api/images/recipeImage/" + recipe._id
        return res.status(200).send(recipe)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for Document", code: "E3", error: err });
    });
});

/**
 * Returns all Recipes in the DB, only with the title, id, categories, tags and processingTime
 */
router.get("/allRecipes", authorization, async (req, res) => {
    const query = Recipe.find({}, { title: 1, _id: 1, category: 1, tags: 1, processingTime: 1 })
    await query.lean().then(function (recipes) {
        if (!recipes) return res.status(404).send({ message: "No Recipes in the DB", code: "E1" });
        recipes.forEach(recipe => {
            recipe.imgSrc = "http://localhost:3443/api/images/recipeImage/" + recipe._id
        });
        return res.status(200).send(recipes)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for Recipes", code: "E2", error: err });
    });
});

/**
 * Deletes a Recipe with the given ID
 */
router.delete("/recipe/:id", authorization, async (req, res) => {
    // Validate given Object ID
    if (!ObjectId.isValid(req.params.id)) return res.status(404).send({ message: `${req.params.id} isnt a valid ObjectID`, code: "E1" });

    const query = Recipe.deleteOne({ "_id": req.params.id })
    await query.exec().then(function (result) {
        if (result.deletedCount < 1) return res.status(404).send({ message: "Recipe not found, nothing deleted", code: "E1" });
        return res.status(200).send("Recipe succesfully deleted")
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while deleting Recipe", code: "E2", error: err });
    });
});

module.exports = router