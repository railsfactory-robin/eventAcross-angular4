import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx"

@Injectable()

export class DashboardService {
  constructor(private http:HttpClient){}

  getBuckets(){
    let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/buckets';
    return this.http.get(rootUrl,{withCredentials: true})
    .map(res => res);
  }

  createBuckets(name){
  	let body = {name: name}
  	let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/buckets/create-bucket';
  	let params = new HttpParams().set('name', name);
    return this.http.post(rootUrl, body, {withCredentials: true} )
    .map(res => res);
  }
}