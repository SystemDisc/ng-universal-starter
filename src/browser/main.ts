import 'zone.js/dist/zone';
import { platformBrowser } from '@angular/platform-browser'
import { AppModuleNgFactory } from '../aot/src/browser/app.ngfactory'

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
