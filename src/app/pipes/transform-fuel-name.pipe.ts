import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformFuelName'
})
export class TransformFuelNamePipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'Уголь': 
        return 'угля'
      case 'Природный газ':
        return 'газа';
      default: 
        return '';
    }
  }

}
