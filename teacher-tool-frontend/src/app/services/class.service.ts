import { Injectable } from '@angular/core';
import {Class} from '../models/class';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private _classes:BehaviorSubject<Class[]>;

  private dataStore:{
    classes:Class[]
  };

  constructor(private http:HttpClient) {
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
  console.log("loaded all");
    return this.http.get<Class[]>(environment.apiURL+"/classes").subscribe(
      data=>{
        this.dataStore.classes=data;
        this._classes.next(Object.assign({},this.dataStore).classes);
      },
      error=>{
        console.log("Failed to fetch classes")
      }
    );
  }

  classArrayById(id: number):Class {
    return this.dataStore.classes[id];
  }
}
