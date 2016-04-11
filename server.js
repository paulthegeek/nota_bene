var express = require("express");
var app = express();
var parser = require("body-parser");

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

var port = process.env.PORT || 3000;

var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://lois:Jedimaster24@jello.modulusmongo.net:27017/idamE8hy"
);

var Note = require("./app/models/note");


var router = express.Router();


router.get("/", function(request, response) {
  response.json({ message: "Yay! API" });
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
    console.log(JSON.stringify(request.query));
    Note.find(function(err, notes) {
      if(err) {
        response.send(err);
      }
      response.json(notes);
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

app.use("/api", router);

app.listen(port);
console.log("Magic happens on port " + port);
