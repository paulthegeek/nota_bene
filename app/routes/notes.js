var Note = require("../models/note");
var express = require("express");
var router = express.Router();
var _ = require("lodash");

router.get("/", function(request, response) {
  response.json({ message: "Welcome to the Note API!" });
});

router.route("/notes")
  .post(function(request, response) {
    var note = new Note();
    note.body = request.body.body;

    note.save(function(err) {
      if(err) {
        response.send(err);
      }
      response.json({ message: "A saved note..." });
    });
  })

  .get(function(request, response) {
    Note.find(function(err, notes) {
      if(err) {
        response.send(err);
      }
      if(_.isEmpty(request.query)) {
        response.json(notes);
      } else {
        Note.find({ body: new RegExp(request.query['q'], 'i') }, function(err, notes) {
          if(err) {
            response.send(err);
          } else {
            response.json(notes);
          }
        });
      }
    });
  });

router.route("/notes/:note_id")
  .get(function(request, response) {
    Note.findById(request.params.note_id, function(err, note) {
      if(err) {
        response.send(err);
      }
      response.json(note);
    });
  });

module.exports = router;
