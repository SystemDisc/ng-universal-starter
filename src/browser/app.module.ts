import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	imports: [
		FormsModule,
		BrowserModule.withServerTransition({
			appId: 'fourscore-app',
		}),
		RouterModule.forRoot([
			{ path: '', component: HomeComponent, pathMatch: 'full' },
		]),
	],
	declarations: [
		AppComponent,
		HomeComponent,
	],
	bootstrap: [
		AppComponent,
	],
})
export class AppModule {}
