import { Component, OnInit,  Inject } from '@angular/core';
import { DashboardService } from './dashbord.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }
  
  private mybuckets;
  private event_lists;
  private added_event = [];

  ngOnInit() {
    console.log(localStorage.getItem('current_user'))
    this.dashboardService.getEvents().subscribe(event_list => {
      this.event_lists = event_list["events"];
      console.log(this.event_lists)
    })
    this.dashboardService.getBuckets().subscribe(data => {
      console.log(data)
      this.mybuckets = data;
    })
  }

  addRemoveEvents(event_id){
    if(this.added_event.indexOf(event_id) === -1){
      this.added_event.push(event_id)
    }else{
      this.added_event.splice(this.added_event.indexOf(event_id),1);
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogDataExampleDialog, {
      width: '360px',
      data: {
        data: this.added_event
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
  styleUrls: ['./dashbord.component.css']
})
export class DialogDataExampleDialog implements OnInit{
  constructor(public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dashboardService: DashboardService) {}
  
  private buckets;
  private create_bucket;
  private bucket_name;
  private events_added;
  private bucket_added = [];
  
  ngOnInit(){
    this.events_added = this.data.data;
    this.dashboardService.getBuckets().subscribe(data => {
      console.log(data)
      this.buckets = data["buckets"];
    })
    this.create_bucket = false;
  }

  addedBuckets(bucket_id){
    alert(bucket_id)
    if(this.bucket_added.indexOf(bucket_id) === -1){
      this.bucket_added.push(bucket_id)
    }else{
      this.bucket_added.splice(this.bucket_added.indexOf(bucket_id),1);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openCreateBucket(){
    this.create_bucket = !this.create_bucket;
    this.bucket_name = '';
  }

  createBucket(){
    this.dashboardService.createBuckets(this.bucket_name).subscribe(data => {
      console.log(data)
      this.buckets.push({id: data["bucket"].id, name: data["bucket"].name})
      this.openCreateBucket();
    })
  }

  addEventToBucket(){
    this.dashboardService.addEventToBucket(this.bucket_added, this.events_added).subscribe(data => {
      console.log(data)
    })
  }
}