import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from '../../services/class.service';
import {Class} from '../../models/class';
import {Subject} from '../../models/subject';

const SMALL_WIDTH_BREAKPOINT = 426;

@Component({
  selector: 'app-grading-key',
  templateUrl: './grading-key.component.html',
  styleUrls: ['./grading-key.component.scss']
})
export class GradingKeyComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  class:Class;
  subject:Subject;

  constructor(zone: NgZone,
              private route:ActivatedRoute,
              private classService:ClassService,
              private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }

  ngOnInit() {
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

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
