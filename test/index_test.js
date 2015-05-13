var test = require('tap').test
var EventEmitter = require('events').EventEmitter
var ee = new EventEmitter()
var reqScheduler = require('../')(ee)

test('schedule task', function (t) {
  ee.emit('request-scheduler-create', {
		model: 'request-scheduler',
		verb: 'create',
		object: {
			cron: '00 1 6 * * *',
			request: {
				url: 'http://echo-json.herokuapp.com',
				method: 'POST',
				body: {
					model: 'oscar',
					verb: 'compact',
					object: {
						dbUrl: 'http://localhost:5984/cloudq',
						attr: 'expires_in'
					}
				}
			}
		}
	})	
})