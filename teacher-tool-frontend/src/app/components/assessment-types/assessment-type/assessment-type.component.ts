import {Component, Input, OnInit} from '@angular/core';
import {Assessment} from '../../../models/assessment';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog.component';
import {StudentService} from '../../../services/student.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AssessmentService} from '../../../services/assessment.service';

@Component({
  selector: 'app-assessment-type',
  templateUrl: './assessment-type.component.html',
  styleUrls: ['./assessment-type.component.scss']
})
export class AssessmentTypeComponent implements OnInit {

  @Input() assessment:Assessment;
  editedData:boolean;


  constructor(private assessmentService:AssessmentService,
              private dialog:MatDialog) { }

  ngOnInit() {
    this.assessmentService.editedData$.subscribe(
      (editedData: boolean)=>this.editedData=editedData
    );
  }

  removeAssessment() {
    let dialogRef=this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.message="Sind Sie sicher, dass Sie den Bewertungstyp "+this.assessment.name+" löschen wollen?";
    dialogRef.afterClosed().subscribe(result=>{
      if (result) {
        this.assessmentService.deleteAssessment(this.assessment);
      }
    });
  }
  dataEdited(){
    this.assessmentService.editedData.next(true);
  }
}
