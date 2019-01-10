import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDrawer} from '@angular/material';
import {Observable} from 'rxjs';
import {Class} from '../../models/class';
import {ClassService} from '../../services/class.service';

const SMALL_WIDTH_BREAKPOINT=720;
@Component({
  selector: 'app-classes-menu',
  templateUrl: './classes-menu.component.html',
  styleUrls: ['./classes-menu.component.scss']
})
export class ClassesMenuComponent implements OnInit {

  private mediaMatcher:MediaQueryList=matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  @ViewChild(MatDrawer) drawer:MatDrawer;
  classes:Observable<Class[]>;

  constructor(zone:NgZone,
              private router:Router,
              private classService: ClassService,
              private activatedRoute:ActivatedRoute) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }


  ngOnInit() {
    this.classes=this.classService.classes;
    this.classService.loadAll();
    this.router.events.subscribe(()=>{
      if (this.isScreenSmall())
        this.drawer.close();

    });
  }

  isScreenSmall():boolean {
    return this.mediaMatcher.matches;
  }

}
