const router = require('express').Router();
const User = require('../models/userSchema')

router.get("/list", async (req, res) => {
    const query = User.findOne({ _id: req.user }, { _id: 0, shoppingList: 1 })
    await query.exec().then(function (sList) {
        if (!sList) return res.status(400).send({ message: "No shopping list for that user", code: "E1" });
        return res.status(200).send(sList)
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while searching for shoppingList", code: "E2", error: err });
    });
});

router.put("/addElement", async (req, res) => {
    const { name, amount, unit } = req.body
    if (!name || !amount || !unit) return res.status(400).send({ message: "No information send", code: "E1" })

    // Check if If Element with that name already exists:
    const listElement = await User.findOne({ _id: req.user, "shoppingList.name": name, "shoppingList.unit": unit}, { _id: 0, shoppingList: {$elemMatch: {name: name, unit:unit}}}).exec()
    // Increase amount if exists
    if (listElement != null) {
        const query = User.updateOne({ _id: req.user, shoppingList: { $elemMatch: {name: name, unit: unit}}}, {$inc: {"shoppingList.$.amount": amount}})
        await query.exec().then(async function (updatedElement) {
            const query = User.findOne({ _id: req.user }, { _id: 0, shoppingList: 1 })
            await query.exec().then(function (sList) {
                return res.status(200).send(sList)
            })
        }).catch(function (err) {
            console.log(err);
            return res.status(500).send({ message: "Error while updating shoppingList", code: "E2", error: err });
        });
    }
    // Add new element if not exists
    else{
        const query = User.updateOne({ _id: req.user }, { $addToSet: { shoppingList: { name: name, amount: amount, unit: unit } } })
        await query.exec().then(async function (updatedElement) {
            const query = User.findOne({ _id: req.user }, { _id: 0, shoppingList: 1 })
            await query.exec().then(function (sList) {
                return res.status(200).send(sList)
            })
        }).catch(function (err) {
            return res.status(500).send({ message: "Error while updating shoppingList", code: "E2", error: err });
        });
    }

});

router.delete("/deleteElement/:name/:unit", async (req, res) => {
    const name = req.params.name;
    const unit = req.params.unit;
    if (!name || !unit) return res.status(400).send({ message: "No information send", code: "E1" });

    const query = User.updateOne({ "_id": req.user, }, { $pull: { 'shoppingList': { "name": name, "unit": unit } } })
    await query.exec().then(async function (result) {
        if (result.deletedCount < 1) return res.status(404).send({ message: "Element not found, nothing deleted", code: "E2" });
        const query = User.findOne({ _id: req.user }, { _id: 0, shoppingList: 1 })
        await query.exec().then(function (sList) {
            return res.status(200).send(sList)
        })
    }).catch(function (err) {
        return res.status(500).send({ message: "Error while deleting Element", code: "E3", error: err });
    });
})


module.exports = router