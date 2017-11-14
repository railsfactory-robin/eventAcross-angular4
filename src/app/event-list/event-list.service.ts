import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs/Rx"



@Injectable()
export class EventListService {

  private events;

  constructor(private http: HttpClient) {  }

  
  getEvents(){
    let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/events?on_dashboard=false';
    return this.http.get(rootUrl).map(res => res);
  }
  getEventById(slug){
  	let rootUrl = 'http://api.eventsacross-stage.railsfactory.com/api/v1/events/'+slug;
  	return this.http.get(rootUrl).map(res => res);
  }
}