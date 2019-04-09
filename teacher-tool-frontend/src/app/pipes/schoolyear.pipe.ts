import {Pipe, PipeTransform} from '@angular/core';
import {concat} from 'rxjs';

@Pipe({
  name: 'schoolyear'
})
export class SchoolyearPipe implements PipeTransform {

  transform(year: number): any {
    return String(year) + "/"+String(year+1).substring(2);
  }

}
