import {Component, OnInit} from '@angular/core';
import {Class} from '../../models/class';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {ClassService} from '../../services/class.service';

@Component({
  selector: 'app-edit-class-dialog',
  templateUrl: './edit-class-dialog.component.html',
  styleUrls: ['./edit-class-dialog.component.scss']
})
export class EditClassDialogComponent implements OnInit {

  class: Class;
  classForm: FormGroup;
  years: number[];
  selectedYear: number;

  constructor(private dialogRef: MatDialogRef<EditClassDialogComponent>,
              private classService: ClassService) {
    this.years = [];
  }

  ngOnInit() {
    this.defineYears();
    this.classForm = new FormGroup({
      'name': new FormControl(this.class.name, [
        Validators.required]),
      'level': new FormControl(this.class.level, [
        Validators.required]),
      'max-level': new FormControl(this.class.max_level, [
        Validators.required]),
      'schoolyear': new FormControl(this.class.schoolyear, [
        Validators.required])
    });
    this.classForm.get('name').setValue(this.class.name);
    this.classForm.get('level').setValue(this.class.level);
    this.classForm.get('max-level').setValue(this.class.max_level);
    this.classForm.get('schoolyear').setValue(this.class.schoolyear);
    console.log(this.class.name);
  }

  defineYears() {
    this.selectedYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    if (currentMonth < 9) {
      this.selectedYear--;
    }
    for (let i = this.selectedYear - 20; i <= this.selectedYear + 3; i++) {
      this.years.push(i);
    }
  }

  editClass() {
    this.class.name = this.classForm.get('name').value;
    this.class.level = this.classForm.get('level').value;
    this.class.max_level = this.classForm.get('max-level').value;
    this.class.schoolyear = this.classForm.get('schoolyear').value;
    this.classService.editClass(this.class);
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(null);
  }

}
