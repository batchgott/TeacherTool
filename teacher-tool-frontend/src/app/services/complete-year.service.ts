import { Injectable } from '@angular/core';
import {Class} from '../models/class';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompleteYearService {

  private _classes:BehaviorSubject<Class[]>;

  private dataStore:{
    classes:Class[]
  };

  get classes():Observable<Class[]>{
    return this._classes.asObservable();
  }

  constructor(private http:HttpClient) {
    this.dataStore={classes:[]};
    this._classes=new BehaviorSubject<Class[]>([]);
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
}
