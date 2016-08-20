var path = require('path');
var express = require('express');

var app = express();
var port = 5000;
var staticPath = path.join(__dirname, '/dist');
app.use(express.static(staticPath));

app.listen(port, function() {
  console.log('Started production server\n Serving',staticPath,'on port',port);
  console.log('listening...');
});
