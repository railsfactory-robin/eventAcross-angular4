import { Component, OnInit } from '@angular/core';
import { EventListService } from './event-list.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

 private event_list;

  constructor(private eventListService: EventListService) { }

  ngOnInit() {
  	this.eventListService.getEvents()
  	.then(data => {
      console.log(data);
      this.event_list = data["events"]
    });
  }

}
