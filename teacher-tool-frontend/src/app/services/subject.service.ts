import {Injectable} from '@angular/core';
import {Subject} from '../models/subject';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ClassService} from './class.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private dataStore:{subjects: Subject[]};

  private _subjects: BehaviorSubject<Subject[]>;


  constructor(private http:HttpClient,
              private classService:ClassService) {
    this.dataStore={subjects:[]};
    this._subjects=new BehaviorSubject<Subject[]>([]);
  }

  get subjects():Observable<Subject[]>{
    return this._subjects.asObservable();
  }

  subjectById(id:number):Subject{
    return this.dataStore.subjects.find(x=>x.id==id);
  }

  loadSubjectsOfClass(class_id:number){
    return this.http.get<Subject[]>(environment.apiURL+"/class/"+class_id+"/subjects").subscribe(
      data=>{
        //this.dataStore.subjects=data;
        //this._subjects.next(Object.assign({},this.dataStore).subjects);
      },
      error=>{
        console.log("Failed to fetch classes")
      }
    );
  }


  subjectArrayById(index: number):Subject {
    return this.dataStore.subjects[index];
  }

  loadSubjectsOfClassPromise(class_id:number){
    return new Promise((resolve, reject) => {
      this.http.get<Subject[]>(environment.apiURL+"/class/"+class_id+"/subjects")
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

  addSubject(subject: Subject){
    return new Promise((resolve, reject) => {
      this.http.post<Subject>(environment.apiURL + "/subject", subject)
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

  deleteSubject(id: number) {
    return this.http.delete(environment.apiURL+"/subject/"+id).subscribe(
      data=>{this.classService.loadAll()},
      error=>{
        console.log("Failed to delete subject")
      }
    );
  }
  updateSubject(subject:Subject) {
    return this.http.put(environment.apiURL+"/subject/",subject).subscribe(
      data=>{this.classService.loadAll()},
      error=>{
        console.log("Failed to delete class")
      }
    );
  }
}
