import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashbord.service'

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }
  
  ngOnInit() {
  	this.dashboardService.getBuckets().subscribe(data => {
      console.log(data)
    })
  }

}
