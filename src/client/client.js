const EventEmitter = require('events');
const WebSocket = require('./websocket/ws.js');

module.exports = class Client extends EventEmitter {
	constructor	(options = {}) {
		this.ws = new WebSocket(this, options);
	}

	login() {
		this.ws.connect();
	}

	destroy() {
		this.ws.close(); 
	}
}