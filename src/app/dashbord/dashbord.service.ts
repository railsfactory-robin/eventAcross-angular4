import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx"
import { environment } from './../common/config/env.config';


@Injectable()

export class DashboardService {
  constructor(private http:HttpClient){}

  getEvents(id){
  	const params = new HttpParams().set('on_dashboard', 'true').append('bucket_id', id);
  	let rootUrl = environment.rootUrl + '/api/v1/events';
    return this.http.get(rootUrl, {params: params, withCredentials: true}).map(res => res);
  }
  getEventsbyFilter(id, val){
  	const params = new HttpParams().set('filter_by', val).append('bucket_id', id);
  	let rootUrl = environment.rootUrl + '/api/v1/buckets/filtering';
    return this.http.get(rootUrl, {params: params, withCredentials: true}).map(res => res);	
  }
}