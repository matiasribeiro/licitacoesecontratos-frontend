import { FormValidacoes } from './form-validacoes';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;


  constructor() { }
  ngOnInit() {}



    get errorMessage() {
      for (const propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {

            return FormValidacoes.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
          }
      }

      return null;
    }
}
