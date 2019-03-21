import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDragEnter,CdkDragExit} from '@angular/cdk/drag-drop';
import {Class} from '../../models/class';
import {AddClassDialogComponent} from '../add-class-dialog/add-class-dialog.component';
import {ClassService} from '../../services/class.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Student} from '../../models/student';
import {StudentService} from '../../services/student.service';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-class-upload',
  templateUrl: './class-upload.component.html',
  styleUrls: ['./class-upload.component.scss']
})
export class ClassUploadComponent implements OnInit {


  file:any;
  datas:string;
  splitted;
  lines: string[];
  fileChanged(event) {
    this.file = event.target.files[0];
    this.uploadDocument(this.file)
  }

  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.datas=fileReader.result;
      this.lines=this.datas.split("\n");
      this.splitted=this.lines[0].split(";");
    };
    fileReader.readAsText(this.file);
  }


  firstnameValue:string='';
  lastnameValue:string='';
  firstname=[];
  static firstNameLenght: number=0;

  static lastNameLength:number=0;

  lastName=[];

  allowAddFirstName() {
    if(ClassUploadComponent.firstNameLenght<1)
    {
      return true
    }
    return false
  }

  FirstNameEntered(event: CdkDragEnter) {

    ClassUploadComponent.firstNameLenght++;
    this.firstnameValue=event.item.data;
  }

  FirstNameRemoved(event: CdkDragExit) {
    ClassUploadComponent.firstNameLenght--;
    this.firstnameValue='';
  }


  allowAddLastName() {
    if(ClassUploadComponent.lastNameLength<1)
    {
      return true
    }
  }
  LastNameEntered(event: CdkDragEnter) {

    ClassUploadComponent.lastNameLength++;
    this.lastnameValue=event.item.data;
  }

  LastNameRemoved(event: CdkDragExit) {
    ClassUploadComponent.lastNameLength--;
    this.lastnameValue='';
  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  class:Class;
  classForId={};
  classForm:FormGroup;
  years:number[];
  selectedYear:number;

  constructor(private dialogRef:MatDialogRef<AddClassDialogComponent>,
              private classService:ClassService,
              private  studentService:StudentService) {
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
    this.classService.addClass(this.class).then(result =>
      (
    this.classForId=result,
      this.createStudent(this.classForId)));
    this.dialogRef.close();
  }

  createStudent(classwithId) {
    let positionFirst;
    let postionLast;
    let firstline=this.lines[0].split(";");
    for (let i=0; i<firstline.length; i++)
    {
      if(firstline[i]==this.firstnameValue)
      {positionFirst=i;}
      if(firstline[i]==this.lastnameValue)
      {postionLast=i;}
    }
    for (let i=1; i<this.lines.length-1; i++) {
      let student:Student=new Student();
      let currentLine=this.lines[i].split(";");
      student.firstname= currentLine[positionFirst];
      student.lastname= currentLine[postionLast];
      student.class_id= classwithId.id;
      this.studentService.addStudent(student);
      console.log(student);
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }

}
