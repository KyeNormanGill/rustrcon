const WS = require('ws');

module.exports = class WebSocket {
	constructor(client, options = {}) {
		if (!options.ip) throw new Error('No ip defined in websocket');
		if (!options.port) throw new Error('No port defined in websocket');
		if (!options.password) throw new Error('No password defined in websocket');

		this.ws;
		this.client = client;
		this.ip = options.ip;
		this.port = options.port;
		this.password = options.password;
	}

	connect() {
		this.ws = new WS(`ws://${this.ip}:${this.port}/${this.password}`);
		this.ws.onopen = this.onOpen.bind(this);
		this.ws.onerror = this.onError.bind(this);
		this.ws.onclose = this.onClose.bind(this);
		this.ws.onmessage = this.onMessage.bind(this);
	}

	onOpen(e) {
		this.client.emit('connected', e);
	}

	onError(err) {
		this.client.emit('error', err);
	}

	onClose(e) {
		this.client.emit('disconnect', e);
	}

	onMessage(e) {
		// Parse and emit.
		this.client.emit('message', e);
	}
}