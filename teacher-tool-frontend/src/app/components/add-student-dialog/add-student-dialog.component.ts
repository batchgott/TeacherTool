import { Component, OnInit } from '@angular/core';
import {Student} from '../../models/student';
import {StudentService} from '../../services/student.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss']
})
export class AddStudentDialogComponent implements OnInit {

  student:Student;
  class_id:number;
  studentForm:FormGroup;

  constructor(private studentService:StudentService,
              private dialogRef:MatDialogRef<AddStudentDialogComponent>) { }

  ngOnInit() {
    this.student=new Student();
    this.studentForm = new FormGroup({
      'firstName': new FormControl(this.student.firstname, [
        Validators.required]),
      'lastName':new FormControl(this.student.lastname,[
        Validators.required]),
    });
  }

  createStudent() {
    this.student.firstname=this.studentForm.get('firstName').value;
    this.student.lastname=this.studentForm.get('lastName').value;
    this.student.class_id=this.class_id;
    this.studentService.addStudent(this.student).then(student=>
    this.dialogRef.close(student)
    );
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
