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
  all;
  fileChanged(event) {
    this.file = event.target.files[0];
    this.uploadDocument(this.file)
  }

  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.datas=fileReader.result;
      this.splitted=this.datas.split(";",19);
      this.all=this.datas.split(";");
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
    for (let i=0; i<this.all.length; i++)
    {
      if(this.all[i]==this.firstnameValue)
      {positionFirst=i;}
      if(this.all[i]==this.lastnameValue)
      {postionLast=i;}
    }
    let students:{firstname, lastname, class_id}[]=[];
    let firstName=null;
    let lastName=null;
    let count=1;

    for (let i=0; i<this.all.length; i++) {
      if(i==positionFirst+count*20)
      {
        firstName=this.all[i];
        if(lastName!=null)
        {
          students.push({firstname: firstName, lastname: lastName, class_id: classwithId.id});
          count++;
          firstName=null;
          lastName=null;
          console.log(students);
        }
      }
      if(i==postionLast+count*20)
      {
        lastName= this.all[i];
        if(firstName!=null)
        {
          students.push({firstname: firstName, lastname: lastName, class_id: classwithId.id});
          count++;
          firstName=null;
          lastName=null;
          console.log(students);
        }
      }
    }
    for(let i=0; i<students.length; i++)
    {
      let student:Student=new Student();
      student.firstname=students[i].firstname;
      student.lastname=students[i].lastname;
      student.class_id=students[i].class_id;
      console.log(student);
      this.studentService.addStudent(student);
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }

}
