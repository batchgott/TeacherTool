import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Class} from '../models/class';
import {HttpClient} from '@angular/common/http';
import {Assessment} from '../models/assessment';
import {Student} from '../models/student';
import {environment} from '../../environments/environment';
import {Subject} from '../models/subject';
import {SubjectService} from './subject.service';

@Injectable()
export class AssessmentService {

  private _assessments_normal:BehaviorSubject<Assessment[]>;
  private _assessments_participation:BehaviorSubject<Assessment[]>;
  editedData:BehaviorSubject<boolean>=new BehaviorSubject(false);
  editedData$=this.editedData.asObservable();
  participation_valence:BehaviorSubject<number>=new BehaviorSubject(0);
  participation_valence$=this.participation_valence.asObservable();
  overallValence:BehaviorSubject<number>=new BehaviorSubject(0);
  overallValence$=this.overallValence.asObservable();
  overallParticipationValence:BehaviorSubject<number>=new BehaviorSubject(0);
  overallParticipationValence$=this.overallParticipationValence.asObservable();

  private dataStore:{
    assessments_normal:Assessment[],
    assessments_participation:Assessment[]
  };
  
  constructor(private http:HttpClient,
              private subjectService:SubjectService) {
    this.dataStore={assessments_normal:[],assessments_participation:[]};
    this._assessments_normal=new BehaviorSubject<Assessment[]>([]);
    this._assessments_participation=new BehaviorSubject<Assessment[]>([]);
  }

  get assessments_normal():Observable<Assessment[]>{
    return this._assessments_normal.asObservable();
  }

  addToAssessments_normal(assessment:Assessment){
    this.dataStore.assessments_normal.push(assessment);
    this._assessments_normal.next(Object.assign({},this.dataStore).assessments_normal);
    this.calculateOverallValence();
  }

  addToAssessments_participation(assessment:Assessment){
    this.dataStore.assessments_participation.push(assessment);
    this._assessments_participation.next(Object.assign({},this.dataStore).assessments_participation);
    this.calculateOverallParticipationValence();
  }

  get assessments_participation():Observable<Assessment[]>{
    return this._assessments_participation.asObservable();
  }

  loadAssessmentsOfSubject_Normal(subject_id:number){
    return this.http.get<Assessment[]>(environment.apiURL+"/subject/"+subject_id+"/assessments?type=n").subscribe(
      data=>{
        this.dataStore.assessments_normal=data;
        this._assessments_normal.next(Object.assign({},this.dataStore).assessments_normal);
        this.calculateOverallValence();
        this.calculateOverallParticipationValence();
      },
      error=>{
        console.log("Failed to fetch assessments")
      }
    );
  }

  loadAssessmentsOfSubject_Participation(subject_id:number){
    return this.http.get<Assessment[]>(environment.apiURL+"/subject/"+subject_id+"/assessments?type=p").subscribe(
      data=>{
        this.dataStore.assessments_participation=data;
        this._assessments_participation.next(Object.assign({},this.dataStore).assessments_participation);
        this.calculateOverallValence();
        this.calculateOverallParticipationValence();
      },
      error=>{
        console.log("Failed to fetch assessments")
      }
    );
  }

  deleteAssessment(assessment: Assessment) {
    return this.http.delete(environment.apiURL+"/subjects_assessments/"+assessment.subject_id+"/"+assessment.assessment_id).subscribe(
      data=>{
        this.loadAssessmentsOfSubject_Participation(assessment.subject_id);
        this.loadAssessmentsOfSubject_Normal(assessment.subject_id);
      },
      error=>{
        console.log("Failed to fetch assessments")
      }
    );
  }

  editAssessments(subject:Subject) {
    subject.participation_valence=this.participation_valence.getValue();
    this.subjectService.updateSubject(subject);
    let assessments=this.dataStore.assessments_participation.concat(this.dataStore.assessments_normal);
    return this.http.put(environment.apiURL+"/subjects_assessments",assessments).subscribe(
      data=>{
        this.loadAssessmentsOfSubject_Participation(data[0].subject_id);
        this.loadAssessmentsOfSubject_Normal(data[0].subject_id);
        this.editedData.next(false);
      },
      error=>{
        console.log("Failed to update assessments")
      }
    );
  }

  calculateOverallValence(){
    let value:number=0;
    this.dataStore.assessments_normal.forEach((assessment:Assessment)=>value+=+assessment.scale_factor);
    value+=+this.participation_valence.getValue();
    this.overallValence.next(value);
  }

  calculateOverallParticipationValence(){
    let value:number=0;
    this.dataStore.assessments_participation.forEach((assessment:Assessment)=>value+=+assessment.scale_factor);
    this.overallParticipationValence.next(value);
  }
}
