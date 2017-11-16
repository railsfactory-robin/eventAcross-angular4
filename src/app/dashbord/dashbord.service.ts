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
}