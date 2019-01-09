# RustRCON
Rust RCON client for NodeJS

!!NOT YET PUBLISHED TO NPM!!

`npm install rustrcon`
or
`yarn add rustrcon`

Usage
-----
```js
const { Client } = require('rustrcon');

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
```

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
## Credits
Kye [github](https://github.com/KyeNormanGill)
## License
MIT