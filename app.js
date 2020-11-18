const express = require("express");
const shoppingRoutes = require("./routes/shoppingRoutes");
const ShopError = require("./shopError");
const app = express();

app.use(express.json());
app.use("/items", shoppingRoutes);

app.use((req, res, next) => {
	return new ShopError("Not Found", 404);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	return res.json({
		error: err.message,
	});
});

module.exports = app;
