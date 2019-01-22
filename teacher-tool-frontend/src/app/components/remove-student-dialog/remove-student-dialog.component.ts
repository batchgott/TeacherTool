import { Component, OnInit } from '@angular/core';
import {Class} from '../../models/class';
import {Student} from '../../models/student';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog.component';
import {StudentService} from '../../services/student.service';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-remove-student-dialog',
  templateUrl: './remove-student-dialog.component.html',
  styleUrls: ['./remove-student-dialog.component.scss']
})
export class RemoveStudentDialogComponent implements OnInit {

  class:Class;
  selectedStudent:Student;

  constructor(private studentService:StudentService,
              private dialog:MatDialog,
              private dialogRef:MatDialogRef<RemoveStudentDialogComponent>) { }

  ngOnInit() {
  }

  removeStudent() {
    let dialogRef=this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.message="Sind Sie sicher, dass Sie den Schüler "+this.selectedStudent.firstname+" "+this.selectedStudent.lastname+" löschen wollen?";
    dialogRef.afterClosed().subscribe(result=>{
      if (result) {
        this.studentService.deleteStudent(this.selectedStudent.id);
        this.dialogRef.close(true);
      }
    })
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
