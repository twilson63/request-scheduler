# request-scheduler

This service receives a 
- notification of a scheduled request task
- loads it into node-cron

A request task is a simple http request with an optional body.

- url
- method
- body # if method is a PUT/POST/DELETE
- mimeType

The scheduled request document contains a request task as well as a cron schedule and a name:

``` json
{
	"name": "My Schedule Task",
	"description": "Run every night at 11:55pm",
	"cron": "00 55 23 * * *",
	"request": {
		"url": "https://<user>:<pwd>@foo.com/email",
		"method": "POST",
		"body": {
			"greeting": "Hello World"
		},
		"mimeType": "application/json"
	}
}
```

## Usage

To create a scheduled task, you would emit an event to the request scheduler service:

``` js

var EventEmitter = require('events').EventEmitter
var ee = new EventEmitter()
var reqScheduler = require('request-scheduler')(ee)

ee.emit('request-scheduler-create', {
	model: 'request-scheduler',
	verb: 'create',
	object: {
		name: "my task",
		cron: "00 55 23 * * *",
		request: {
			...
		}
	}
})

ee.on('request-scheduler-create-response', function (result) {
	console.log(result.ok)
})

ee.on('request-scheduler-create-error', function (err) {
	console.log(err.description)
})
```

## Support

See Issues

## License

MIT