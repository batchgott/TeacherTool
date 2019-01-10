import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {User} from "../../models/user";
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  name = new FormControl('', [Validators.required, Validators.required]);
  avatars=[
    'svg-1','svg-2','svg-3','svg-4'
  ];
  user:User;
  startDate = new Date(1990, 0, 1);
  constructor(private dialogRef:MatDialogRef<NewContactDialogComponent>,
              private userService: UserService) { }

  ngOnInit() {
    this.user=new User();
  }

  save(){
    this.userService.addUser(this.user).then(user=>{
      this.dialogRef.close(user);
    });
  }

  dismiss(){
    this.dialogRef.close(null);
  }

  getErrorMessage() {
    if (this.name.hasError('required'))
    return  'You must enter a name';
    else console.log(this.name.errors);
  }
}
