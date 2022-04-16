require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/routes.js");

// Initializing express
const app = express();

// Middleware configuration
app.set("x-powered-by", false);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(router);

// Getting port from env and starting server.
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));