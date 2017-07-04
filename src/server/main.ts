import 'zone.js/dist/zone-node';
import { platformServer, renderModuleFactory } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'
import { AppServerModule } from './app'
import { AppServerModuleNgFactory } from '../aot/src/server/app.ngfactory'
import * as express from 'express';
import * as path from 'path';

enableProdMode();

let port = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.static(path.resolve(__dirname, '../../assets')));

app.get('*', (req, res) => {
	renderModuleFactory(AppServerModuleNgFactory, {
		document: require('../browser/index.html'),
		url: req.url
	})
	.then((data) => {
		res.send(data);
	});
});

app.listen(port, () => {
	console.log('listening on http://0.0.0.0:' + port);
});
