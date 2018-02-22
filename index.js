/*Express*/
//express for routing
var port = process.env.PORT || 8675;
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var path = require('path')
var dust = require('express-dustjs')
var session = require('express-session')

//local utils
var debug = require('./util/debug');

app.use(bodyParser.text({ type: 'text/plain', limit: '50mb' }));

var sessionOptions = {
  secret: "$8&5^DQK@p!V*Rv_",
  resave : true,
  saveUninitialized : false
};

app.use(session(sessionOptions));

app.engine('dust', dust.engine({
  // Use dustjs-helpers
  useHelpers: true
}))
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, './static/views'));
app.use(express.static('./static'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/slds', express.static(__dirname + '/node_modules/@salesforce-ux/design-system/assets'));
//custom routes
var oauth_routes = require('./routes/oauth');
oauth_routes.addOAuthRoutes(app);

var content_routes = require('./routes/content');
content_routes.addContentRoutes(app);


//setup actual server
var server = app.listen(port, function () {

  console.log('IOT Emitter running on '+port);
  if(debug.environment == 'production') {
  	require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    	console.log('addr: '+add);
  	});
   }

});
