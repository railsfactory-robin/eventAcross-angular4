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

  getEvents(){
    let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/events?bucket_id=338&on_dashboard=true';
    return this.http.get(rootUrl, {withCredentials: true}).map(res => res);
  }

  createBuckets(name){
  	let body = {name: name}
  	let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/buckets/create-bucket';
    return this.http.post(rootUrl, body, {withCredentials: true} )
    .map(res => res);
  }

  addEventToBucket(buckets, events){
    let body = {buckets_and_events:{buckets: buckets, events: events}}
    let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/buckets/add-events';
    return this.http.post(rootUrl, body, {withCredentials: true} )
    .map(res => res);
  }
}