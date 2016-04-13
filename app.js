var app = require("./app/config");
app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function() {
  console.log('Running server on port ' + server.address().port);
});
