const express = require("express");

const {
    createGrocery,
    getGroceries,
    getGrocery,
    updateGrocery,
    deleteGrocery
} = require("../controllers/groceryController");

const router = express.Router();

/* Creating the routes for the Grocery controller. */
router.get("/groceries", getGroceries);

router.get("/groceries/:id", getGrocery);

router.post("/grocery", createGrocery);

router.put("/groceries/:id", updateGrocery);

router.delete("/groceries/:id", deleteGrocery);

module.exports = router;