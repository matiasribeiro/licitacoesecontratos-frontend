import { ServicosService } from './../servicos.service';
import { LicitacaoComponent } from './licitacao/licitacao.component';
import { SharedcomponentModule } from '../sharedcomponent/sharedcomponent.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    LicitacaoComponent
  ],
  imports: [
    CommonModule,
    SharedcomponentModule
  ],
  providers: [ ServicosService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PaginasModule { }

