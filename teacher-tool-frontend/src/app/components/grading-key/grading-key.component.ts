import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from '../../services/class.service';
import {Class} from '../../models/class';
import {Subject} from '../../models/subject';
import {SubjectService} from '../../services/subject.service';
import {AssessmentService} from '../../services/assessment.service';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog.component';
import {MatDialog} from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 426;

@Component({
  selector: 'app-grading-key',
  templateUrl: './grading-key.component.html',
  styleUrls: ['./grading-key.component.scss'],
  providers:[AssessmentService]
})
export class GradingKeyComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  class:Class;
  subject:Subject;
  editedData:boolean;
  overallValence:number;
  overallParticipationValance:number;

  constructor(zone: NgZone,
              private route:ActivatedRoute,
              private classService:ClassService,
              private router:Router,
              private subjectService:SubjectService,
              private assessmentService:AssessmentService,
              private dialog:MatDialog) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }

  ngOnInit() {
    this.assessmentService.editedData$.subscribe(editedData=>this.editedData=editedData);
    this.assessmentService.overallValence$.subscribe(overallValance=>this.overallValence=overallValance);
    this.assessmentService.overallParticipationValence$.subscribe(overallParticipationValance=>this.overallParticipationValance=overallParticipationValance);
    this.route.parent.params.subscribe(params => {
      let id = +params['id'];
      let subject_id = +params['subjectid'];
      this.classService.classes.subscribe(classes => {
        if (classes.length == 0) {
          this.classService.loadAll();
          return;
        }
        this.class = this.classService.classById(id);
        if (this.class == undefined) {
          return;
        }
        this.subject = this.class.subjects.find(x => x.id == subject_id);
      });
    });
  }

  changeNumerator(value){
    this.subject.first_semester_numerator=value;
    this.subjectService.updateSubject(this.subject);
  }

  changeDenominator(value){
    this.subject.first_semester_denominator=value;
    this.subjectService.updateSubject(this.subject);
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  goBack() {
    if (!this.editedData)
    this.router.navigate(['/class',this.class.id,'subject',this.subject.id]);
    else {
      let dialogRef=this.dialog.open(ConfirmationDialogComponent);
      dialogRef.componentInstance.message="Sind Sie sicher, dass Sie diesen Bereich ohne Speichern verlassen wollen?";
      dialogRef.componentInstance.do="Verlassen";
      dialogRef.afterClosed().subscribe(result=>{
        if (result) {
          this.router.navigate(['/class',this.class.id,'subject',this.subject.id]);
        }
      });
    }
  }

  save() {
    this.assessmentService.editAssessments(this.subject);
  }
}
