import { Component, OnInit } from '@angular/core';
import {Student} from '../../models/student';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-choose-students-dialog',
  templateUrl: './choose-students-dialog.component.html',
  styleUrls: ['./choose-students-dialog.component.scss']
})
export class ChooseStudentsDialogComponent implements OnInit {

  entryStudents:Student[];
  selectedStudents:Student[];
  checkedAll:boolean=true;

  constructor(private dialogRef:MatDialogRef<ChooseStudentsDialogComponent>) { }

  ngOnInit() {
    this.selectedStudents=this.entryStudents.slice();
  }

  cancel() {
    this.dialogRef.close(false);
  }

  checkAll(){
    if (this.selectedStudents.length != this.entryStudents.length)
      this.selectedStudents=this.entryStudents.slice();
    else
      this.selectedStudents=[];
    this.checkedAll=!this.checkedAll;
  }

  submit() {
    this.dialogRef.close(this.selectedStudents);
  }
}
