import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav=new EventEmitter<void>();
  darkTheme_enabled:Observable<boolean>;

  constructor(public settingsService:SettingsService) { }

  ngOnInit() {
    this.darkTheme_enabled=this.settingsService.dark_theme;

  }

  toggleTheme():void{
    this.settingsService.toggleDarkTheme();
  }

  finishYear() {

  }
}
