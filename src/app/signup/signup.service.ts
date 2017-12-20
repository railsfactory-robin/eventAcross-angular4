import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from './../common/config/env.config';


@Injectable()
export class SignupService {

  constructor(private http: HttpClient) { }

  results;

  registerUser(username,email,password,cpassword){
    const params = {name: username, email: email, password: password, password_confirmation: cpassword};
    let promise = new Promise((resolve, reject) => {
      this.http.post(environment.rootUrl + '/api/v1/users/signup',params)
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