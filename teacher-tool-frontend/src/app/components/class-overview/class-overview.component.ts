import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from '../../services/class.service';
import {Class} from '../../models/class';
import get = Reflect.get;
import {SubjectService} from '../../services/subject.service';
import {Observable} from 'rxjs';
import {Subject} from '../../models/subject';
import {MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {AddSubjectDialogComponent} from '../add-subject-dialog/add-subject-dialog.component';

const SMALL_WIDTH_BREAKPOINT=720;
@Component({
  selector: 'app-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.scss']
})
export class ClassOverviewComponent implements OnInit {

  class:Class;
  subjects:Observable<Subject[]>;
  selectedSubject:Subject;
  private mediaMatcher:MediaQueryList=matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(private route:ActivatedRoute,
              private router:Router,
              private classService:ClassService,
              public subjectService:SubjectService,
              private dialog:MatDialog,
              private snackBar:MatSnackBar,
              private zone:NgZone) {
    this.selectedSubject=null;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }

  ngOnInit() {
    this.subjects=this.subjectService.subjects;
    this.route.params.subscribe(params=>{
      let id=+params['id'];
      let getFirst=false;
      if (!id) getFirst=true;

      let subject_id=+params['subjectid'];
      let getFirstSubject=false;
      if (!subject_id) getFirstSubject=true;

      this.subjectService.subjects.subscribe(subjects=>{
        if (subjects.length == 0){
          return;}
        if (getFirstSubject)
          this.selectedSubject=this.subjectService.subjectArrayById(0);
        else if (this.subjectService.subjectById(subject_id) != undefined)
          this.selectedSubject=this.subjectService.subjectById(subject_id);
      });

      this.classService.classes.subscribe(classes=>{
        if (classes.length == 0){
          this.classService.loadAll();
          return;}
        if (getFirst)
          this.class = this.classService.classArrayById(0);
        else
          this.class=this.classService.classById(id);
        this.subjectService.loadSubjectsOfClass(this.class.id);
      });
    })
  }

  openAddSubjectDialog() {
    let dialogRef= this.dialog.open(AddSubjectDialogComponent, {
      width: '450px'
    });
    dialogRef.componentInstance.class_id=this.class.id;
    dialogRef.afterClosed().subscribe(result=>{
      this.classService.loadAll();
      this.subjectService.loadSubjectsOfClass(this.class.id);
      if (result) {
        this.router.navigate(['/class',this.class.id,'subject',result.id]);
        this.openSnackBar("Das Fach "+result.name+" wurde der Klasse "+this.class.name+" hinzugefügt");
      }
    });
  }

  openSnackBar(message: string,):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,null,{duration:2000});
  }
}
