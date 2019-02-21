import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondSemesterNumerator',
  pure:false
})
export class SecondSemesterNumeratorPipe implements PipeTransform {

  transform(first_semester_numerator: number, first_semester_denominator: number): number {
    return first_semester_denominator-first_semester_numerator;
  }

}
