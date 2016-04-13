var request = require("request");
var routes = require("../../app/routes/notes");
var note = require("../../app/models/note");
var config = require("../../app/config");
var app = require("../../app");
var base_url = "http://localhost:3000/api/"

describe("Notes", function() {
  describe("GET /", function() {
    it("returns a status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(500);
      });
    });

    it("returns with the correct body", function() {
      request.get(base_url, function(error, response, body) {
        expect(body.message).toBe("Welco to the node API!");
      });
    });
  });
});
