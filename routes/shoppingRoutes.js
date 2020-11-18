const express = require("express");
const router = new express.Router();
const ShopError = require("../shopError");
const items = require("../fakeDb");

// this should render a list of shopping items.
router.get("/", function (req, res) {
	res.json(items);
});
// router.post("/", (req, res, next) => {});
// router.get("/:name", (req, res, next) => {});
// router.patch("/:name", (req, res, next) => {});
// router.delete("/:name", (req, res, next) => {});

module.exports = router;
