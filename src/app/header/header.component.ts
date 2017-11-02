import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private route: ActivatedRoute,
  private router: Router) { }
  login_status;
  ngOnInit() {
  	this.login_status = this.loginService.getUserLoggedIn();
  }
  logut(){
  	this.loginService.setUserLoggedIn(false);
  	this.router.navigate(['/login']);
  }

}
