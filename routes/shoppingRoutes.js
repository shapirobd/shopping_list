const express = require("express");
const router = new express.Router();
const ShopError = require("../shopError");
const items = require("../fakeDb");

// this should render a list of shopping items.
router.get("/", function (req, res) {
	res.json(items);
});

// this route should accept JSON data and add it to the shopping list.
router.post("/", (req, res, next) => {
	const newItem = req.body;
	items.push(newItem);
	res.json({ added: req.body });
});

// this route should display a single item’s name and price.
router.get("/:name", (req, res, next) => {
	const foundItem = items.find((item) => item.name === req.params.name);
	res.json(foundItem);
});

// this route should modify a single item’s name and/or price.
router.patch("/:name", (req, res, next) => {
	const foundItem = items.find((item) => item.name === req.params.name);
	foundItem.name = req.body.name;
	foundItem.price = req.body.price;
	res.json({ updated: foundItem });
});

// this route should allow you to delete a specific item from the array.
router.delete("/:name", (req, res, next) => {
	const foundItem = items.find((item) => item.name === req.params.name);
	items.splice(foundItem, 1);
	res.json({ message: "Deleted" });
});

module.exports = router;
