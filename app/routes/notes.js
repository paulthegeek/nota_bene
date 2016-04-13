(function() {
  var Note = require("../models/note");
  var express = require("express");
  var app = express();
  var router = express.Router();
  var _ = require("lodash");

  setupCORS();

  router.get("/", function(request, response) {
    response.json({ message: "Welcome to the Note API!" });
  });

  router.route("/notes")
  .post(function(request, response) {
    var note = new Note();
    note.body = request.body.body;

    note.save(function(error) {
      if(error) {
        response.send(error);
      }
      response.json({ message: "A saved note..." });
    });
  })

  .get(function(request, response) {
    Note.find(function(error, notes) {
      if(error) {
        response.send(error);
      }
      if(_.isEmpty(request.query)) {
        response.json(notes);
      } else {
        Note.find({ body: new RegExp(
          request.query['q'], 'i') }, function(error, notes) {
            if(error) {
              response.send(error);
            } else {
              response.json(notes);
            }
          });
      }
    });
  });

  router.route("/notes/:note_id")
  .put(function(request, response) {
    Note.findById(request.params.note_id, function(error, note) {
      if(error) {
        response.send(error);
      }
      note.body = request.body.body;

      note.save(function(error) {
        if(error) {
          response.send(error);
        }

        response.json({ message: "Note updated..." });
      });
    });
  })

  .get(function(request, response) {
    Note.findById(request.params.note_id, function(error, note) {
      if(error) {
        response.send(error);
      }
      response.json(note);
    });
  });

  function setupCORS() {
    router.use(function(request, response, next) {
      response.header("Access-Control-Allow-Origin", "*");
      response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
  }

  module.exports = router;
})();
