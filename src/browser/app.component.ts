import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
	selector: 'fourscore-app',
	styleUrls: ['./app.component.scss', '../scss/main.scss'],
	templateUrl: './app.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
	public constructor() {}

	public ngOnInit() {
		setTimeout(() => {
			try {
				document.querySelector('.loading-overlay').classList.add('loaded');
			}
			catch (e) {}
		});
	}
}
