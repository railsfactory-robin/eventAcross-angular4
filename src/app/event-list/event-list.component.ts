import { Component, OnInit,  Inject } from '@angular/core';
import { EventListService } from './event-list.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})

export class EventListComponent implements OnInit {



  constructor(private eventListService: EventListService, public dialog: MatDialog, private spinnerService: Ng4LoadingSpinnerService) { }

  private mybuckets;
  private event_lists;
  private added_event = [];
  private current_user;
  page = 1;
  ngOnInit() {
    this.spinnerService.show();
    if (localStorage.getItem('current_user')) {
      this.current_user = JSON.parse(localStorage.getItem('current_user'));
      this.eventListService.getBuckets().subscribe(data => {
        console.log(data)
        this.mybuckets = data;
      })
    }
    this.getEvents(this.page)
  }

  getEvents(page){
    this.eventListService.getEvents(page).subscribe(event_list => {
      this.event_lists = event_list["events"];
      console.log(this.event_lists)
      this.spinnerService.hide();
    });
  }

  addRemoveEvents(event_id){
    if(this.added_event.indexOf(event_id) === -1){
      this.added_event.push(event_id)
    }else{
      this.added_event.splice(this.added_event.indexOf(event_id),1);
    }
  }

  pageChanged(){
    this.getEvents(this.page)
  }

  searchEvent(search){
    if (!search) {
      this.getEvents(1)
    }else{
      if(search.length > 2){
        this.spinnerService.show();
        this.eventListService.searchEvents(1,search).subscribe(event_list => {
          this.event_lists = event_list["events"];
          this.spinnerService.hide();
        });
      }
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
  styleUrls: ['./event-list.component.css']
})

export class DialogDataExampleDialog implements OnInit{
  constructor(public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private eventListService: EventListService) {}

  private buckets;
  private create_bucket;
  private bucket_name;
  private events_added;
  private bucket_added = [];
  private list: any;
  private EventAdded = false;

  ngOnInit(){
    this.events_added = this.data.data;
    this.eventListService.getBuckets().subscribe(data => {
      this.getEventsAndBuckets(data["buckets"]);
    })
    this.create_bucket = false;
  }

  getEventsAndBuckets(buckets){
    console.log(buckets)
    this.eventListService.getBucketsAndEvents().subscribe(data => {
      this.list = data;
      for (var i = this.list.length - 1; i >= 0; i--) {
        if(this.list[i].events.length > 0){
          for (var j = this.events_added.length - 1; j >= 0; j--) {
            for (var k = this.list[i].events.length - 1; k >= 0; k--) {
              if (this.events_added[j] == this.list[i].events[k].id) {
                for (var a = buckets.length - 1; a >= 0; a--) {
                  if (buckets[a].id == this.list[i].bucket.id) {
                    buckets[a].checked = true;
                  }
                }
              }
            }
          }
        }
      }
      this.buckets = buckets;
      console.log(buckets)
    })
  }

  addedBuckets(bucket_id){
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
    this.eventListService.createBuckets(this.bucket_name).subscribe(data => {
      console.log(data)
      this.buckets.push({id: data["bucket"].id, name: data["bucket"].name})
      this.openCreateBucket();
    })
  }

  addEventToBucket(){
    this.eventListService.addEventToBucket(this.bucket_added, this.events_added).subscribe(data => {
      console.log(data)
      this.EventAdded = true;
    })
  }
}