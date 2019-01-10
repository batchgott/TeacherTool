import {AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {MatDrawer, MatSidenav} from "@angular/material";

const SMALL_WIDTH_BREAKPOINT=720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher:MediaQueryList=matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  users: Observable<User[]>;
  @ViewChild(MatDrawer) drawer:MatDrawer;
  isDarkTheme:boolean=false;
  direction:string="ltr";

  constructor(zone: NgZone,
              private userService:UserService,
              private router: Router) {
    this.mediaMatcher.addListener(mql =>
     // zone.run(() => this.mediaMatcher = mql));
     zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }
    ngOnInit() {
    this.users=this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(()=>{
      if (this.isScreenSmall())
        this.drawer.close();
    })
  }

  isScreenSmall():boolean {
    return this.mediaMatcher.matches;
  }

  toggleTheme(){
    this.isDarkTheme=!this.isDarkTheme;
  }

  toggleDirection() {
    this.direction=="ltr"?this.direction="rtl":this.direction="ltr";
  }
}
