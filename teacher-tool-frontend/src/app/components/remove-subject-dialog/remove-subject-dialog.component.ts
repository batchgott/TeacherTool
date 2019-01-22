import { Component, OnInit } from '@angular/core';
import {Class} from '../../models/class';
import {Subject} from '../../models/subject';
import {MatDialog, MatDialogRef} from '@angular/material';
import {SubjectService} from '../../services/subject.service';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog.component';

@Component({
  selector: 'app-remove-subject-dialog',
  templateUrl: './remove-subject-dialog.component.html',
  styleUrls: ['./remove-subject-dialog.component.scss']
})
export class RemoveSubjectDialogComponent implements OnInit {

  class:Class;
  selectedSubject:Subject;

  constructor(private subjectService:SubjectService,
              private dialog:MatDialog,
              private dialogRef:MatDialogRef<RemoveSubjectDialogComponent>) { }

  ngOnInit() {
  }

  removeSubject() {
    let dialogRef=this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.message="Sind Sie sicher, dass Sie das Fach "+this.selectedSubject.name+" löschen wollen?";
    dialogRef.afterClosed().subscribe(result=>{
      if (result) {
        this.subjectService.deleteSubject(this.selectedSubject.id);
        this.dialogRef.close(true);
      }
    })
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
