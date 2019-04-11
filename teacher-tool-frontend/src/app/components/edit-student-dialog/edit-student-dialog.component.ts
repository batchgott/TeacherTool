import { Component, OnInit } from '@angular/core';
import {Student} from '../../models/student';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../services/student.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss']
})
export class EditStudentDialogComponent implements OnInit {

  student:Student;
  class_id:number;
  studentForm:FormGroup;

  constructor(private studentService:StudentService,
              private dialogRef:MatDialogRef<EditStudentDialogComponent>) { }

  ngOnInit() {
    this.studentForm = new FormGroup({
      'firstName': new FormControl(this.student.firstname, [
        Validators.required]),
      'lastName':new FormControl(this.student.lastname,[
        Validators.required]),
    });
  }

  editStudent() {
    this.student.firstname=this.studentForm.get('firstName').value;
    this.student.lastname=this.studentForm.get('lastName').value;
    this.student.class_id=this.class_id;
    this.studentService.updateStudent(this.student);
    this.dialogRef.close(this.student);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
