import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Student} from './student';
import {HttpClient} from '@angular/common/http';
import {environment} from '../shared/environment';

@Injectable({
  providedIn: 'root'
})
export class RandomStudentService {
  studentObservable:Observable<Student[]>;


  constructor(private http: HttpClient) {
    this.studentObservable = this.http
      .get<Student[]>(environment.apiURL+"/api/students");
  }

  getStudents(){
    return this.http.get<Student[]>(environment.apiURL+"/api/students");
  }

}
