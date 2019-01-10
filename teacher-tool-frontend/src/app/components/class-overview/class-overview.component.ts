import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClassService} from '../../services/class.service';
import {Class} from '../../models/class';

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
      if (!id) id=1;

      this.classService.classes.subscribe(classes=>{
        if (classes.length == 0) return;
        this.class=this.classService.classArrayById(id);
      });
    })
  }

}
