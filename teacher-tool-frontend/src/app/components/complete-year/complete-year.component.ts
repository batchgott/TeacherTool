import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ClassService} from '../../services/class.service';
import {Observable} from 'rxjs';
import {Class} from '../../models/class';
import {CompleteYearService} from '../../services/complete-year.service';

@Component({
  selector: 'app-complete-year',
  templateUrl: './complete-year.component.html',
  styleUrls: ['./complete-year.component.scss']
})
export class CompleteYearComponent implements OnInit {

  constructor(private completeYearService: CompleteYearService) { }
  groupedbyLevel: {classes: Class[], level:number }[]=[];
  ngOnInit() {
    this.completeYearService.classes.subscribe(classes => {
      if (classes.length == 0) {
        this.completeYearService.loadAll();
      }
      let maxLevel=0;
      for (let i=0; i<classes.length; i++)
      {
        if(classes[i].max_level>maxLevel)
        {
          maxLevel=classes[i].max_level;
        }
      }
      for(let i=0; i<maxLevel; i++)
      {
        let classofLevel=[];
        for (let y=0; y<classes.length; y++)
        {
          if(classes[y].max_level==i+1)
            classofLevel.push(classes[y]);
        }
        this.groupedbyLevel.push({level:i+1,classes: classofLevel });
      }
    });


  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
