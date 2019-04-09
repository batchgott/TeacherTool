import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {Route, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RandomStudentComponent } from './random-student/random-student.component';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes=[
  {path: 'users'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RandomStudentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
