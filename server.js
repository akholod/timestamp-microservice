const express = require("express");
var routes = require("./routes");
const app = express();
const port = process.env.PORT || 8080;

app.use('/', routes);

app.use(function(req, res, next) {
  res.status(404).end('Wrong time parameter');
});

app.listen(port, function () {
  console.log('App listening on port 8080!');
});