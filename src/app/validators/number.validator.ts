import { AbstractControl, ValidationErrors } from '@angular/forms'

export function numberValidator(control: AbstractControl): ValidationErrors | null {
    const value = +control.value;
    
    if (isNaN(value)) {
        return {'numberValidator' : true, 'requiredValue': 'Пожалуйста, введите только числа'}
    }

    if (value < 0) {
        return {'numberValidator' : true, 'requiredValue': 'Пожалуйста, введите положительные числа'}
    }

    if (value > 1000) {
        return {'numberValidator' : true, 'requiredValue': 'Число не должно быть больше 1000'}
    }

    return null;
}