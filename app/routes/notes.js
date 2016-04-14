(function() {
  var Note = require("../models/note");
  var express = require("express");
  var app = express();
  var router = express.Router();
  var _ = require("lodash");

  setupCORS();
  getAPI();
  getNotes();
  getNote();
  createNote();
  updateNote();
  deleteNote();

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

  function getAPI() {
    router.get("/", function(request, response) {
      response.json({ message: "Welcome to the Note API!" });
    });
  }

  function getNotes() {
    router.route("/notes")
      .get(function(request, response) {
        Note.find(function(error, notes) {
          if(error) {
            response.send(error);
          }
          if(noQuery(request.query)) {
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
  }

  function getNote() {
    router.route("/notes/:note_id")
      .get(function(request, response) {
        Note.findById(request.params.note_id, function(error, note) {
          if(error || note === null) {
            response.json({ message: "Sorry, we cannot retrive this note" });
          }
          response.json(note);
        });
      });
  }

  function createNote() {
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
      });
  }

  function updateNote() {
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
      });
  }

  function deleteNote() {
    router.route("/notes/:note_id")
      .delete(function(request, response) {
        Note.remove({
          _id: request.params.note_id
        }, function(error, note) {
          if (error) {
            response.json({ message: "Sorry could not delete this note" });
          } else {
            response.json({ message: 'Note Deleted...' });
          }

        });
      });
  }

  function noQuery(query) {
    _.isEmpty(query);
  }

  module.exports = router;
})();
