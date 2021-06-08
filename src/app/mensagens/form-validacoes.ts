import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidacoes {



  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {

    const config = {
      'required': `${fieldName} é um campo obrigatório.`,
     // 'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      'minlength': `${fieldName}: valor inválido!.`,
     // 'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      'maxlength': `${fieldName}: valor inválido`,
      'cepInvalido': 'CEP inválido.',
      'emailInvalido': 'Email já cadastrado!',
      'equalsTo': `Campos ${fieldName} não são iguais`,
      'pattern': `${fieldName} inválido`,
      'email' : 'E-mail inválido'
    };

    return config[validatorName];
  }



}
