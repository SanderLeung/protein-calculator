const express = require("express");
const cors = require("cors");
const GroceryRoutes = require("./routes/groceryRoute");

const app = express();

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json());
app.use(cors());

/* Telling the server to use the routes in the GroceryRoutes file. */
app.use(GroceryRoutes);

module.exports = app;