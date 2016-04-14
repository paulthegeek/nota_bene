(function() {
  require("dotenv").config();
  var express = require("express");
  var app = express();
  var parser = require("body-parser");
  var notes = require("./routes/notes");

  app.use(parser.urlencoded({ extended: true }));
  app.use(parser.json());
  app.use("/api", notes);

  var mongoose = require("mongoose");
  mongoose.connect(process.env.DB_URL);

  module.exports = app;
})();
