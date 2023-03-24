const router = require('express').Router();
const User = require('../models/userSchema')

// Authorization Middleware
const authorization = require("../middleware/verifyToken")

/**
 * Returns the tags of the user, requested it
 */
router.get("/tags", authorization, async (req, res) => {
    const query = User.findOne({ _id: req.userID }, { _id: 0, tags: 1 })
    await query.exec().then(function (tags) {
        if (!tags) return res.status(400).send({ message: "No tags for that user", code: "E1" });
        return res.status(200).send(tags)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for tags", code: "E2", error: err });
    });
});

/**
 * Returns the categories of the user, requested it
 */
router.get("/categories", authorization, async (req, res) => {
    const query = User.findOne({ _id: req.userID }, { _id: 0, categories: 1 })
    await query.exec().then(function (categories) {
        if (!categories) return res.status(400).send({ message: "No categories for that user", code: "E1" });
        return res.status(200).send(categories)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for categories", code: "E2", error: err });
    });
});

/**
 * Endpoint to create a new tag in the users document
 */
router.put("/newTag", authorization, async (req, res) => {
    const tagName = req.body.tag;
    if (!tagName) return res.status(400).send({ message: "No information send", code: "E1" })

    const query = User.updateOne({ _id: req.userID }, { $addToSet: { tags: tagName } })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send({ modifiedElements: updatedElement.modifiedCount })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating tags", code: "E2", error: err });
    });
})

/**
 * Endpoint to create a new category in the users document
 */
router.put("/newCategory", authorization, async (req, res) => {
    const { name, color } = req.body;
    if (!name || !color) return res.status(400).send({ message: "No information send", code: "E1" })

    const query = User.updateOne({ _id: req.userID }, { $addToSet: { categories: { name: name, color: color } } })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send({ modifiedElements: updatedElement.modifiedCount })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating categories", code: "E2", error: err });
    });
})

module.exports = router