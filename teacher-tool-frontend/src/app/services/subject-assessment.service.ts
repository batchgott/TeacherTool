import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Class} from '../models/class';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {SubjectAssessments} from '../models/subject-assessments';
import {Subject} from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectAssessmentService {

  private _subjectAssessments:BehaviorSubject<SubjectAssessments[]>;


  private dataStore:{
    subjectAssesments:SubjectAssessments[]
  };

  get subjectAssesments():Observable<SubjectAssessments[]>{
    return this._subjectAssessments.asObservable();
  }

  constructor(private http:HttpClient) {
    this.dataStore={subjectAssesments:[]};
    this._subjectAssessments=new BehaviorSubject<SubjectAssessments[]>([]);
  }

  loadSubjectAssementsofSubject(){
    return this.http.get<SubjectAssessments[]>(environment.apiURL+"/subjects_assessments").subscribe(
      data=>{
        this.dataStore.subjectAssesments=data;
        this._subjectAssessments.next(Object.assign({},this.dataStore).subjectAssesments);
      },
      error=>{
        console.log("Failed to fetch classes")
      }
    );
  }


  addSA(sa: SubjectAssessments){
    return new Promise((resolve, reject) => {
      this.http.post<Subject>(environment.apiURL + "/subjects_assessments", sa)
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
