const mongoose = require('mongoose');

const fs = require("fs")
const path = require('path');

/**
 * Mongoose schema defining the structure of the "recipe" collection in the database.
 * @typedef {Object} RecipeSchema
 */
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    source: { type: String, default: "Eigenes Rezept" },
    images: {
        type: { data: Buffer, contentType: String }, default: {
            data: fs.readFileSync(path.join(__dirname, "..", "assets", "defaultRecipe.png")),
            contentType: "image/png"
        }, _id: false
    },
    registrationDate: { type: Date, default: Date.now() },
    lastModified: { type: Date, default: Date.now() },
    cookingTime: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    steps: {
        type: [{
            title: { type: String, required: true },
            number: { type: Number, required: true },
            description: { type: String, required: true },
        }], required: true, _id: false
    },
    ingredients: {
        type: [{
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            unit: { type: String, required: true },
        }], required: true, _id: false
    },
    portions: { type: Number, required: true, default: 1 },
    userID: { type: mongoose.ObjectId, required: true }
});

/**
 * Mongoose model for the "recipe" collection using the defined recipeSchema.
 * @typedef {Object} RecipeModel
 */
const Recipe = mongoose.model("recipe", recipeSchema)

module.exports = { Recipe }
