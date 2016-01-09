'use strict';

var express = require('express');
var app = express();
var route = require('./app/route/index.js');

var port  = process.env.PORT || 8080;
app.use('/public', express.static(process.cwd()+'/public'));

route(app);
app.listen(port, function()){
  console.log('Node.js listening on port ' + port);
}
