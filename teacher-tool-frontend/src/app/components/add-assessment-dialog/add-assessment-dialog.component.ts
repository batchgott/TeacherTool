import { Component, OnInit } from '@angular/core';
import {Assessment} from '../../models/assessment';
import {Subject} from '../../models/subject';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-assessment-dialog',
  templateUrl: './add-assessment-dialog.component.html',
  styleUrls: ['./add-assessment-dialog.component.scss']
})
export class AddAssessmentDialogComponent implements OnInit {

  assessment:Assessment;
  subject:Subject;
  assessmentForm:FormGroup;
  type:string;

  constructor(private dialogRef:MatDialogRef<AddAssessmentDialogComponent>) {
    this.type="n";
    this.assessment=new Assessment();
  }

  ngOnInit() {
    this.assessmentForm = new FormGroup({
      'name': new FormControl(this.assessment.name, [
        Validators.required]),
      'scale_factor':new FormControl(this.assessment.scale_factor,[
        Validators.required]),
    });
  }

  createAssessment() {
    this.assessment.name=this.assessmentForm.get('name').value;
    this.assessment.scale_factor=this.assessmentForm.get('scale_factor').value;
    this.assessment.type=this.type;
    this.assessment.subject_id=this.subject.id;
    this.dialogRef.close(this.assessment);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
