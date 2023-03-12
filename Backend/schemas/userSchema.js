const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    registrationDate: { type: Date, default: Date.now },
    profilePicture: {
        data: Buffer,
        contentType: String,
    },
    password: { type: String, required: true },
    kategories: Array,
    tags: Array
});
module.exports = userSchema;