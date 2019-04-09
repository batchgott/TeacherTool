import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RouterModule, Routes} from "@angular/router";
import { ContactmanagerAppComponent } from './contactmanager/contactmanager-app.component';

const routes: Routes=[
  {path: 'contactmanager',loadChildren: './contactmanager/contactmanager.module#ContactmanagerModule'},
  {path: 'demo',loadChildren: './demo/demo.module#DemoModule'},
  {path: '**', redirectTo:'contactmanager'}
  ];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
