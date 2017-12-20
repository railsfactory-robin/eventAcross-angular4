import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { environment } from './../common/config/env.config';


@Injectable()
export class LoginService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) {}


  getUser(username,password){
    const params = {username: username ,password: password};
    let promise = new Promise((resolve, reject) => {
      this.http.post(environment.rootUrl+'/api/v1/users/signin',params)
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
    localStorage.setItem('is_logged_in', val);
  }

  getUserLoggedIn(){
    return localStorage.getItem('is_logged_in');
  }

  getLoggedUser(): Observable<any> {
    return this.subject.asObservable();
  }
  sendLoginUser(current_user: any) {
    this.subject.next({ current_user });
  }
}