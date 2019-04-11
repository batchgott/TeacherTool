import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Performance} from '../../models/performance';
import {Assessment} from '../../models/assessment';
import {Observable} from 'rxjs';
import {Subject} from '../../models/subject';
import {Student} from '../../models/student';
import {Class} from '../../models/class';
import {AssessmentService} from '../../services/assessment.service';
import {PerformanceService} from '../../services/performance.service';
import {MatDialogRef, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-performance-dialog',
  templateUrl: './edit-performance-dialog.component.html',
  styleUrls: ['./edit-performance-dialog.component.scss'],
  providers:[AssessmentService]
})
export class EditPerformanceDialogComponent implements OnInit {

  performanceForm:FormGroup;
  performance:Performance;
  grade:number;
  date:Date;
  firstSemester:boolean;
  withPoints:boolean;
  maxPoints:number;
  reachedPoints:number;
  selectedAssessment:Assessment;
  assessments:Observable<Assessment[]>;
  subject:Subject;
  student:Student;
  class:Class;

  constructor(private assessmentService:AssessmentService,
              private performanceService:PerformanceService,
              private router:Router,
              private dialogRef:MatDialogRef<EditPerformanceDialogComponent>) { }

  ngOnInit() {
    this.assessments=this.assessmentService.allAssessments;
    this.selectedAssessment=null;
    this.assessmentService.loadAllAssessmentsOfSubject(this.subject.id);
    this.grade=3;
    this.date=new Date();
    this.withPoints=false;
    let currentMonth=this.date.getMonth();
    this.firstSemester = !(currentMonth >= 2 && currentMonth < 9);
    this.performanceForm = new FormGroup({
      'date': new FormControl(this.performance.date, [
        Validators.required])
    });
  }

  dateChanged() {
    let currentMonth=this.date.getMonth();
    this.firstSemester = !(currentMonth >= 1 && currentMonth < 8);
    console.log(this.maxPoints);
  }

  addPerformance() {
    this.performance.date=this.date;
    this.performance.assessment_id=this.selectedAssessment.id;
    this.performance.grade=this.grade;
    this.firstSemester?this.performance.semester="1":this.performance.semester="2";
    if (this.withPoints) {
      this.performance.max_points=this.maxPoints;
      this.performance.points=this.reachedPoints;
    }
    this.performance.subject_id=this.subject.id;
    this.performance.student_id=this.student.id;
    this.performanceService.editPerformance(this.performance);
    this.dialogRef.close(true);
  }


  cancel() {
    this.dialogRef.close(false);
  }
}
