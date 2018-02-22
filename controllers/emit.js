var _ = require('underscore');
var jsforce = require('jsforce');
var debug = require('../util/debug');

module.exports = {
  init : function (routedinfo) { },

  init_pages : function (routedinfo) {
    routedinfo.conn = new jsforce.Connection({
      accessToken: routedinfo.req.session.accessToken,
      instanceUrl: routedinfo.req.session.instanceUrl,
      version: '41.0'
    });
    
    var eventData = {
      deviceId__c: 'CUCGRITU3RVWKUL8',
      temperature__c: parseFloat(routedinfo.req.query.temp)
    }

    routedinfo.conn.sobject("Smart_Thermostat_Reading__e").create(eventData, function (err, ret) {
      if (err || !ret.success) { return console.error(err, ret); }
      debug.log("Created record id : " + ret.id);
    });

  }
}