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
  ngOnInit() {
  	this.dashboardService.getBuckets().subscribe(data => {
      console.log(data)
      this.mybuckets = data;
    })
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogDataExampleDialog, {
      width: '360px',
      data: {
        data: this.mybuckets
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
  
  ngOnInit(){
   this.buckets = this.data.data.buckets;
   console.log(this.buckets)
   this.create_bucket = false;
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
}