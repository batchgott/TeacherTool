import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MaterialModule} from "../shared/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Routes,RouterModule} from "@angular/router";
import {ContactmanagerAppComponent} from "./contactmanager-app.component";
import {UserService} from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {MatIconRegistry} from "@angular/material";
import { NotesComponent } from './components/notes/notes.component';
import {BrowserModule} from "@angular/platform-browser";
import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';

const routes: Routes=[
  {path: '',component:ContactmanagerAppComponent,
  children:[
    {path:':id',component: MainContentComponent},
    {path:'',component: MainContentComponent}
  ]},
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactmanagerAppComponent,ToolbarComponent, MainContentComponent, SidenavComponent, NotesComponent, NewContactDialogComponent],
  providers:[UserService,MatIconRegistry],
  entryComponents:[
    NewContactDialogComponent
  ]
})
export class ContactmanagerModule { }
