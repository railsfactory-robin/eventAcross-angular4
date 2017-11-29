import { Component, OnInit,  Inject } from '@angular/core';
import { DashboardService } from './dashbord.service'
import { EventListService } from './../event-list/event-list.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private eventListService: EventListService, private spinnerService: Ng4LoadingSpinnerService) { }

  private mybuckets;
  private events;
  private event_name;

  ngOnInit() {
    this.spinnerService.show();
  	this.eventListService.getBuckets().subscribe(data => {
        this.mybuckets = data;
        this.event_name = this.mybuckets.recent_bucket.name;
        this.getEvents(this.mybuckets.recent_bucket.id);
      })
  }

  getEvents(id){
    this.dashboardService.getEvents(id).subscribe(data => {
      this.events = data["events"];
      console.log("dashboard events", this.events);
      this.spinnerService.hide();
    })
  }

  getBucketEvent(id,name){
    this.spinnerService.show();
    this.event_name = name;
    this.getEvents(id);
  }

}
