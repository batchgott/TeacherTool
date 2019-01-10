import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClassService} from '../../services/class.service';
import {Class} from '../../models/class';
import get = Reflect.get;

@Component({
  selector: 'app-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.scss']
})
export class ClassOverviewComponent implements OnInit {

  class:Class;

  constructor(private route:ActivatedRoute,private classService:ClassService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      let id=+params['id'];
      let getFirst=false;
      if (!id) getFirst=true;

      this.classService.classes.subscribe(classes=>{
        if (classes.length == 0) return;
        if (getFirst)
          this.class=this.classService.classArrayById(0);
        else
          this.class=this.classService.classById(id);
      });
    })
  }

}
