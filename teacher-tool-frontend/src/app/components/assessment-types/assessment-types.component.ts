import {Component, Input, OnInit} from '@angular/core';
import {Class} from '../../models/class';
import {Subject} from '../../models/subject';
import {Observable} from 'rxjs';
import {Assessment} from '../../models/assessment';
import {AssessmentService} from '../../services/assessment.service';
import {AddStudentDialogComponent} from '../add-student-dialog/add-student-dialog.component';
import {MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {AddAssessmentDialogComponent} from '../add-assessment-dialog/add-assessment-dialog.component';
import {Router} from '@angular/router';
import {SubjectService} from '../../services/subject.service';

@Component({
  selector: 'app-assessment-types',
  templateUrl: './assessment-types.component.html',
  styleUrls: ['./assessment-types.component.scss']
})
export class AssessmentTypesComponent implements OnInit {

  @Input()subject:Subject;
  assessments_normal:Observable<Assessment[]>;
  assessments_participation:Observable<Assessment[]>;
  editedData:boolean;
  participation_valance:number;

  constructor(private assessmentService:AssessmentService,
              private dialog:MatDialog,
              private snackbar:MatSnackBar,
              private subjectServer:SubjectService) {
  }

  ngOnInit() {
    this.assessmentService.editedData$.subscribe(editedData=>this.editedData=editedData);
    this.assessmentService.participation_valence$.subscribe(participation_valance=>this.participation_valance=participation_valance);
    this.assessmentService.participation_valence.next(this.subject.participation_valence);
    this.assessments_normal=this.assessmentService.assessments_normal;
    this.assessments_participation=this.assessmentService.assessments_participation;
    this.assessmentService.loadAssessmentsOfSubject_Normal(this.subject.id);
    this.assessmentService.loadAssessmentsOfSubject_Participation(this.subject.id);
    // this.assessmentService.assessments_normal.subscribe(assessments=>{
    //   if (assessments.length == 0)
    //     this.assessmentService.loadAssessmentsOfSubject_Normal(this.subject.id);
    // });
    // this.assessmentService.assessments_participation.subscribe(assessments=>{
    //   if (assessments.length == 0)
    //     this.assessmentService.loadAssessmentsOfSubject_Participation(this.subject.id);
    // });
  }

  openAddAssessmentDialog() {
    let dialogRef = this.dialog.open(AddAssessmentDialogComponent, {
      width: '250px'
    });
    dialogRef.componentInstance.subject=this.subject;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.type == 'n')
          this.assessmentService.addToAssessments_normal(result);
        else if (result.type == 'p')
          this.assessmentService.addToAssessments_participation(result);
        this.openSnackBar('Die Bewertungsart ' + result.name +' wurde hinzugefügt');
        this.assessmentService.editedData.next(true);
      }
    });
  }

  openSnackBar(message: string,): MatSnackBarRef<SimpleSnackBar> {
    return this.snackbar.open(message, null, {duration: 2000});
  }

  dataEdited(){
    this.assessmentService.editedData.next(true);
    this.assessmentService.participation_valence.next(this.participation_valance);
  }
}
