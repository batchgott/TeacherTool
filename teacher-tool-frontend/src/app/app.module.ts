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
import { ChooseStudentsDialogComponent } from './components/choose-students-dialog/choose-students-dialog.component';
import { GradingKeyComponent } from './components/grading-key/grading-key.component';
import { EditClassDialogComponent } from './components/edit-class-dialog/edit-class-dialog.component';
import { SubjectOverviewComponent } from './components/subject-overview/subject-overview.component';
import { SecondSemesterNumeratorPipe } from './pipes/second-semester-numerator.pipe';
import { AssessmentTypesComponent } from './components/assessment-types/assessment-types.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AssessmentTypeComponent } from './components/assessment-types/assessment-type/assessment-type.component';
import { AddAssessmentDialogComponent } from './components/add-assessment-dialog/add-assessment-dialog.component';
import { ChooseSpecificStudentDialogComponent } from './components/choose-specific-student-dialog/choose-specific-student-dialog.component';
import { AddPerformanceComponent } from './components/add-performance/add-performance.component';
import { MarkComponent } from './components/mark/mark.component';
import { CompleteYearComponent } from './components/complete-year/complete-year.component';
import { CompleteYearEditClassesComponent } from './components/complete-year-edit-classes/complete-year-edit-classes.component';
import { EditSubjectDialogComponent } from './components/edit-subject-dialog/edit-subject-dialog.component';
import { StudentOverviewComponent } from './components/student-overview/student-overview.component';
import { EditStudentDialogComponent } from './components/edit-student-dialog/edit-student-dialog.component';
import { AddPerformanceDialogComponent } from './components/add-performance-dialog/add-performance-dialog.component';
import { EditPerformanceDialogComponent } from './components/edit-performance-dialog/edit-performance-dialog.component';




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
    ShufflePipe,
    ChooseStudentsDialogComponent,
    GradingKeyComponent,
    EditClassDialogComponent,
    SubjectOverviewComponent,
    SecondSemesterNumeratorPipe,
    AssessmentTypesComponent,
    AssessmentTypeComponent,
    AddAssessmentDialogComponent,
    ChooseSpecificStudentDialogComponent,
    AddPerformanceComponent,
    MarkComponent,
    CompleteYearComponent,
    CompleteYearEditClassesComponent,
    EditSubjectDialogComponent,
    StudentOverviewComponent,
    EditStudentDialogComponent,
    AddPerformanceDialogComponent,
    EditPerformanceDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    EcoFabSpeedDialModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    AddSubjectDialogComponent,
    AddStudentDialogComponent,
    AddClassDialogComponent,
    ConfirmationDialogComponent,
    RemoveSubjectDialogComponent,
    RemoveStudentDialogComponent,
    ChooseStudentsDialogComponent,
    EditClassDialogComponent,
    AddAssessmentDialogComponent,
    ChooseSpecificStudentDialogComponent,
    EditSubjectDialogComponent,
    EditStudentDialogComponent,
    AddPerformanceDialogComponent,
    EditPerformanceDialogComponent
  ]
})
export class AppModule { }
