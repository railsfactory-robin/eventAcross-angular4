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
  private comment;
  private is_public = true;

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

  addComment(){
    if (this.comment) {
      let com = [];
      com["body"] = this.comment;
      com["is_public"] = this.is_public;
      com["event_id"] = this.event.id;
      this.eventlist.addComments(com).subscribe(data => {
        this.getComments(this.event.id);
        this.comment = '';
      })
    }
  }

  commentMode($event){
    if ($event.nextId == 'private') {
      this.is_public = false;
    }else{
      this.is_public = true;
    }
  }

}
