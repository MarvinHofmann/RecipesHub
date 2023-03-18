const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
    title: { type: String, required: true },
    number: { type: Number, required: true },
    description: { type: String, required: true },
});

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    unit: { type: String, required: true, default: "gramm" },
});

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    source: {type: String, default: "Eigenes Rezept"},
    images: { data: Buffer, contentType: String, },
    registrationDate: { type: Date, default: Date.now() },
    lastModified: { type: Date, default: Date.now() },
    processingTime: { type: Number, required: true },
    category: { type: String, required: true},
    tags: { type: [String] },
    steps: { type: [stepSchema], required: true},
    ingredients: { type: [ingredientSchema], required: true}
});

const Recipe = mongoose.model("recipe", recipeSchema)
module.exports = Recipe
