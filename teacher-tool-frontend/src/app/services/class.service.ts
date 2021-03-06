import { Injectable } from '@angular/core';
import {Class} from '../models/class';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from '../models/subject';
import {CompleteYearService} from './complete-year.service';


@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private _classes:BehaviorSubject<Class[]>;

  private dataStore:{
    classes:Class[]
  };

  constructor(private http:HttpClient,
              private completeYearService:CompleteYearService) {
    this.dataStore={classes:[]};
    this._classes=new BehaviorSubject<Class[]>([]);
  }

  get classes():Observable<Class[]>{
    return this._classes.asObservable();
  }

  classById(id:number):Class{
    return this.dataStore.classes.find(x=>x.id==id);
  }

  loadAll(){
    return this.http.get<Class[]>(environment.apiURL+"/classes?grade").subscribe(
      data=>{
        this.dataStore.classes=data;
        this._classes.next(Object.assign({},this.dataStore).classes);
      },
      error=>{
        console.log("Failed to fetch classes")
      }
    );
  }

  loadAllwithPromise(){
    return new Promise((resolve, reject) => {
      this.http.get<Class[]>(environment.apiURL+"/classes?grade")
        .toPromise()
        .then(
          res => {
            this.dataStore.classes=res;
            this._classes.next(Object.assign({},this.dataStore).classes);
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  classArrayById(index: number):Class {
    return this.dataStore.classes[index];
  }

  addClass(classObject: Class){
    return new Promise((resolve, reject) => {
      this.http.post<Class>(environment.apiURL + "/class", classObject)
        .toPromise()
        .then(
          res => {
            this.completeYearService.loadAll();
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  deleteClass(id: number) {
    return this.http.delete(environment.apiURL+"/class/"+id).subscribe(
      data=>{this.loadAll()},
      error=>{
        console.log("Failed to delete class")
      }
    );
  }

  editClass(class_item:Class){
    return this.http.put(environment.apiURL+"/class",class_item).subscribe(
      data=>{this.loadAll()},
      error=>{
        console.log("Failed to edit class")
      }
    );
  }

}
