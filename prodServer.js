var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || port));

//For avoidong Heroku $PORT error
app.get('/dist', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
