import {Component, NgZone, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Class} from '../../models/class';
import {ClassService} from '../../services/class.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from '../../models/subject';
import {Student} from '../../models/student';
import {AddStudentDialogComponent} from '../add-student-dialog/add-student-dialog.component';
import {MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 426;

@Component({
  selector: 'app-subject-overview',
  templateUrl: './subject-overview.component.html',
  styleUrls: ['./subject-overview.component.scss']
})
export class SubjectOverviewComponent implements OnInit {

  classes: Observable<Class[]>;
  class: Class;
  subjects: Subject[];
  selectedSubject: Subject;
  students: Student[];
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(private classService: ClassService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
              zone: NgZone) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }

  ngOnInit() {
    this.classes = this.classService.classes;
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
          this.students = this.selectedSubject.students;
        }
      });
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  openAddStudentDialog() {
    let dialogRef = this.dialog.open(AddStudentDialogComponent, {
      width: '250px'
    });
    dialogRef.componentInstance.class_id = this.class.id;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar('Das Schüler ' + result.firstname + ' ' + result.lastname + ' wurde hinzugefügt');
      }
    });
  }

  openSnackBar(message: string,): MatSnackBarRef<SimpleSnackBar> {
    return this.snackbar.open(message, null, {duration: 2000});
  }

}
