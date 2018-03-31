var request = require("request");
var routes = require("../../app/routes/notes");
var config = require("../../app/config");
var app = require("../../app");
var base_url = "http://localhost:5000/api/"
var _ = require("lodash");

describe("Notes", function() {
  describe("GET /", function() {
    it("returns a status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.headers['content-type'])
               .toBe("application/json; charset=utf-8");
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns with the correct body", function(done) {
      request.get(base_url, function(error, response, body) {
        body = JSON.parse(body);
        expect(body.message).toBe("Welcome to the Note API!");
        done();
      });
    });
  });

//   describe("GET /notes", function() {
//     var url = base_url + "/notes";
//     it("returns a status code 200", function(done) {
//       request.get(url, function(error, response, body) {

//         expect(response.headers['content-type'])
//                .toBe("application/json; charset=utf-8");
//         expect(response.statusCode).toBe(200);

//         done();
//       });
//     });

//     it("contains note attributes", function(done) {
//       request.get(url, function(error, response, body) {
//         var note = _.first(JSON.parse(body));

//         expect(note._id).toBeDefined();;
//         expect(note.body).toBeDefined();

//         done();
//       });
//     });
//   });
});
