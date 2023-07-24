const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
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
    password: { type: String, required: true, minlength: 6, maxlength: 1024 },
    categories: { type: Array, default: ["Hauptmahlzeit","Nachtisch","Cocktail"] },
    tags: { type: [String], default: ['vegan', 'vegetarisch', 'alkoholisch', 'Hühnchen', 'Schwein', 'Rind'] },
    weekPlan: {
        type: [{
            title: { type: String, required: true },
            color: { type: String, required: true },
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

userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }

const User = mongoose.model("user", userSchema)
module.exports = User
