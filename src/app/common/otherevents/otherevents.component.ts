import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-otherevents',
	templateUrl: './otherevents.component.html',
	styleUrls: ['./otherevents.component.css']
})
export class OthereventsComponent implements OnInit {

	private current_user;
	constructor() { }

	ngOnInit() {
		if (localStorage.getItem('current_user')) {
			this.current_user = JSON.parse(localStorage.getItem('current_user'));
		}
	}

}
