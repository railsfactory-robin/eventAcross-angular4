import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
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
import { EventListComponent, DialogDataExampleDialog } from './event-list/event-list.component';
import { EventListService } from './event-list/event-list.service';
import { EventDetailsComponent } from './event-details/event-details.component';
import { OthereventsComponent } from './common/otherevents/otherevents.component';
import { FilterPipe, SortByPipe} from './common/filters';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { NoopInterceptor } from './common/auth-header';
import { DashboardService } from './dashbord/dashbord.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'event_list', component: EventListComponent },
  { path: 'event_list/:id', component: EventDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashbord', component: DashbordComponent,canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    FooterComponent,
    DashbordComponent,
    HomeComponent,
    EventListComponent,
    EventDetailsComponent,
    OthereventsComponent,
    FilterPipe,
    SortByPipe,
    DialogDataExampleDialog
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
    NgxCarouselModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    NgxPaginationModule,
    Ng4LoadingSpinnerModule
  ],
  providers: [LoginService,SignupService,AuthGuard,EventListService,DashboardService,{
    provide: HTTP_INTERCEPTORS,
    useClass: NoopInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent],
  entryComponents: [DialogDataExampleDialog]
})
export class AppModule { }
