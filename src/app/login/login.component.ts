import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
  }
  username;
  password;
  current_user ;
  error_signin;
  onSubmit() { 
    this.loginService.getUser(this.username,this.password)
    .then(data => {
      console.log(data);
      if (data["status"] == 200) {
        this.current_user = data;
        this.loginService.setUserLoggedIn(true);
        console.log(this.loginService.getUserLoggedIn())
        this.router.navigate(['/dashbord']);
      }else{
        this.error_signin = data["message"];
      }
    });
    
  }
}
