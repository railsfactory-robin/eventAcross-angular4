import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private signupService: SignupService) { }

  ngOnInit() {
  }
  username;
  password;
  useremail;
  confirm_password;
  error_signup;
  success_signup;
  current_user;
  Registeruser(){
    this.signupService.registerUser(this.username,this.useremail,this.password,this.confirm_password)
    .then(data => {
      if (data["status"] == 200) {
        this.current_user["token"] = data["token"]["token"];
      }else{
        this.error_signup = data["message"];
      }
    });
  }

}
