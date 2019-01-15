import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from '../app.component';
import {ClassOverviewComponent} from '../components/class-overview/class-overview.component';
import {ClassUploadComponent} from '../components/class-upload/class-upload.component';

const appRoutes: Routes=[
  {path: 'class',component:ClassOverviewComponent},
  {path:'class/:id',component:ClassOverviewComponent},
  {path:'class/upload',component:ClassUploadComponent},
  {path:'class/:id/subject/:subjectid',component:ClassOverviewComponent},
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
