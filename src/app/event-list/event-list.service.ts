import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx"



@Injectable()
export class EventListService {

  constructor(private http:HttpClient){}

  getBuckets(){
    let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/buckets';
    return this.http.get(rootUrl,{withCredentials: true})
    .map(res => res);
  }

  getEvents(){
    let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/events?on_dashboard=false';
    return this.http.get(rootUrl, {withCredentials: false}).map(res => res);
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
  
  getEventById(slug){
    let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/events/'+slug;
    return this.http.get(rootUrl).map(res => res);
  }
  getBucketsAndEvents(){
    let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/buckets/buckets-and-events';
    return this.http.get(rootUrl, {withCredentials: true} )
    .map(res => res);
  }
}