import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from '../app.component';

const appRoutes: Routes=[
  {path: 'class',component:AppComponent,children:[
      {path:':id'}
    ]},

  {path: '', redirectTo: 'class',pathMatch: 'full'},
  {path: '**', redirectTo: 'class',pathMatch: 'full'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
