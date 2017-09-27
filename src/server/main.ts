import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import 'zone.js/dist/zone-node';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { AppServerModuleNgFactory } from '../aot/src/server/app.module.ngfactory';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';

import * as xhr2 from 'xhr2';
xhr2.prototype._restrictedHeaders = {};

import { router } from './routes';

enableProdMode();

let port = process.env.PORT || 3000;

const app = express();
app.enable('trust proxy');

if (process.env.NODE_ENV === 'development') {
	app.use(require('connect-livereload')({
		port: 35729,
	}));
}

app.use(express.static(path.resolve(__dirname, __dirname + '/../client')));
app.use(express.static(path.resolve(__dirname, '../../assets')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', router);

app.get('*', (req, res) => {
	renderModuleFactory(AppServerModuleNgFactory, {
		document: require('../browser/index.html'),
		url: req.url,
		extraProviders: [
			{
				provide: 'REQUEST',
				useFactory: () => req,
			},
		],
	}).then((data) => {
		res.send(data);
	});
});

app.listen(port, () => {
	console.log('listening on http://0.0.0.0:' + port);
});
