import { HttpCacheInterceptorModule, useHttpCacheLocalStorage } from '@ngneat/cashew';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ServicosService } from './../servicos.service';
import { LicitacaoComponent } from './licitacao/licitacao.component';
import { SharedModule } from '../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DialogComponent } from './dialog/dialog.component';
import { ContratoComponent } from './contrato/contrato.component';
import { MenuComponent } from './menu/menu.component';

var cloneDeep = require('lodash.clonedeep');



@NgModule({
  declarations: [
    LicitacaoComponent,
    DialogComponent,
    ContratoComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressBarModule,
    MatDialogModule,
    HttpCacheInterceptorModule.forRoot({
      responseSerializer(body) {
        return cloneDeep(body);
      },
      localStorageKey: 'licitacoes',
      ttl: 86400000 //24h
    }),

  ],
  providers: [
    ServicosService,
    useHttpCacheLocalStorage

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PaginasModule { }

