import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {ClassService} from '../../services/class.service';
import {Class} from '../../models/class';
import {Subject} from '../../models/subject';
import {Student} from '../../models/student';
import {AssessmentService} from '../../services/assessment.service';
import {Assessment} from '../../models/assessment';
import {Observable} from 'rxjs';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {Performance} from '../../models/performance';
import {PerformanceService} from '../../services/performance.service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss'],
  providers:[AssessmentService]
})
export class MarkComponent implements OnInit {

  performanceForm:FormGroup;
  class:Class;
  subjects:Subject[];
  selectedSubject:Subject;
  markList:{student:Student,grade:number,points:number,attendant:boolean}[];
  students:Student[];
  withPoints:boolean;
  maxPoints:number;
  selectedAssessment:Assessment;
  assessments:Observable<Assessment[]>;
  date:Date;
  firstSemester:boolean;

  constructor(private route:ActivatedRoute,
              private classService:ClassService,
              private assessmentService:AssessmentService,
              private dialog:MatDialog,
              private router:Router,
              private performanceService:PerformanceService) {
    this.markList=[];
    this.withPoints=false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      let subject_id = +params['subjectid'];

      this.classService.classes.subscribe(classes => {
        if (classes.length == 0) {
          this.classService.loadAll();
          return;
        }
        this.class = this.classService.classById(id);
        if (this.class == undefined) {
          return;
        }
        this.subjects = this.class.subjects;
        this.selectedSubject = this.class.subjects.find(x => x.id == subject_id);
        if (this.selectedSubject != undefined) {
          if (this.markList.length == 0)
          this.selectedSubject.students.forEach(s=>this.markList.push({student:s,grade:3,points:null,attendant:true}));
          this.students = this.selectedSubject.students;
          this.assessments=this.assessmentService.allAssessments;
          this.assessmentService.loadAllAssessmentsOfSubject(this.selectedSubject.id);
        }
      });
    });
    this.date=new Date();
    let currentMonth=this.date.getMonth();
    this.firstSemester = !(currentMonth >= 1 && currentMonth < 8);
  }

  dateChanged() {
    let currentMonth=this.date.getMonth();
    this.firstSemester = !(currentMonth >= 1 && currentMonth < 8);
  }

  goBack() {
      let dialogRef=this.dialog.open(ConfirmationDialogComponent);
      dialogRef.componentInstance.message="Sind Sie sicher, dass Sie diesen Bereich verlassen wollen?";
      dialogRef.componentInstance.do="Verlassen";
      dialogRef.afterClosed().subscribe(result=>{
        if (result) {
          this.router.navigate(['/class',this.class.id,'subject',this.selectedSubject.id]);
        }
      });
  }

  createPerformances() {
    let performances:Performance[]=[];
    this.markList.forEach(m=>{
      if (m.attendant) {
        let performance:Performance=new Performance();
        performance.student_id=m.student.id;
        performance.subject_id=this.selectedSubject.id;
        performance.grade=m.grade;
        performance.date=this.date;
        performance.assessment_id=this.selectedAssessment.id;
        if (this.firstSemester)
          performance.semester="1";
        else
          performance.semester="2";
        if (this.withPoints) {
          performance.max_points=this.maxPoints;
          performance.points=m.points
        }else {
          performance.max_points=null;
          performance.points=null;
        }
        performances.push(performance);
      }
    });

    let dialogRef=this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.message="Sind Sie sicher, dass Sie "+performances.length+" Bewertungen eintragen wollen?";
    dialogRef.componentInstance.do="Ja";
    dialogRef.afterClosed().subscribe(result=>{
      if (result) {
        this.performanceService.addRangeOfPerformances(performances);
        this.router.navigate(['/class',this.class.id,'subject',this.selectedSubject.id]);

      }
    });
  }
}
