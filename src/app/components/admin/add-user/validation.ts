import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function comparePassword(control1: FormControl): ValidatorFn {
  return (control2: AbstractControl): ValidationErrors | null => {
    const valor1 = control1.value;
    const valor2 = control2.value;
    if (valor1 == valor2) {
      return null;
    }
    return { validacion: 'Passwords do not match' };
  };
}
