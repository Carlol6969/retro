const express = require('express');
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("retroclassic.db");
const routes = express.Router();








module.exports = routes;