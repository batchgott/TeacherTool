import { Component, OnInit } from '@angular/core';
import {CompleteYearService} from '../../services/complete-year.service';
import {Class} from '../../models/class';
import {ClassService} from '../../services/class.service';
import {forEach} from '@angular/router/src/utils/collection';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from '../../models/subject';
import {Student} from '../../models/student';
import {YearCompleteClass} from '../../models/year-complete-Class';
import {StudentService} from '../../services/student.service';
import {SubjectService} from '../../services/subject.service';
import {SubjectAssessmentService} from '../../services/subject-assessment.service';
import {SubjectAssessments} from '../../models/subject-assessments';

@Component({
  selector: 'app-complete-year-edit-classes',
  templateUrl: './complete-year-edit-classes.component.html',
  styleUrls: ['./complete-year-edit-classes.component.scss']
})
export class CompleteYearEditClassesComponent implements OnInit {

  constructor(private completeYearService: CompleteYearService,
              private  classService: ClassService,
              private studentService:StudentService,
              private subjectService:SubjectService,
              private subjectAssementService:SubjectAssessmentService) { }

  isFinished: boolean=false;
  groupedbyLevel: {classes: Class[], level:number }[]=[];
  classes: YearCompleteClass[]=[];
  deleteStudents:{student:Student, attend:boolean}[]=[];
  deleteSubejects:{subject:Subject, attend:boolean}[]=[];
  ngOnInit() {
    this.groupedbyLevel=this.completeYearService.groupedbyLevel;
    for (let i=0; i<this.groupedbyLevel.length; i++)
    {
      for (let y=0; y<this.groupedbyLevel[i].classes.length; y++)
      {
        let students=[];
        if(this.groupedbyLevel[i].classes[y].subjects.length>0) {

          for (let x = 0; x < this.groupedbyLevel[i].classes[y].subjects[0].students.length; x++) {
            students.push({student: this.groupedbyLevel[i].classes[y].subjects[0].students[x], attend: true});
          }
        }
        let subjects=[];
        for (let x=0; x<this.groupedbyLevel[i].classes[y].subjects.length; x++)
        {
          subjects.push({subject :this.groupedbyLevel[i].classes[y].subjects[x],attend:true});
        }
        this.classes.push({id:this.groupedbyLevel[i].classes[y].id,
          name:this.groupedbyLevel[i].classes[y].name,
          newname: '',
          level:this.groupedbyLevel[i].level,
          max_level:this.groupedbyLevel[i].classes[y].max_level,
          schoolyear: this.groupedbyLevel[i].classes[y].schoolyear,
          archieved:this.groupedbyLevel[i].classes[y].archieved,
          subjects:subjects,
          students:students});
      }
    }
  }
  toogleSubject(subject:{subject:Subject, attend:boolean}, selectedClass:YearCompleteClass) {
    if(!subject.attend) {
      for (let i = 0; i < selectedClass.subjects.length; i++) {
        if (selectedClass.subjects[i].subject.id == subject.subject.id) {
          this.deleteSubejects.push(subject);
        }
      }
    }
    if(subject.attend)
    {
      for (let i = 0; i < this.deleteSubejects.length; i++) {
        if (this.deleteSubejects[i].subject.id == subject.subject.id) {
          this.deleteSubejects.splice(i, 1);

        }
      }
    }

  }
  toggleStudent(student:{student:Student, attend:boolean}, selectedClass:YearCompleteClass) {
    if(!student.attend) {
      for (let i = 0; i < selectedClass.students.length; i++) {
        if (selectedClass.students[i].student.id == student.student.id) {
          this.deleteStudents.push(student);
        }
      }
    }
    if(student.attend)
    {
      for (let i = 0; i < this.deleteStudents.length; i++) {
        if (this.deleteStudents[i].student.id == student.student.id) {
          this.deleteStudents.splice(i, 1);
        }
      }
    }
  }

  finishPrediacte()
  {

    for (let i=0; i<this.classes.length; i++)
    {

      if(this.classes[i].newname=='')
      {this.isFinished=false;
      break;}
    }
    this.isFinished=true;
  }

  finishYear()
  {
    let subjectAssessments:SubjectAssessments[]=[];
    this.subjectAssementService.subjectAssesments.subscribe(result=> {
      if (result.length == 0) {
        this.subjectAssementService.loadSubjectAssementsofSubject();
      }
      subjectAssessments=result;
    });

    let classesForArchive=[];
    this.classService.classes.subscribe(result=> {
      if (result.length == 0) {
        this.completeYearService.loadAll();
      }
      classesForArchive=result
    });

    for (let i=0; i<classesForArchive.length; i++)
    {
      classesForArchive[i].archieved=true;
      this.classService.editClass(classesForArchive[i]);
    }
    for (let i=0; i<this.classes.length; i++)
    {
      this.classes[i].schoolyear++;
      let subjects=[];
      for (let x=0; x<this.classes[i].subjects.length; x++)
      {
        subjects.push(this.classes[i].subjects[x]);
      }
      let currentClass={id:this.classes[i].id,
      name:this.classes[i].newname,
      level:this.classes[i].level,
      max_level:this.classes[i].max_level,
      schoolyear: this.classes[i].schoolyear,
      archieved:false,
      subjects:subjects
      };
      this.classService.addClass(currentClass).then((result:Class) => {


        for (let x=0; x<this.classes[i].subjects.length; x++)
        {
          if(this.classes[i].subjects[x].attend) {
            this.classes[i].subjects[x].subject.class_id = result.id;

            this.subjectService.addSubject(this.classes[i].subjects[x].subject).then(
              (result:Subject)=> {

                for(let y=0; y<subjectAssessments.length; y++)
                {
                  if(subjectAssessments[y].subject_id==this.classes[i].subjects[x].subject.id)
                  {
                    subjectAssessments[y].subject_id=result.id;
                    this.subjectAssementService.addSA(subjectAssessments[y])
                  }
                }
              }
            )
          }
        }
        for (let x=0; x<this.classes[i].students.length; x++)
        {
          if(this.classes[i].students[x].attend) {
            this.classes[i].students[x].student.class_id = result.id;
            this.studentService.addStudent(this.classes[i].students[x].student);
          }
        }

      });
    }

  }

}
