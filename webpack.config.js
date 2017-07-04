const ngtools = require('@ngtools/webpack');
const path = require('path');

let serverConfig = {
	entry: {
		main: './src/server/main.ts'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	target: 'node',
	node: {
		__dirname: false,
		__filename: false,
	},
	output: {
		path: path.resolve(__dirname, 'dist', 'server'),
		filename: '[name].js'
	},
	devtool: 'source-map',
	plugins: [
		new ngtools.AotPlugin({
			tsConfigPath: './tsconfig.json',
		})
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: '@ngtools/webpack',
			},
			{
				test: /\.html$/,
				loader: "raw-loader"
			}
		]
	}
};

let clientConfig = {
	entry: {
		main: './src/browser/main.ts'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist', 'client'),
		filename: '[name].js'
	},
	devtool: 'source-map',
	plugins: [
		new ngtools.AotPlugin({
			tsConfigPath: './tsconfig.json',
		})
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: '@ngtools/webpack',
			},
			{
				test: /\.html$/,
				loader: "raw-loader"
			}
		]
	}
}

module.exports = [serverConfig, clientConfig];
