const router = require('express').Router();
const { Recipe } = require("../models/recipeSchema")
const ObjectId = require('mongoose').Types.ObjectId;

const BASEURL = process.env.IMAGES_URL

/**
 * Endpoint to create a Recipe
 */
router.post("/addRecipe", async (req, res) => {
    if (!req.body) return res.status(400).send({ message: "No information send", code: "E1" })
    // Create final recipe
    await Recipe.create({
        title: req.body.title,
        description: req.body.description,
        source: req.body.source,
        cookingTime: req.body.cookingTime,
        category: req.body.category,
        tags: req.body.tags,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        portions: req.body.portions,
        userID: req.user
    }).then(function (recipe) {
        return res.status(201).send({ message: "Recipe Created", id: recipe._id })
    }).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error while creating Recipe", code: "E2", error: err })
    })
})


router.post("/updateRecipe", async (req, res) => {
    if (!req.body.recipeData) return res.status(400).send({ message: "No information send", code: "E1" })
    // Create final recipe
    req.body.recipeData.lastModified = Date.now()
    await Recipe.updateOne({ _id: req.body.recipeData._id }, req.body.recipeData).then(function (recipe) {
        return res.status(201).send({ message: "Recipe Updated", id: req.body.recipeData._id })
    }).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error while editing Recipe", code: "E2", error: err })
    })
})


/**
 * Returns four random recipes useing the sample method of mongodb
 */
router.get("/randomRecipes", async (req, res) => {
    const query = Recipe.aggregate([{ $match: { userID: new ObjectId(req.user) } }, { $sample: { size: 4 } }])
    await query.exec().then(function (randomRecipes) {
        if (!randomRecipes) return res.status(404).send({ message: "No Recipes found", code: "E1" });
        randomRecipes.forEach(recipe => {
            recipe.imgSrc = BASEURL + recipe._id
        });
        return res.status(200).send(randomRecipes)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for random Document", code: "E2", error: err });
    });
});

/**
 * Returns the complete documnent of the recipe with the given id
 */
router.get("/recipe/:id", async (req, res) => {
    // Validate given Object ID
    if (!ObjectId.isValid(req.params.id)) return res.status(404).send({ message: `${req.params.id} isnt a valid ObjectID`, code: "E1" });
    const query = Recipe.findOne({ "_id": req.params.id, userID: req.user }, { images: 0 })
    await query.lean().then(function (recipe) {
        if (!recipe) return res.status(404).send({ message: "No Recipe with that id", code: "E2" });
        recipe.imgSrc = BASEURL + recipe._id
        return res.status(200).send(recipe)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for Document", code: "E3", error: err });
    });
});

/**
 * Returns all Recipes in the DB, only with the title, id, categories, tags and cookingTime
 */
router.get("/allRecipes", async (req, res) => {
    const query = Recipe.find({ userID: req.user }, { title: 1, _id: 1, category: 1, tags: 1, cookingTime: 1 })
    await query.lean().then(function (recipes) {
        if (!recipes) return res.status(404).send({ message: "No Recipes in the DB", code: "E1" });
        recipes.forEach(recipe => {
            recipe.imgSrc = BASEURL + recipe._id
        });
        return res.status(200).send(recipes)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for Recipes", code: "E2", error: err });
    });
});

/**
 * Deletes a Recipe with the given ID
 */
router.delete("/recipe/:id", async (req, res) => {
    // Validate given Object ID
    if (!ObjectId.isValid(req.params.id)) return res.status(404).send({ message: `${req.params.id} isnt a valid ObjectID`, code: "E1" });

    const query = Recipe.deleteOne({ "_id": req.params.id, userID: req.user })
    await query.exec().then(function (result) {
        if (result.deletedCount < 1) return res.status(404).send({ message: "Recipe not found, nothing deleted", code: "E1" });
        return res.status(200).send("Recipe succesfully deleted")
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while deleting Recipe", code: "E2", error: err });
    });
});

module.exports = router