import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {generate} from 'rxjs';
import {stringDistance} from 'codelyzer/util/utils';
import {Subject} from '../../models/subject';
import {MatDialogRef} from '@angular/material';
import {SubjectService} from '../../services/subject.service';

@Component({
  selector: 'app-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.scss']
})
export class AddSubjectDialogComponent implements OnInit {

  class_id:number;
  subject:Subject;
  subjectForm:FormGroup;

  constructor(private dialogRef:MatDialogRef<AddSubjectDialogComponent>,
              private subjectService:SubjectService) {  }

  ngOnInit() {
    this.subject=new Subject();
    this.subjectForm = new FormGroup({
      'name': new FormControl(this.subject.name, [
        Validators.required])
    });
  }

  createSubject() {
    this.subject.class_id=this.class_id;
    this.subject.name=this.subjectForm.get('name').value;
    this.subjectService.addSubject(this.subject).then(subject=>{
      this.dialogRef.close(subject);
      }
    );
  }


  cancel() {
    this.dialogRef.close(null);
  }
}
