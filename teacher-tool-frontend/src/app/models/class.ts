import {Subject} from './subject';
import {Student} from './student';

export class Class {

  id:number;
  name:string;
  level:number;
  max_level:number;
  schoolyear: number;
  archieved:boolean;
  subjects:Subject[];
}
