var CronJob = require('cron').CronJob
var request = require('request')

module.exports = function (ee) {
	// add scheduled task
	ee.on('request-scheduler-create', function(event) {
		// validate object
		// add to schedule
	  new CronJob(event.object.cron, sendRequest(event.object.request))
	})

  // execute task
	function sendRequest(obj) {
		return function() {
			request[object.method](object.url, {
				body: object.body,
				headers: {
					'Content-Type': obj.mimeType
				}
			}, function (e, r, b) {
				ee.emit('request-response', {
					model: 'request',
					verb: 'response',
					object: b 
				})			
			})		
		}
	}
}

