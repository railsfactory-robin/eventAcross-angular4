import { Component, OnInit } from '@angular/core';
import { EventListService } from './../event-list/event-list.service'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  constructor(
  	private eventlist: EventListService,
  	private route: ActivatedRoute,
  	private location: Location
  ) {}

  private event;

  ngOnInit() {
  	this.getEvent();
  }

  getEvent(){
  	const id = +this.route.snapshot.paramMap.get('id');
  	this.eventlist.getEventById(id).subscribe(event => {
  		this.event = event["events"]
  		console.log(this.event)
  	})
  }

}
