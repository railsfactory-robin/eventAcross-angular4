import {Injectable} from '@angular/core';
import { Observable } from "rxjs/Rx"
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';


@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	console.log(req)
  	if (req.withCredentials == true) {
  		let token = JSON.parse(localStorage.getItem('current_user')).token;
  		const authReq = req.clone({headers: req.headers.set('Authorization', token)});
  		return next.handle(authReq);
  	}

    return next.handle(req);
  }
}