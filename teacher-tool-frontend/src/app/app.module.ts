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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {EcoFabSpeedDialModule} from '@ecodev/fab-speed-dial';
import { AddSubjectDialogComponent } from './components/add-subject-dialog/add-subject-dialog.component';
import { AddStudentDialogComponent } from './components/add-student-dialog/add-student-dialog.component';
import { AddClassDialogComponent } from './components/add-class-dialog/add-class-dialog.component';
import { SchoolyearPipe } from './pipes/schoolyear.pipe';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog.component';
import { RemoveSubjectDialogComponent } from './components/remove-subject-dialog/remove-subject-dialog.component';
import { RemoveStudentDialogComponent } from './components/remove-student-dialog/remove-student-dialog.component';
import { StudentRandomizerComponent } from './components/student-randomizer/student-randomizer.component';
import { ShufflePipe } from './pipes/shuffle.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ClassesMenuComponent,
    ToolbarComponent,
    ClassOverviewComponent,
    ClassUploadComponent,
    AddSubjectDialogComponent,
    AddStudentDialogComponent,
    AddClassDialogComponent,
    SchoolyearPipe,
    ConfirmationDialogComponent,
    RemoveSubjectDialogComponent,
    RemoveStudentDialogComponent,
    StudentRandomizerComponent,
    ShufflePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    EcoFabSpeedDialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    AddSubjectDialogComponent,
    AddStudentDialogComponent,
    AddClassDialogComponent,
    ConfirmationDialogComponent,
    RemoveSubjectDialogComponent,
    RemoveStudentDialogComponent
  ]
})
export class AppModule { }
