import { Component, OnInit } from '@angular/core';
import {Subject} from '../../models/subject';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Class} from '../../models/class';
import {MatDialogRef} from '@angular/material';
import {ClassService} from '../../services/class.service';

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

  constructor(private dialogRef:MatDialogRef<AddClassDialogComponent>,
              private classService:ClassService) {
    this.years=[];
  }

  ngOnInit() {
    this.class=new Class();
    this.defineYears();
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
    this.classForm.get('schoolyear').setValue(this.selectedYear);
  }

  defineYears(){
    this.selectedYear=new Date().getFullYear();
    let currentMonth=new Date().getMonth();
    if (currentMonth < 9)
      this.selectedYear--;
    for (let i = this.selectedYear - 20; i <= this.selectedYear + 3; i++)
      this.years.push(i);
  }

  createClass() {
    this.class.name=this.classForm.get('name').value;
    this.class.level=this.classForm.get('level').value;
    this.class.max_level=this.classForm.get('max-level').value;
    this.class.schoolyear=this.classForm.get('schoolyear').value;
    this.classService.addClass(this.class).then(item=>{
      this.dialogRef.close(item)
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
