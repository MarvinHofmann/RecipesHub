const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    source: { type: String, default: "Eigenes Rezept" },
    images: { data: Buffer, contentType: String, },
    registrationDate: { type: Date, default: Date.now() },
    lastModified: { type: Date, default: Date.now() },
    processingTime: { type: Number, required: true },
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
            unit: { type: String, required: true, default: "gramm" },
        }], required: true, _id: false
    },
    portions: { type: Number, required: true, default: 1 },
    userID: { type: mongoose.ObjectId, required: true}
});

const Recipe = mongoose.model("recipe", recipeSchema)

module.exports = { Recipe }
