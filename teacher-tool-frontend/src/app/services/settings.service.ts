import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Class} from '../models/class';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private dataStore:{dark_theme:boolean};

  private _dark_theme:BehaviorSubject<boolean>;

  constructor(private http:HttpClient) {
    this.dataStore={dark_theme:false};
    this._dark_theme=new BehaviorSubject<boolean>(false);
  }

  get dark_theme():Observable<boolean>{
    return this._dark_theme.asObservable();
  }

  loadSettings(){
    return this.http.get<boolean>(environment.apiURL+"/setting/dark_theme").subscribe(
      data=>{
        this.dataStore.dark_theme=data['dark_theme'];
        this._dark_theme.next(Object.assign({},this.dataStore).dark_theme);
      },
      error=>{
        console.log("Failed to fetch dark_theme")
      }
    );
  }

  toggleDarkTheme(){
    return this.http.put<boolean>(environment.apiURL+"/setting/dark_theme/toggle",{}).subscribe(
      data=>{
        this.dataStore.dark_theme=data['dark_theme'];
        this._dark_theme.next(Object.assign({},this.dataStore).dark_theme);
        console.log(this._dark_theme);
        console.log("toogled")
      },
      error=>{
        console.log("Failed to toggle Dark Theme")
      }
    )
  }
}
