import { Injectable } from '@angular/core';
import {Student} from '../models/student';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Subject} from '../models/subject';
import {environment} from '../../environments/environment';
import {ClassService} from './class.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private dataStore:{students:Student[]};

  private _students:BehaviorSubject<Student[]>;

  private _fetched:boolean;

  constructor(private http:HttpClient,
              private classService:ClassService) {
    this.dataStore={students:[]};
    this._students=new BehaviorSubject<Student[]>([]);
    this._fetched=false;
  }

  get fetched():boolean{return this._fetched}

  get students():Observable<Student[]>{
    return this._students.asObservable();
  }

  studentById(id:number):Student{
    return this.dataStore.students.find(x=>x.id==id);
  }

  loadStudentsOfSubject(subject_id:number){
    return this.http.get<Student[]>(environment.apiURL+"/subject/"+subject_id+"/students").subscribe(
      data=>{
        this.dataStore.students=data;
        this._students.next(Object.assign({},this.dataStore).students);
        this._fetched=true;
      },
      error=>{
        console.log("Failed to fetch students")
      }
    );
  }

  addStudent(student: Student){
    return new Promise((resolve, reject) => {
      this.http.post<Student>(environment.apiURL + "/student", student)
        .toPromise()
        .then(
          res => {
            this.classService.loadAll();
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  addStudents(students: Student[])
  {
    return new Promise((resolve, reject) => {
      this.http.post<Student[]>(environment.apiURL + "/students", students)
        .toPromise()
        .then(
          res => {
            this.classService.loadAll();
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  deleteStudent(id: number) {
    return this.http.delete(environment.apiURL+"/student/"+id).subscribe(
      data=>{this.classService.loadAll()},
      error=>{
        console.log("Failed to delete class")
      }
    );
  }
  updateStudent(student:Student) {
    return this.http.put(environment.apiURL+"/student/",student).subscribe(
      data=>{},
      error=>{
        console.log("Failed to delete class")
      }
    );
  }
}
