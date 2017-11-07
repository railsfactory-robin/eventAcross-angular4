import { Component, OnInit } from '@angular/core';
import { HeaderComponent }from './../header/header.component'

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(private comp: HeaderComponent) { }

  ngOnInit() {
  	this.comp.ngOnInit();
  }

}
