import {Student} from './student';
import {Subject} from './subject';

export class YearCompleteClass{
  id:number;
  name:string;
  newname:string;
  level:number;
  max_level:number;
  schoolyear: number;
  archieved:boolean;
  subjects:{subject:Subject, attend:boolean}[];
  students:{student:Student, attend:boolean}[];
}
