import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassesMenuComponent } from './components/classes-menu/classes-menu.component';
import {AppRoutingModule} from './shared/app-routing.module';
import {MaterialModule} from './shared/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {HttpClientModule} from '@angular/common/http';
import { ClassOverviewComponent } from './components/class-overview/class-overview.component';
import { ClassUploadComponent } from './components/class-upload/class-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassesMenuComponent,
    ToolbarComponent,
    ClassOverviewComponent,
    ClassUploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
