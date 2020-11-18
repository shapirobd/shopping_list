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
	res.json({
		added: {
			name: newItem.name,
			price: newItem.price,
		},
	});
});

// router.get("/:name", (req, res, next) => {});
// router.patch("/:name", (req, res, next) => {});
// router.delete("/:name", (req, res, next) => {});

module.exports = router;
