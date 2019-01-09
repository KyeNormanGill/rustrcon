const EventEmitter = require('events');
const WebSocket = require('./websocket/ws.js');

module.exports = class Client extends EventEmitter {
	constructor	(options = {}) {
		super();
		this.ws = new WebSocket(this, options);
	}

	login() {
		this.ws.connect();
	}

	destroy() {
		this.ws.close(); 
	}

	send(message, name, identifier) {
		this.ws.sendMessage(message, name, identifier);
	}
}