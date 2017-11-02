import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CarouselModule } from 'angular4-carousel';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { LoginService } from './login/login.service';
import { SignupService } from './signup/signup.service';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './authGuard.service';



const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashbord', component: DashbordComponent,canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    FooterComponent,
    DashbordComponent,
    HomeComponent
  ],
  imports: [
   RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    NgxCarouselModule
  ],
  providers: [LoginService,SignupService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
