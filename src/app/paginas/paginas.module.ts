import { ChartsModule } from 'ng2-charts';
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
import { GraficosModule } from '../graficos/graficos.module';


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
    ChartsModule,
    GraficosModule

  ],
  providers: [
    ServicosService,
    useHttpCacheLocalStorage

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PaginasModule { }

