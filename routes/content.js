var c = require('../controllers/');
var m = require('../messages/');
var debug = require('../util/debug');

module.exports = {

	addContentRoutes : function(app) {

		app.get('/', function (req, res) {
		  c.initControllers(m.routedinfo.init({
		  		data:{},
		  		extensions:[c.login],
		  		req:req,
		  		res:res,
		  		handler:function(routedinfo) {
		  			res.render('pg_index',routedinfo.data);
		  			}
		  	}));
    });
    
    app.get('/emit', function(req, res) {
      c.initControllers(m.routedinfo.init({
        data:{},
        extensions:[c.login],
        controller:c.emit,
        action:c.emit.init_pages,
        req: req,
        res:res,
        handler: function(routedinfo){
          debug.log('emitting event');
          res.sendStatus(200);
        }
      }));
    });

	}

}
