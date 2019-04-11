import { Component, OnInit } from '@angular/core';
import {Subject} from '../../models/subject';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {SubjectService} from '../../services/subject.service';

@Component({
  selector: 'app-edit-subject-dialog',
  templateUrl: './edit-subject-dialog.component.html',
  styleUrls: ['./edit-subject-dialog.component.scss']
})
export class EditSubjectDialogComponent implements OnInit {

  class_id:number;
  subject:Subject;
  subjectForm:FormGroup;

  constructor(private dialogRef:MatDialogRef<EditSubjectDialogComponent>,
              private subjectService:SubjectService) {  }

  ngOnInit() {
    this.subjectForm = new FormGroup({
      'name': new FormControl(this.subject.name, [
        Validators.required])
    });
  }

  createSubject() {
    this.subject.class_id=this.class_id;
    this.subject.name=this.subjectForm.get('name').value;
    this.subjectService.updateSubject(this.subject);
    this.dialogRef.close(this.subject);
  }


  cancel() {
    this.dialogRef.close(null);
  }
}
