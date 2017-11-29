import { Component, OnInit } from '@angular/core';
import { EventListService } from './../event-list/event-list.service'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  constructor(
  	private eventlist: EventListService,
  	private route: ActivatedRoute,
  	private location: Location, 
    private spinnerService: Ng4LoadingSpinnerService
    ) {}

  private event;
  private comments;

  ngOnInit() {
    this.spinnerService.show();
    this.getEvent();
  }

  getEvent(){
  	const slug = this.route.snapshot.paramMap.get('id');
  	this.eventlist.getEventById(slug).subscribe(event => {
  		this.event = event;
  		console.log(event);
      this.getComments(this.event.id);
    })
  }

  getComments(id){
    this.eventlist.getComments(id).subscribe(data => {
      console.log(data);
      this.comments = data;
      this.spinnerService.hide();
    })
  }

}
