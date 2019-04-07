import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Performance} from '../../models/performance';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {Assessment} from '../../models/assessment';
import {AssessmentService} from '../../services/assessment.service';
import {Observable} from 'rxjs';
import {Subject} from '../../models/subject';
import {Student} from '../../models/student';
import {PerformanceService} from '../../services/performance.service';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Class} from '../../models/class';

@Component({
  selector: 'app-add-performance',
  templateUrl: './add-performance.component.html',
  styleUrls: ['./add-performance.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(1200 )
      ]),
      transition(':leave',
        animate(1200, style({opacity: 0})))
    ])
  ],
  providers:[AssessmentService]
})
export class AddPerformanceComponent implements OnInit {

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
  @Input() subject:Subject;
  @Input() student:Student;
  @Input() class:Class;

  constructor(private assessmentService:AssessmentService,
              private performanceService:PerformanceService,
              private snackbar:MatSnackBar,
              private router:Router) { }

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
    this.router.navigate(["/class",this.class.id,'subject',this.subject.id]);
  }

  openSnackBar(message: string,): MatSnackBarRef<SimpleSnackBar> {
    return this.snackbar.open(message, null, {duration: 5000});
  }

  cancel() {
    this.router.navigate(["/class",this.class.id,'subject',this.subject.id]);
  }
}
