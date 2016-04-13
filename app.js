var app = require("./app/config");
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Running server on port ' + server.address().port);
});
