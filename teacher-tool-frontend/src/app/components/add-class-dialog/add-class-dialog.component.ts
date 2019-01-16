import { Component, OnInit } from '@angular/core';
import {Subject} from '../../models/subject';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Class} from '../../models/class';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-class-dialog',
  templateUrl: './add-class-dialog.component.html',
  styleUrls: ['./add-class-dialog.component.scss']
})
export class AddClassDialogComponent implements OnInit {

  class:Class;
  classForm:FormGroup;
  years:number[];
  selectedYear:number;

  constructor(private dialogRef:MatDialogRef<AddClassDialogComponent>) {
    this.years=[];
    this.selectedYear=new Date().getFullYear();
  }

  ngOnInit() {
    this.class=new Class();
    this.classForm = new FormGroup({
      'name': new FormControl(this.class.name, [
        Validators.required]),
      'level':new FormControl(this.class.level,[
        Validators.required]),
      'max-level':new FormControl(this.class.max_level,[
        Validators.required]),
      'schoolyear':new FormControl(this.class.schoolyear,[
        Validators.required])
    });
    this.classForm.get('schoolyear').setValue(new Date().getFullYear());
  }


  createClass() {

  }

  cancel() {
    this.dialogRef.close(null);
  }
}
