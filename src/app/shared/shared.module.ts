
import { MensagensComponent } from '../mensagens/mensagens.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MensagensComponent

    ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    MensagensComponent,
    AppRoutingModule,
    NgbModule,
    RouterModule

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
