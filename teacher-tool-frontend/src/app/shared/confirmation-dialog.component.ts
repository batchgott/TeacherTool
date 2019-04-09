import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h5 mat-dialog-title>{{message}}</h5>
    <div mat-dialog-actions style="{align-content: center}">
      <button mat-button [mat-dialog-close]="true">{{do}}</button>
      <button mat-button [mat-dialog-close]="false">{{doNot}}</button>
    </div>
  `,
})
export class ConfirmationDialogComponent implements OnInit {

  message:string;
  do:string;
  doNot:string;

  constructor() {
    this.do="Löschen";
    this.doNot="Abbrechen";
  }

  ngOnInit() {
  }

}
