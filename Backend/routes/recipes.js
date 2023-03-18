const router = require('express').Router();
const authorization = require("./verifyToken")

router.get("/randomRecipes", authorization, (req, res) => {
    res.status(200).send("Random")
});

module.exports = router