import { Component, OnInit } from '@angular/core';
import { EventListService } from './event-list.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

 private event_lists;

  constructor(private eventListService: EventListService) { }
  eventname;

  ngOnInit() {
    this.eventListService.getEvents().subscribe(event_list => {
      this.event_lists = event_list["events"];
      console.log(this.event_lists)
    })
  }

}
