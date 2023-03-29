const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    registrationDate: { type: Date, default: Date.now() },
    profilePicture: {
        data: Buffer,
        contentType: String,
    },
    password: { type: String, required: true, minlength: 6, maxlength: 1024 },
    categories: { type: Array, default: [{ name: "Hauptmahlzeit", color: '#d16644' }, { name: "Dessert", color: '#468468' }, { name: "Coktail", color: '#99c9ff' }] },
    tags: { type: [String], default: ['vegan', 'vegetarisch', 'alkoholisch', 'hünchen', 'schwein', 'rind'] },
    weekPlanner: {
        type: [{
            recipeID: { type: mongoose.ObjectId, required: true },
            date: { type: Date, required: true }
        }], required: true, _id: false
    },
    shoppingList: {
        type: [{
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            unit: { type: String, required: true },
        }], required: true, _id: false
    },
});

const User = mongoose.model("user", userSchema)
module.exports = User
