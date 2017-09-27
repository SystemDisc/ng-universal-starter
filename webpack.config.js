const ngtools = require('@ngtools/webpack');
const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

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
	serverConfig.plugins.push(new WebpackShellPlugin({onBuildEnd:['npm run server:dev']}));
}

module.exports = [serverConfig, clientConfig];
