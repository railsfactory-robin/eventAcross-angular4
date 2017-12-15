import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx"

@Injectable()

export class DashboardService {
  constructor(private http:HttpClient){}

  getEvents(id){
  	const params = new HttpParams().set('on_dashboard', 'true').append('bucket_id', id);
  	let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/events';
    return this.http.get(rootUrl, {params: params, withCredentials: true}).map(res => res);
  }
  getEventsbyFilter(id, val){
  	const params = new HttpParams().set('filter_by', val).append('bucket_id', id);
  	let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/buckets/filtering';
    return this.http.get(rootUrl, {params: params, withCredentials: true}).map(res => res);	
  }
}