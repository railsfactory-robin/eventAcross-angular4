import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  current_user: any;
  subscription: Subscription;

  constructor(private loginService: LoginService, private route: ActivatedRoute,
    private router: Router) { 
      this.subscription = this.loginService.getLoggedUser().subscribe(current_user => { 
        this.current_user = current_user.current_user;
       });
    }
    

  ngOnInit() {
    if (localStorage.getItem('current_user')) {
      this.current_user = JSON.parse(localStorage.getItem('current_user'));
    }
  }
  
  logout(){
  	this.loginService.setUserLoggedIn(false);
    localStorage.removeItem('current_user');
    localStorage.removeItem('is_logged_in');
    this.current_user = JSON.parse(localStorage.getItem('current_user'));
    this.loginService.sendLoginUser(this.current_user);
    this.router.navigate(['/login']);
  }

}
