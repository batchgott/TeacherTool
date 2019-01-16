import { Component, OnInit } from '@angular/core';
import {Student} from '../../models/student';
import {StudentService} from '../../services/student.service';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss']
})
export class AddStudentDialogComponent implements OnInit {

  student:Student;
  class_id:number;

  constructor(private studentService:StudentService) { }

  ngOnInit() {
    this.student=new Student();
  }

}
