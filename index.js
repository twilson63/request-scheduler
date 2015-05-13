var CronJob = require('cron').CronJob
var request = require('request')

module.exports = function (ee) {
	// add scheduled task
	ee.on('request-scheduler-create', function (event) {
		// validate object
		// add to schedule
	  new CronJob(event.object.cron, 
		  sendRequest(event.object.request), 
			function () { console.log('done') }, true)
		
	})

  // execute task
	function sendRequest(obj) {
		return function() {
			request(obj.url, {
				method: obj.method,
				body: obj.body,
				headers: {
					'Content-Type': obj.mimeType
				}
			}, function (e, r, b) {
				ee.emit('request-scheduler-response', {
					model: 'request-scheduler',
					verb: 'response',
					object: b 
				})			
			})		
		}
	}
}

