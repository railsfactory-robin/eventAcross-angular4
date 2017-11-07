import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class EventListService {


  constructor(private http: HttpClient) {  }

  
  getEvents(){
    // const params = {on_dashboard: false};
    let promise = new Promise((resolve, reject) => {
      this.http.get('http://api.eventsacross-stage.railsfactory.com/api/v1/events?on_dashboard=false')
      .toPromise()
      .then(
        res => {
          resolve(res);
        }
        ).catch(err => {

        });
      });
    return promise;
  }
}