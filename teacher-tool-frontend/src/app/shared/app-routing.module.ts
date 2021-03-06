import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from '../app.component';
import {ClassOverviewComponent} from '../components/class-overview/class-overview.component';
import {ClassUploadComponent} from '../components/class-upload/class-upload.component';
import {StudentRandomizerComponent} from '../components/student-randomizer/student-randomizer.component';
import {GradingKeyComponent} from '../components/grading-key/grading-key.component';
import {SubjectOverviewComponent} from '../components/subject-overview/subject-overview.component';
import {MarkComponent} from '../components/mark/mark.component';
import {CompleteYearComponent} from '../components/complete-year/complete-year.component';
import {CompleteYearEditClassesComponent} from '../components/complete-year-edit-classes/complete-year-edit-classes.component';
import {StudentOverviewComponent} from '../components/student-overview/student-overview.component';

const appRoutes: Routes=[
  {path: 'class',component:ClassOverviewComponent},
  {path:'class/:id',component:ClassOverviewComponent},
  {path:'class/upload',component:ClassUploadComponent},
  {path:'class/:id/subject/:subjectid',component:ClassOverviewComponent,children:[
      {path:'',component:SubjectOverviewComponent},
      {path:'grading',component:GradingKeyComponent}
    ]},
  {path:'class/:id/subject/:subjectid/random',component:StudentRandomizerComponent},
  {path:'class/:id/subject/:subjectid/student/:studentid',component:StudentOverviewComponent},
  {path:'class/:id/subject/:subjectid/mark',component:MarkComponent},
  {path:'complete',component:CompleteYearComponent},
  {path:'complete/editclasses',component:CompleteYearEditClassesComponent},
  {path: '', redirectTo: 'class',pathMatch: 'full'},
  {path: '**', redirectTo: 'class',pathMatch: 'full'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,{onSameUrlNavigation: 'reload'}),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
