const router = require('express').Router();
const User = require('../models/userSchema')

/* Returns the tags of the user, requested it */
router.get("/tags", async (req, res) => {
    const query = User.findOne({ _id: req.user }, { _id: 0, tags: 1 })
    await query.exec().then(function (tags) {
        if (!tags) return res.status(400).send({ message: "No tags for that user", code: "E1" });
        return res.status(200).send(tags)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for tags", code: "E2", error: err });
    });
});

/* Returns the categories of the user, requested it */
router.get("/categories", async (req, res) => {
    const query = User.findOne({ _id: req.user }, { _id: 0, categories: 1 })
    await query.exec().then(function (categories) {
        if (!categories) return res.status(400).send({ message: "No categories for that user", code: "E1" });
        return res.status(200).send(categories)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for categories", code: "E2", error: err });
    });
});

/* Endpoint to create a new tag in the users document */
router.put("/newTag",  async (req, res) => {
    const tagName = req.body.tag;
    if (!tagName) return res.status(400).send({ message: "No information send", code: "E1" })

    const query = User.updateOne({ _id: req.user }, { $addToSet: { tags: tagName } })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send({ modifiedElements: updatedElement.modifiedCount })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating tags", code: "E2", error: err });
    });
})

/* Endpoint to delete a tag in the users document */
router.delete("/deleteTag/:name",  async (req, res) => {
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

/* Endpoint to create a new category in the users document */
router.put("/newCategory",  async (req, res) => {
    const { name, color } = req.body;
    if (!name || !color) return res.status(400).send({ message: "No information send", code: "E1" })

    const query = User.updateOne({ _id: req.user }, { $addToSet: { categories: { name: name, color: color } } })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send({ modifiedElements: updatedElement.modifiedCount })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating categories", code: "E2", error: err });
    });
})


/* Endpoint to delete a category in the users document */
router.delete("/deleteCategory/:name",  async (req, res) => {
    const name = req.params.name;
    if (!name) return res.status(400).send({ message: "No information send", code: "E1" });

    const query = User.updateOne({ "_id": req.user, }, { $pull: { 'categories': {name: name} } })
    await query.exec().then(async function (result) {
        if (result.deletedCount < 1) return res.status(404).send({ message: "Category not found, nothing deleted", code: "E2" });
        const query = User.findOne({ _id: req.user }, { _id: 0, categories: 1 })
        await query.exec().then(function (catList) {
            return res.status(200).send(catList)
        })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while deleting Category", code: "E3", error: err });
    });
})

/* A router that is used to update the username of the user. */
router.put("/change/username",  async (req, res) => {
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


/* Updating the first name of the user. */
router.put("/change/firstName",  async (req, res) => {
    const { firstName } = req.body;
    if (!firstName) return res.status(400).send({ message: "No information send", code: "E1" })

    const query = User.updateOne({ _id: req.user }, { firstName: firstName })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send({ modifiedElements: updatedElement.modifiedCount })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating first name", code: "E2", error: err });
    });
})


/* A router that is used to update the last name of the user. */
router.put("/change/lastName",  async (req, res) => {
    const { lastName } = req.body;
    if (!lastName) return res.status(400).send({ message: "No information send", code: "E1" })

    const query = User.updateOne({ _id: req.user }, { lastName: lastName })
    await query.exec().then(function (updatedElement) {
        return res.status(200).send({ modifiedElements: updatedElement.modifiedCount })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating last name", code: "E2", error: err });
    });
})


/* A router that is used to update the email of the user. */
router.put("/change/email",  async (req, res) => {
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