import {AfterContentInit, Component, DoCheck, NgZone, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from '../../services/class.service';
import {Class} from '../../models/class';
import get = Reflect.get;
import {SubjectService} from '../../services/subject.service';
import {Observable} from 'rxjs';
import {Subject} from '../../models/subject';
import {MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {AddSubjectDialogComponent} from '../add-subject-dialog/add-subject-dialog.component';
import {StudentService} from '../../services/student.service';
import {Student} from '../../models/student';
import {AddStudentDialogComponent} from '../add-student-dialog/add-student-dialog.component';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog.component';
import {RemoveSubjectDialogComponent} from '../remove-subject-dialog/remove-subject-dialog.component';
import {RemoveStudentDialogComponent} from '../remove-student-dialog/remove-student-dialog.component';
import {EditClassDialogComponent} from '../edit-class-dialog/edit-class-dialog.component';

const SMALL_WIDTH_BREAKPOINT=426;
@Component({
  selector: 'app-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.scss']
})
export class ClassOverviewComponent implements OnInit,OnDestroy {

  class:Class;
  subjects:Subject[];
  classes:Observable<Class[]>;
  students:Student[];
  selectedSubject:Subject;
  private mediaMatcher:MediaQueryList=matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(private route:ActivatedRoute,
              private router:Router,
              private classService:ClassService,
              public studentService:StudentService,
              private dialog:MatDialog,
              private snackBar:MatSnackBar,
              private zone:NgZone) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }

  ngOnInit() {
    this.classes=this.classService.classes;
    this.route.params.subscribe(params=>{
      let id=+params['id'];
      let getFirst=false;
      if (!id) getFirst=true;

      let subject_id=+params['subjectid'];
      let getFirstSubject=false;
      if (!subject_id) getFirstSubject=true;


      this.classService.classes.subscribe(classes=>{
        if (classes.length == 0){
          this.classService.loadAll();
          return;}
        if (getFirst)
          this.class = this.classService.classArrayById(0);
        else
          this.class=this.classService.classById(id);
        if (this.class == undefined)return;
        this.subjects=this.class.subjects;
        if (getFirstSubject) {
          this.selectedSubject = this.class.subjects[0];
          if (this.selectedSubject!=undefined)
          this.router.navigate(['/class',this.class.id,'subject',this.selectedSubject.id]);
        }
        else
        this.selectedSubject=this.class.subjects.find(x=>x.id==subject_id);
        if (this.selectedSubject != undefined)
        this.students=this.selectedSubject.students;
      });
    })
  }

  openAddSubjectDialog() {
    let dialogRef= this.dialog.open(AddSubjectDialogComponent, {
      width: '250px'
    });
    dialogRef.componentInstance.class_id=this.class.id;
    dialogRef.afterClosed().subscribe(result=>{
      if (result) {
        this.classService.loadAll();
        this.router.navigate(['/class',this.class.id,'subject',result.id]);
        this.openSnackBar("Das Fach "+result.name+" wurde hinzugefügt");
      }
    });
  }

  openSnackBar(message: string,):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,null,{duration:2000});
  }

  isScreenSmall():boolean {
    return this.mediaMatcher.matches;
  }

  ngOnDestroy(): void {
  }

  deleteClass() {
    let dialogRef=this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.message="Sind Sie sicher, dass Sie die Klasse "+this.class.name+" löschen wollen?";
    dialogRef.afterClosed().subscribe(result=>{
      if (result) {
        this.classService.deleteClass(this.class.id);
        this.router.navigate(['/class']);
      }
    })
  }

  deleteSubject() {
    let dialogRef= this.dialog.open(RemoveSubjectDialogComponent, {
      width: '250px'
    });
    dialogRef.componentInstance.class=this.class;
    dialogRef.afterClosed().subscribe(result=>{
      if (result) {
        if (this.selectedSubject == undefined)
          this.selectedSubject=this.class.subjects[0];
      }
    });
  }

  deleteStudent() {
    let dialogRef= this.dialog.open(RemoveStudentDialogComponent, {
      width: '250px'
    });
    dialogRef.componentInstance.class=this.class;
    dialogRef.afterClosed();
  }

  editClass() {
    let dialogRef= this.dialog.open(EditClassDialogComponent, {
      width: '700px'
    });
    dialogRef.componentInstance.class=this.class;
    dialogRef.afterClosed().subscribe(result=>{
      if (result) {
        if (this.selectedSubject == undefined)
          this.selectedSubject=this.class.subjects[0];
      }
    });
  }
}
