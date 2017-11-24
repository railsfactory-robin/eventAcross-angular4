import { Component, OnInit,  Inject } from '@angular/core';
import { DashboardService } from './dashbord.service'
import { EventListService } from './../event-list/event-list.service'

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private eventListService: EventListService) { }

  private mybuckets;
  private events;

  ngOnInit() {
  	this.eventListService.getBuckets().subscribe(data => {
        console.log("bickets ",data)
        this.mybuckets = data;
        this.getEvents(this.mybuckets.recent_bucket.id);
      })
  }

  getEvents(id){
    this.dashboardService.getEvents(id).subscribe(data => {
      this.events = data;
      console.log("dashboard events", this.events)
    })
  }

}
