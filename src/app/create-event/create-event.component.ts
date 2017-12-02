import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { EventListService } from './../event-list/event-list.service'
import {DialogDataExampleDialog} from './../event-list/event-list.component'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  address_type = true;
  event: any;

  separatorKeysCodes = [ENTER];
  tags = [];
  private mybuckets;
  private event_name;
  private current_bucket;
  private address: any
  is_public = true;
  event_create_status;

  constructor(private eventListService: EventListService,
   private spinnerService: Ng4LoadingSpinnerService,
   public dialog: MatDialog,
   private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.spinnerService.show();
    this.eventListService.getBuckets().subscribe(data => {
      this.mybuckets = data;
      if (id) {
        this.changeBucket(id);
      }else{
        this.current_bucket = this.mybuckets.recent_bucket;        
      }
      this.spinnerService.hide();
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

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: any): void {
    let index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  changeAddressMode(){
    this.address_type = !this.address_type;
  }

  changeBucket(id){
    for (var i = this.mybuckets.buckets.length - 1; i >= 0; i--) {
      if (this.mybuckets.buckets[i].id == id) {
        this.current_bucket = this.mybuckets.buckets[i];
      }
    }
  }

  createEvent(form){
    let data = form.value   
    let start_time:string,
    end_time:string,
    hour:string,
    minute:string,
    second:string,
    start_at:string,
    end_at:string;
    this.address = [];

    hour = (data.start_time.hour.toString().length==2) ? data.start_time.hour.toString() : ('0'+data.start_time.hour.toString());
    minute = (data.start_time.minute.toString().length==2) ? data.start_time.minute.toString() : ('0'+data.start_time.minute.toString());
    second = (data.start_time.second.toString().length==2) ? data.start_time.second.toString() : ('0'+data.start_time.second.toString());
    
    start_time = hour+':'+minute+':'+second;

    hour = (data.end_time.hour.toString().length==2) ? data.end_time.hour.toString() : ('0'+data.end_time.hour.toString());
    minute = (data.end_time.minute.toString().length==2) ? data.end_time.minute.toString() : ('0'+data.end_time.minute.toString());
    second = (data.end_time.second.toString().length==2) ? data.end_time.second.toString() : ('0'+data.end_time.second.toString());
    
    end_time = hour+':'+minute+':'+second;

    start_at = data.start_date.toString().replace('00:00:00', start_time);
    end_at = data.end_date.toString().replace('00:00:00', end_time);
    if (this.address.length < 1) {
      this.address = data.address;
    }
    console.log(this.address)
    this.eventListService.createEvent(this.current_bucket.id, data.event_name, data.event_description, start_at, end_at, this.address, data.is_public, data.url, this.tags.toString()).subscribe(data => {
      console.log(data);
      if (data["status"] == 200) {
        this.event_create_status = data["message"];
        form.reset();
        window.scrollTo(0, 0);
        setTimeout(function(){ 
          this.event_create_status = null;
        }, 3000);
      }else{
        this.event_create_status = "error";
      }
    })

  }

  googleLocation(selectedData:any) {
    this.address = [];
    console.log(this.address)
    if (selectedData) {
      for (var i = selectedData.data.address_components.length - 1; i >= 0; i--) {
        if(selectedData.data.address_components[i].types[0] == "postal_code"){
          this.address.pin = selectedData.data.address_components[i].long_name;
        }
        if(selectedData.data.address_components[i].types[0] == "country"){
          this.address.country = selectedData.data.address_components[i].long_name;
        }
        if(selectedData.data.address_components[i].types[0] == "administrative_area_level_1"){
          this.address.state = selectedData.data.address_components[i].long_name;
        }
        if(selectedData.data.address_components[i].types[0] == "sublocality_level_1"){
          this.address.address_lane_1 = selectedData.data.address_components[i].long_name;
        }
        if(selectedData.data.address_components[i].types[0] == "administrative_area_level_2"){
          this.address.address_lane_2 = selectedData.data.address_components[i].long_name;
        }
        if(selectedData.data.address_components[i].types[0] == "locality"){
          this.address.city = selectedData.data.address_components[i].long_name;
        }
        if(selectedData.data.address_components[i].types[0] == "sublocality_level_2"){
          this.address.lane = selectedData.data.address_components[i].long_name;
        }
      }
      this.address.venue = selectedData.data.name;
      console.log(this.address)
    }
  }
}
