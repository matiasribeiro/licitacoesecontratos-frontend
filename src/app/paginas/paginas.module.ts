import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ServicosService } from './../servicos.service';
import { LicitacaoComponent } from './licitacao/licitacao.component';
import { SharedcomponentModule } from '../sharedcomponent/sharedcomponent.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    LicitacaoComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    SharedcomponentModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  providers: [ ServicosService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PaginasModule { }

