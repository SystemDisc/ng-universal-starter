import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent, AppModule } from '../browser/app';

@NgModule({
	imports: [
		ServerModule,
		AppModule
	],
	bootstrap: [
		AppComponent
	]
})
export class AppServerModule {}
