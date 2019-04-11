import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClassService} from '../../services/class.service';
import {Class} from '../../models/class';
import {Subject} from '../../models/subject';
import {SubjectService} from '../../services/subject.service';
import {Student} from '../../models/student';
import {AddStudentDialogComponent} from '../add-student-dialog/add-student-dialog.component';
import {MatDialog} from '@angular/material';
import {EditStudentDialogComponent} from '../edit-student-dialog/edit-student-dialog.component';
import {PerformanceService} from '../../services/performance.service';
import {Observable} from 'rxjs';
import {Performance} from '../../models/performance';

@Component({
  selector: 'app-student-overview',
  templateUrl: './student-overview.component.html',
  styleUrls: ['./student-overview.component.scss']
})
export class StudentOverviewComponent implements OnInit {

  class:Class;
  subject:Subject;
  student:Student;
  performances:Performance[];


  constructor(private route:ActivatedRoute,
              private classService:ClassService,
              private dialog:MatDialog,
              private performanceService:PerformanceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      let subject_id = +params['subjectid'];
      let student_id=+params['studentid'];

      this.classService.classes.subscribe(classes => {
        if (classes.length == 0) {
          this.classService.loadAll();
          return;
        }
        this.class = this.classService.classById(id);
        this.subject=this.class.subjects.find(x=>x.id==subject_id);
        this.student=this.subject.students.find(x=>x.id==student_id);
        this.performanceService.loadAll();
      });
    });
    this.performanceService.performances.subscribe(performances=>this.performances=performances.
    filter(x=>x.student_id==this.student.id&&x.subject_id==this.subject.id));
  }

  edit() {
    let dialogRef = this.dialog.open(EditStudentDialogComponent, {
      width: '260px'
    });
    dialogRef.componentInstance.student=this.student;
    dialogRef.componentInstance.class_id = this.class.id;
  }
}
