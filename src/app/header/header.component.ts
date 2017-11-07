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
  private current_user;

  ngOnInit() {
    if (localStorage.getItem('current_user')) {
      this.current_user = JSON.parse(localStorage.getItem('current_user'));
    }
  }

  logut(){
  	this.loginService.setUserLoggedIn(false);
    localStorage.removeItem('current_user');
    localStorage.removeItem('is_logged_in');
    this.router.navigate(['/login']);
  }

}
