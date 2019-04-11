import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../models/student';
import {Class} from '../../models/class';
import {Subject} from '../../models/subject';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Performance} from '../../models/performance';
import {Assessment} from '../../models/assessment';
import {Observable} from 'rxjs';
import {MatDialogRef, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {AssessmentService} from '../../services/assessment.service';
import {PerformanceService} from '../../services/performance.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-performance-dialog',
  templateUrl: './add-performance-dialog.component.html',
  styleUrls: ['./add-performance-dialog.component.scss'],
  providers:[AssessmentService]
})
export class AddPerformanceDialogComponent implements OnInit {

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
              private snackbar:MatSnackBar,
              private router:Router,
              private dialogRef:MatDialogRef<AddPerformanceDialogComponent>) { }

  ngOnInit() {
    this.assessments=this.assessmentService.allAssessments;
    this.selectedAssessment=null;
    this.assessmentService.loadAllAssessmentsOfSubject(this.subject.id);
    this.grade=3;
    this.date=new Date();
    this.performance=new Performance();
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
    this.performanceService.addPerformance(this.performance);
    this.openSnackBar("Für den Schüler "+this.student.firstname+" "+this.student.lastname+
      " wurde die Bewertung '"+this.selectedAssessment.name+"' mit der Note "+this.grade+" eingetragen");
    this.dialogRef.close(true);
  }

  openSnackBar(message: string,): MatSnackBarRef<SimpleSnackBar> {
    return this.snackbar.open(message, null, {duration: 5000});
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
