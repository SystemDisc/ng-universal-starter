import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from '../browser/app.module';
import { AppComponent } from '../browser/app.component';

@NgModule({
	imports: [
		ServerModule,
		AppModule,
	],
	bootstrap: [
		AppComponent,
	],
})
export class AppServerModule {}
