import { MensagensComponent } from './../mensagens/mensagens.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";


@NgModule({
  declarations: [ MensagensComponent ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    MensagensComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SharedcomponentModule { }
