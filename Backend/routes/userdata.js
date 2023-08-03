const router = require('express').Router();
const User = require('../models/userSchema')

/**
 * GET endpoint to retrieve the tags of the authenticated user.
 * @function
 * @name GET/tags
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - An array containing the tags of the user.
 */
router.get("/tags", async (req, res) => {
    const query = User.findOne({ _id: req.user }, { _id: 0, tags: 1 })
    await query.exec().then(function (tags) {
        if (!tags) return res.status(400).send({ message: "No tags for that user", code: "E1" });
        return res.status(200).send(tags)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for tags", code: "E2", error: err });
    });
});


/**
 * GET endpoint to retrieve the categories of the authenticated user.
 * @function
 * @name GET/categories
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - An array containing the categories of the user.
 */
router.get("/categories", async (req, res) => {
    const query = User.findOne({ _id: req.user }, { _id: 0, categories: 1 })
    await query.exec().then(function (categories) {
        if (!categories) return res.status(400).send({ message: "No categories for that user", code: "E1" });
        return res.status(200).send(categories)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for categories", code: "E2", error: err });
    });
});


/**
 * PUT endpoint to create a new tag in the user's document.
 * @function
 * @name PUT/newTag
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success status and the count of modified elements.
 */
router.put("/newTag", async (req, res) => {
    const tagName = req.body.tag;
    if (!tagName) return res.status(400).send({ message: "No information send", code: "E1" })

    const query = User.updateOne({ _id: req.user }, { $addToSet: { tags: tagName } })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send({ modifiedElements: updatedElement.modifiedCount })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating tags", code: "E2", error: err });
    });
})


/**
 * DELETE endpoint to delete a tag, given in the url, from the user's document.
 * @function
 * @name DELETE/deleteTag/:name
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success status and the updated tag list.
 */
router.delete("/deleteTag/:name", async (req, res) => {
    const name = req.params.name;
    if (!name) return res.status(400).send({ message: "No information send", code: "E1" });

    const query = User.updateOne({ "_id": req.user, }, { $pull: { 'tags': name } })
    await query.exec().then(async function (result) {
        if (result.deletedCount < 1) return res.status(404).send({ message: "Tag not found, nothing deleted", code: "E2" });
        const query = User.findOne({ _id: req.user }, { _id: 0, tags: 1 })
        await query.exec().then(function (tagList) {
            return res.status(200).send(tagList)
        })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while deleting Tag", code: "E3", error: err });
    });
})


/**
 * PUT endpoint to create a new category in the user's document.
 * @function
 * @name PUT/newCategory
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success status and the count of modified elements.
 */
router.put("/newCategory", async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).send({ message: "No information send", code: "E1" })

    const query = User.updateOne({ _id: req.user }, { $addToSet: { categories: name } })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send({ modifiedElements: updatedElement.modifiedCount })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating categories", code: "E2", error: err });
    });
})


/**
 * DELETE endpoint to delete a category from the user's document.
 * @function
 * @name DELETE/deleteCategory/:name
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success status and the updated category list.
 */
router.delete("/deleteCategory/:name", async (req, res) => {
    const name = req.params.name;
    if (!name) return res.status(400).send({ message: "No information send", code: "E1" });

    const query = User.updateOne({ "_id": req.user, }, { $pull: { 'categories': name } })
    await query.exec().then(async function (result) {
        if (result.modifiedCount < 1) return res.status(404).send({ message: "Category not found, nothing deleted", code: "E2" });
        const query = User.findOne({ _id: req.user }, { _id: 0, categories: 1 })
        await query.exec().then(function (catList) {
            return res.status(200).send(catList)
        })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while deleting Category", code: "E3", error: err });
    });
})


/**
 * PUT endpoint to update the username of the user.
 * @function
 * @name PUT/change/username
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success status and the count of modified elements.
 */
router.put("/change/username", async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).send({ message: "No information send", code: "E1" })

    //Check if username is already taken
    const user = await User.findOne({ username: username }, { username: 1, _id: 1 }).exec()
    if (user && user._id != req.user) return res.status(400).send({ message: "Username already exists", code: "E2" })

    //Update username
    const query = User.updateOne({ _id: req.user }, { username: username })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send({ modifiedElements: updatedElement.modifiedCount })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating username", code: "E3", error: err });
    });
})


/**
 * PUT endpoint to update the first name of the user.
 * @function
 * @name PUT/change/firstName
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success status and the count of modified elements.
 */
router.put("/change/firstName", async (req, res) => {
    const { firstName } = req.body;
    if (!firstName) return res.status(400).send({ message: "No information send", code: "E1" })

    const query = User.updateOne({ _id: req.user }, { firstName: firstName })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send({ modifiedElements: updatedElement.modifiedCount })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating first name", code: "E2", error: err });
    });
})


/**
 * PUT endpoint to update the last name of the user.
 * @function
 * @name PUT/change/lastName
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success status and the count of modified elements.
 */
router.put("/change/lastName", async (req, res) => {
    const { lastName } = req.body;
    if (!lastName) return res.status(400).send({ message: "No information send", code: "E1" })

    const query = User.updateOne({ _id: req.user }, { lastName: lastName })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send({ modifiedElements: updatedElement.modifiedCount })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating last name", code: "E2", error: err });
    });
})


/**
 * PUT endpoint to update the email of the user.
 * @function
 * @name PUT/change/email
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success status and the count of modified elements.
 */
router.put("/change/email", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send({ message: "No information send", code: "E1" })

    const query = User.updateOne({ _id: req.user }, { email: email })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send({ modifiedElements: updatedElement.modifiedCount })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating email", code: "E2", error: err });
    });
})

module.exports = router