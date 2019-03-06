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
		const data = JSON.parse(e.data);

		let content;

		// Some messages are just strings and strings error with JSON.parse so we do both. :D
		try {
			content = JSON.parse(data.Message);
		} catch (e) {
			content = data.Message;
		}

		const payload = {
			content,
			Identifier: data.Identifier,
			Type: data.Type,
			Stacktrace: data.Stacktrace
		}

		this.client.emit('message', payload);
	}

	sendMessage(message, name, identifier) {
		this.ws.send(JSON.stringify({
			Identifier: identifier,
			Message: message,
			Name: name
		}));
	}

	close() {
		if (!this.ws) return;
		this.ws.close();
		this.ws = undefined;
	}
}