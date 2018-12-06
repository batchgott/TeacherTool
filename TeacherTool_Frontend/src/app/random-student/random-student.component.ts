import {Component, Input, OnInit} from '@angular/core';
import {RandomStudentService} from './random-student.service';
import {Student} from './student';

@Component({
  selector: 'app-random-student',
  templateUrl: './random-student.component.html',
  styleUrls: ['./random-student.component.css']
})
export class RandomStudentComponent implements OnInit {
  @Input() name;
  students: Student[];

  constructor(public studentService: RandomStudentService) {
    studentService.getStudents().subscribe(students=>{
      this.students=students
    })
  }

  ngOnInit(): void {
  }

  getRandomStudent(){
    this.name= this.students[Math.floor(Math.random() * this.students.length)].getFullName();
  }

}

