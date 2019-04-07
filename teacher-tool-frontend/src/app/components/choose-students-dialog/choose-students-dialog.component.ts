import { Component, OnInit } from '@angular/core';
import {Student} from '../../models/student';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ChooseSpecificStudentDialogComponent} from '../choose-specific-student-dialog/choose-specific-student-dialog.component';

@Component({
  selector: 'app-choose-students-dialog',
  templateUrl: './choose-students-dialog.component.html',
  styleUrls: ['./choose-students-dialog.component.scss']
})
export class ChooseStudentsDialogComponent implements OnInit {

  entryStudents:Student[];
  selectedStudents:Student[];
  checkedAll:boolean=true;
  selectedStudent:Student;

  constructor(private dialogRef:MatDialogRef<ChooseStudentsDialogComponent>,
              private dialog:MatDialog) {
    this.selectedStudent=null;
  }

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
    this.dialogRef.close({selectedStudents:this.selectedStudents,selectedStudent:this.selectedStudent});
  }


  openChooseSpecificStudentDialog() {
    let dialogRef=this.dialog.open(ChooseSpecificStudentDialogComponent,{
      width:"700px",
      disableClose: true
    });
    dialogRef.componentInstance.entryStudents=this.entryStudents;
    if (this.selectedStudent!=null)
      dialogRef.componentInstance.selectedStudent=this.selectedStudent;
    dialogRef.afterClosed().subscribe(result=>{
      if (result)
        this.selectedStudent=result;
      else
        this.selectedStudent=null;
    })
  }
}
