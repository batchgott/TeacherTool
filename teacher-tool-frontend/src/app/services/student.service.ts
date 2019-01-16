import { Injectable } from '@angular/core';
import {Student} from '../models/student';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Subject} from '../models/subject';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private dataStore:{students:Student[]};

  private _students:BehaviorSubject<Student[]>;

  private _fetched:boolean;

  constructor(private http:HttpClient) {
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

  loadStudentsOfClass(class_id:number, subject_id:number){
    return this.http.get<Student[]>(environment.apiURL+"/class/"+class_id+"/subject/"+subject_id+"/students").subscribe(
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
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }
}
