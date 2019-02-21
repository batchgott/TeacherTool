import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDrawer, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {Class} from '../../models/class';
import {ClassService} from '../../services/class.service';
import {SubjectService} from '../../services/subject.service';
import {AddStudentDialogComponent} from '../add-student-dialog/add-student-dialog.component';
import {AddClassDialogComponent} from '../add-class-dialog/add-class-dialog.component';
import {StudentService} from '../../services/student.service';
import {SettingsService} from '../../services/settings.service';

const SMALL_WIDTH_BREAKPOINT=768;
const PHONE_WIDTH_BREAKPOINT=426;
@Component({
  selector: 'app-classes-menu',
  templateUrl: './classes-menu.component.html',
  styleUrls: ['./classes-menu.component.scss']
})
export class ClassesMenuComponent implements OnInit {

  private mediaMatcher:MediaQueryList=matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  private phoneMediaMatcher:MediaQueryList=matchMedia(`(max-width: ${PHONE_WIDTH_BREAKPOINT}px)`);
  @ViewChild(MatDrawer) drawer:MatDrawer;
  classes:Observable<Class[]>;
  darkTheme_enabled:Observable<boolean>;

  constructor(zone:NgZone,
              private router:Router,
              private classService: ClassService,
              private activatedRoute:ActivatedRoute,
              public subjectService:SubjectService,
              public studentService:StudentService,
              private dialog:MatDialog,
              private snackBar:MatSnackBar,
              public settingsService:SettingsService) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
    this.phoneMediaMatcher.addListener(mql =>
      zone.run(() => this.phoneMediaMatcher = matchMedia(`(max-width: ${PHONE_WIDTH_BREAKPOINT}px)`)));
  }


  ngOnInit() {
    this.classes=this.classService.classes;
    this.classService.loadAll();
    this.router.events.subscribe(()=>{
      if (this.isScreenSmall())
        this.drawer.close();

    });
    this.settingsService.loadSettings();
    this.darkTheme_enabled=this.settingsService.dark_theme;
  }

  isScreenSmall():boolean {
    return this.mediaMatcher.matches;
  }
  isScreenPhone():boolean {
    return this.phoneMediaMatcher.matches;
  }

  openAddClassDialog() {
    let dialogRef= this.dialog.open(AddClassDialogComponent, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if (result) {
        this.classService.loadAll();
        this.router.navigate(['/class',result.id]);
        this.openSnackBar("Die Klasse "+result.name+" wurde hinzugefügt");
      }
    });
  }

  openSnackBar(message: string,):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,null,{duration:2000});
  }

}
