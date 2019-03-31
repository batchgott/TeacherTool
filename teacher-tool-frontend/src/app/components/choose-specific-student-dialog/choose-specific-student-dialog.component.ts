import { Component, OnInit } from '@angular/core';
import {Student} from '../../models/student';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-choose-specific-student-dialog',
  templateUrl: './choose-specific-student-dialog.component.html',
  styleUrls: ['./choose-specific-student-dialog.component.scss']
})
export class ChooseSpecificStudentDialogComponent implements OnInit {

  entryStudents:Student[];
  selectedStudent:Student;

  constructor(private dialogRef:MatDialogRef<ChooseSpecificStudentDialogComponent>) {
    this.selectedStudent=null;
  }

  ngOnInit() {
  }

  submit() {
    this.dialogRef.close(this.selectedStudent);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
