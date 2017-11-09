import { Component, OnInit } from '@angular/core'
import { LoginService } from '../login/login.service';;
import { SignupService } from './signup.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private signupService: SignupService, private loginService: LoginService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }
  username;
  password;
  useremail;
  confirm_password;
  error_signup;
  success_signup;
  current_user: any;
  Registeruser(){
    this.signupService.registerUser(this.username,this.useremail,this.password,this.confirm_password)
    .then(data => {
      if (data["status"] == 200) {
        this.current_user = {};
        this.current_user["token"] = data["token"].token;
        this.current_user['name'] = this.username
        localStorage.setItem('current_user', JSON.stringify(this.current_user));
        this.loginService.setUserLoggedIn(true);
        this.loginService.sendLoginUser(this.current_user);
        this.router.navigate(['/dashbord']);
      }else{
        this.error_signup = data["message"];
      }
    });
  }

}
