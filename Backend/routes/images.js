const router = require('express').Router();
const multer = require("multer");
const { Recipe } = require("../models/recipeSchema")

const upload = multer({ storage: multer.memoryStorage() });


router.put("/addRecipeImage", [upload.single("image")], async (req, res) => {
    const recipeID = req.body.recipeID
    if (!recipeID) return res.status(400).send({ message: "No information send", code: "E1" })

    if (req.file.size > 2000000 || req.file.mimetype.slice(0, 5) != "image") return res.status(400).send({ message: "Only images with file size < 2mb", code: "E1" })

    const img = {
        data: req.file.buffer,
        contentType: req.file.mimetype
    }
    const query = Recipe.updateOne({ _id: recipeID }, { images: img })
    await query.exec().then(function (result) {
        if (!result) return res.status(404).send({ message: "No Recipes found", code: "E2" });
        return res.status(200).send(result)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while updating document", code: "E3", error: err });
    });
})

router.get("/recipeImage/:id", async (req, res) => {
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