import {AfterViewChecked, ApplicationRef, Component, OnChanges, OnInit} from '@angular/core';
import {ClassService} from '../../services/class.service';
import {Observable, timer} from 'rxjs';
import {Class} from '../../models/class';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from '../../models/subject';
import {StudentService} from '../../services/student.service';
import {Student} from '../../models/student';
import {animate, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ChooseStudentsDialogComponent} from '../choose-students-dialog/choose-students-dialog.component';

@Component({
  selector: 'app-student-randomizer',
  template: `
    <div *ngIf="selectedStudents">
    <div *ngFor="let student of selectedStudents|shuffle">
      <mat-card [@student]>{{student?.firstname}} {{student?.lastname}}</mat-card>
    </div></div>`,
  styles: [`mat-card {
    margin-bottom: 5px;
  }`],
  animations: [
    trigger('student', [
      transition('void => *', [
        style({transform: 'scale(0.5)', opacity: 0}),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({transform: 'scale(1)', opacity: 1}))
      ]),
      transition('* => void', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px'}))
      ]),
    ])
  ]
})
export class StudentRandomizerComponent implements OnInit {

  classes: Observable<Class[]>;
  class: Class;
  selectedSubject: Subject;
  students: Student[];
  selectedStudents: Student[]=[];
  selectedStudent: Student;
  interval;
  studentsSelected:boolean=false;
  choosenStudent:Student;

  constructor(private classService: ClassService,
              private route: ActivatedRoute,
              private router:Router,
              private applicationRef:ApplicationRef,
              private dialog:MatDialog) {
    this.selectedStudent = null;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.classes = this.classService.classes;
    this.route.params.subscribe(params => {
      let class_id = +params['id'];
      let subject_id = +params['subjectid'];


      this.classService.classes.subscribe(classes => {
        if (classes.length == 0) {
          this.classService.loadAll();
          return;
        }
        this.class = this.classService.classById(class_id);
        if (this.class == undefined) {
          return;
        }
        this.selectedSubject = this.class.subjects.find(x => x.id == subject_id);
        if (this.selectedSubject != undefined) {
          this.students = this.selectedSubject.students;
          if (!this.studentsSelected) {
            setTimeout(()=>{
              this.studentsSelected=true;
              let dialogRef=this.dialog.open(ChooseStudentsDialogComponent,{
                width:"700px"
              });
              dialogRef.componentInstance.entryStudents=this.students.slice();
              dialogRef.afterClosed().subscribe(result=>{
                if (result) {
                  this.selectedStudents=result.selectedStudents.slice();
                  this.choosenStudent=result.selectedStudent;
                  this.startSelection();
                }
                else

                  this.router.navigate(["/class",this.class.id,'subject',this.selectedSubject.id]);
              });
            });
            }
        }
      });
    });
  }

  startSelection() {
    this.interval=setInterval(() => {
        if (this.selectedStudents.length !=1) {
          let randomValue:number=Math.floor(Math.random() * (this.selectedStudents.length-1));
          if (this.choosenStudent != null)
          if (this.selectedStudents[randomValue].id == this.choosenStudent.id){
            ((this.selectedStudents.length-1-randomValue)>randomValue)?randomValue++:randomValue--;
            // (randomValue==this.selectedStudents.length-1)?randomValue--:randomValue++;
          }
          this.selectedStudents.splice(randomValue, 1);
        }
        else {
          this.selectedStudent=this.selectedStudents[0];
          clearInterval(this.interval);
        }
      this.applicationRef.tick();
    }, 1000)
  }





}
