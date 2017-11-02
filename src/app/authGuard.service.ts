import { Injectable }     from '@angular/core';
import { CanActivate , Router, ActivatedRouteSnapshot, RouterStateSnapshot}  from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.loginService.getUserLoggedIn()) { return true; }
      this.router.navigate(['/login']);
      return false;
  }
}