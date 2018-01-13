const ngtools = require('@ngtools/webpack');
const path = require('path');

let sharedConfig = function() {
	return {
		resolve: {
			extensions: ['.ts', '.js'],
		},
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: '@ngtools/webpack',
				},
				{
					test: /\.html$/,
					loader: 'raw-loader',
				},
				{
					test: /\.css$/,
					loader: 'raw-loader',
				},
				{
					test: /\.scss$/,
					loaders: ['raw-loader', 'sass-loader'],
				},
			],
		}
	};
};

let serverConfig = Object.assign(sharedConfig(), {
	entry: {
		main: path.resolve(__dirname, 'src/server/main.ts'),
	},
	target: 'node',
	node: {
		__dirname: false,
		__filename: false,
		fs: 'empty',
	},
	output: {
		path: path.resolve(__dirname, 'dist', 'server'),
		filename: '[name].js',
	},
	plugins: [
		new ngtools.AotPlugin({
			tsConfigPath: './tsconfig.json',
			entryModule: path.resolve(__dirname, 'src/server/app.module#AppServerModule'),
		}),
	],
});

let clientConfig = Object.assign(sharedConfig(), {
	entry: {
		main: path.resolve(__dirname, 'src/browser/main.ts'),
	},
	target: 'web',
	node: {
		fs: 'empty',
	},
	output: {
		path: path.resolve(__dirname, 'dist', 'client'),
		filename: '[name].js',
	},
	plugins: [
		new ngtools.AotPlugin({
			tsConfigPath: './tsconfig.json',
			entryModule: path.resolve(__dirname, 'src/browser/app.module#AppModule'),
		}),
	],
});

if (process.env.NODE_ENV === 'development') {
	const { spawn } = require('child_process');
	let server;
	let startServer = () => {
		console.log('starting server');
		server = spawn('npm', ['run', 'server:dev']);
		server.on('exit', () => {
			startServer();
		});
		server.stdout.pipe(process.stdout);
		server.stderr.pipe(process.stderr);
		console.log('sending livereload signal');
		lrServer.refresh('');
	};
	let livereload = require('livereload');
	let lrServer = livereload.createServer();
	serverConfig.plugins.push(function() {
		this.plugin('done', (stats) => {
			console.log('build done');
			if (server) {
				console.log('stopping server');
				server.kill();
			}
			else {
				startServer();
			}
		});
	});
}

module.exports = [serverConfig, clientConfig];
