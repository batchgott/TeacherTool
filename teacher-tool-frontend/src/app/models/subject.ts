import {Student} from './student';

export class Subject {
  id:number;
  name:string;
  first_semester_numerator:number;
  first_semester_denominator:number;
  class_id:number;
  participation_valence:number;
  students:Student[];
}
