import { Component, OnInit,  Inject } from '@angular/core';
import { DashboardService } from './dashbord.service'
import { EventListService } from './../event-list/event-list.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {DialogDataExampleDialog} from './../event-list/event-list.component'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(private dashboardService: DashboardService,
  private eventListService: EventListService,
  private spinnerService: Ng4LoadingSpinnerService,
  public dialog: MatDialog,
  private router: Router) { }

  private mybuckets;
  private events;
  private bucket_name;
  private bucket_id;

  ngOnInit() {
    this.spinnerService.show();
  	this.eventListService.getBuckets().subscribe(data => {
        this.mybuckets = data;
        this.bucket_name = this.mybuckets.recent_bucket.name;
        this.bucket_id = this.mybuckets.recent_bucket.id;
        this.getEvents(this.mybuckets.recent_bucket.id);
      })
  }

    openDialog(): void {
    let dialogRef = this.dialog.open(DialogDataExampleDialog, {
      width: '360px',
      data: {
        data: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createRoute(){
    this.router.navigate(['/create_event', { id: this.bucket_id}]);
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
    this.bucket_name = name;
    this.bucket_id = id;
    this.getEvents(id);
  }

}
