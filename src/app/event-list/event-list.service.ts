import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx"
import { environment } from './../common/config/env.config';



@Injectable()
export class EventListService {

  constructor(private http:HttpClient){}

  getBuckets(){
    let rootUrl = environment.rootUrl + '/api/v1/buckets';
    return this.http.get(rootUrl,{withCredentials: true})
    .map(res => res);
  }

  getEvents(page){
    const params = new HttpParams().set('on_dashboard', 'false').append('per_page', "20").append('page',page);
    let rootUrl = environment.rootUrl + '/api/v1/events';
    return this.http.get(rootUrl, {params: params, withCredentials: false}).map(res => res);
  }

  searchEvents(page,search){
    const params = new HttpParams().set('search_text', search).append('per_page', "12").append('page',page);
    let rootUrl = environment.rootUrl + '/api/v1/events/search-events';
    return this.http.get(rootUrl, {params: params, withCredentials: false}).map(res => res);
  }

  createBuckets(name){
    let body = {name: name}
    let rootUrl = environment.rootUrl + '/api/v1/buckets/create-bucket';
    return this.http.post(rootUrl, body, {withCredentials: true} )
    .map(res => res);
  }

  addEventToBucket(buckets, events){
    let body = {buckets_and_events:{buckets: buckets, events: events}}
    let rootUrl = environment.rootUrl + '/api/v1/buckets/add-events';
    return this.http.post(rootUrl, body, {withCredentials: true} )
    .map(res => res);
  }
  
  getEventById(slug){
    let rootUrl = environment.rootUrl + '/api/v1/events/'+slug;
    return this.http.get(rootUrl).map(res => res);
  }
  getBucketsAndEvents(){
    let rootUrl = environment.rootUrl + '/api/v1/buckets/buckets-and-events';
    return this.http.get(rootUrl, {withCredentials: true} )
    .map(res => res);
  }

  getComments(id){
    let rootUrl = environment.rootUrl + '/api/v1/comments/for-event/'+id;
    return this.http.get(rootUrl, {withCredentials: true} )
    .map(res => res);
  }
  createEvent(bucket_id, name, description, start_at, end_at, locations, is_public, url, tags){
    let body = {bucket_id: bucket_id, name: name, description: description, start_at: start_at, end_at: end_at, locations: locations, is_public: is_public, url:url, tags:tags}
    let rootUrl = environment.rootUrl + '/api/v1/buckets/create-event';
    return this.http.post(rootUrl, body, {withCredentials: true} )
    .map(res => res);
  }

  addComments(comment){
    let body = {comment : {body: comment["body"], is_public: comment["is_public"], event_id: comment["event_id"]}};
    let rootUrl = environment.rootUrl + '/api/v1/comments/post-comment';
    return this.http.post(rootUrl, body, {withCredentials: true} )
    .map(res => res);
  }
}