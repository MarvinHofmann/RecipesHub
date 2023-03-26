const router = require('express').Router();
const multer = require("multer");
const { Recipe } = require("../models/recipeSchema")
const { User } = require("../models/userSchema")

const upload = multer({ storage: multer.memoryStorage() });

// Authorization Middleware
const authorization = require("../middleware/verifyToken")

router.put("/addRecipeImage", [upload.single("image"), authorization], async (req, res) => {
    const recipeID = req.body.recipeID
    if (!recipeID) return res.status(400).send({ message: "No information send", code: "E1" })

    console.log(req.file);
    const img = {
        data: req.file.buffer,
        contentType: req.file.mimetype
    }
    const query = Recipe.updateOne({ _id: recipeID }, { images: img })
    await query.exec().then(function (result) {
        if (!result) return res.status(404).send({ message: "No Recipes found", code: "E1" });
        return res.status(200).send(result)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating document", code: "E2", error: err });
    });
})

router.put("/addProfilePicture", upload.single("image"), authorization , async (req, res) => {
    const img = {
        data: req.file.buffer,
        contentType: req.file.mimetype
    }
    const query = User.updateOne({ _id: req.userID }, { profilePicture: img })
    await query.exec().then(function (result) {
        return res.status(200).send(result)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating document", code: "E2", error: err });
    });
})

router.get("/recipeImage/:id", authorization, async (req, res) => {
    const query = Recipe.findOne({ _id: req.params.id }, { images: 1, _id: 0 })
    await query.exec().then(function (result) {
        if (!result) return res.status(404).send({ message: "No Recipes found", code: "E1" });
        res.header('Content-Type', result.images.contentType);
        return res.status(200).send(result.images.data)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while fetching Image", code: "E2", error: err });
    });
})
module.exports = router