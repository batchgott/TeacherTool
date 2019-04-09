import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Class} from '../models/class';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Performance} from '../models/performance';
import {Student} from '../models/student';
import {ClassService} from './class.service';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  private _performances:BehaviorSubject<Performance[]>;

  private dataStore:{
    performances:Performance[]
  };

  constructor(private http:HttpClient,
              private classService:ClassService) {
    this.dataStore={performances:[]};
    this._performances=new BehaviorSubject<Performance[]>([]);
  }

  get performances():Observable<Performance[]>{
    return this._performances.asObservable();
  }

  performanceById(id:number):Performance{
    return this.dataStore.performances.find(x=>x.id==id);
  }

  loadAll(){
    return this.http.get<Performance[]>(environment.apiURL+"/performances").subscribe(
      data=>{
        this.dataStore.performances=data;
        this._performances.next(Object.assign({},this.dataStore).performances);
      },
      error=>{
        console.log("Failed to fetch performances")
      }
    );
  }
  addPerformance(performance: Performance){
    return new Promise((resolve, reject) => {
      this.http.post<Performance>(environment.apiURL + "/performance", performance)
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

  addRangeOfPerformances(performances:Performance[]) {
    return this.http.post<Performance[]>(environment.apiURL+"/performances",performances).subscribe(
      data=>{this.classService.loadAll()},
      error=>{
        console.log("Failed to add range of performance")
      }
    );
  }

  deletePerformance(id: number) {
    return this.http.delete(environment.apiURL+"/performance/"+id).subscribe(
      data=>{this.loadAll()},
      error=>{
        console.log("Failed to delete performance")
      }
    );
  }

  editPerformance(performance:Performance){
    return this.http.put(environment.apiURL+"/performance",performance).subscribe(
      data=>{this.loadAll()},
      error=>{
        console.log("Failed to edit performance")
      }
    );
  }
}
