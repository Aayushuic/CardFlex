const mongoose = require("mongoose");
require('dotenv').config()

const url = process.env.DATABASEURL;

async function database() {
  await mongoose.connect(url);
}

module.exports = database;
