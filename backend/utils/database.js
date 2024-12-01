const mongoose = require("mongoose");
require('dotenv').config()

async function database() {
  const url = process.env.NODE_ENV === "production" ? process.env.DATABASEURL : process.env.LOCALENVDBURL
  await mongoose.connect(url);
}

module.exports = database;
