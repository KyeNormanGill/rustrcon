const { Client } = require('./src/index.js');

const rcon = new Client({
	ip: '192.0.0.1',
	port: '8080',
	password: '123'
});

rcon.login();

rcon.on('connected', () => {
	console.log(`Connected to ${rcon.ws.ip}:${rcon.ws.port}`);
});

rcon.on('error', err => {
	console.error(err);
});

rcon.on('disconnect', () => {
	console.log('Disconnected from RCON websocket');
});

rcon.on('message', message => {
	console.log(message);
});

// Message, Name, Identifier.
rcon.send('echo hello world', 'Artful', 10);