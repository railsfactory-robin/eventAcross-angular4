import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LoginService {

  private isUserLoggedIn;

  constructor(private http: HttpClient) { 
    this.isUserLoggedIn = false;
  }


  results;

  getUser(username,password){
    const params = {username: username ,password: password};
    let promise = new Promise((resolve, reject) => {
      this.http.post('http://api.eventsacross-stage.railsfactory.com/api/v1/users/signin',params)
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

  setUserLoggedIn(val){
    this.isUserLoggedIn = val;
  }

  getUserLoggedIn(){
    return this.isUserLoggedIn;
  }
}