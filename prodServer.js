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

var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || port));
var staticPath = path.join(__dirname, '/dist');
app.use(express.static(staticPath));

//For avoidong Heroku $PORT error
app.get('/dist', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
