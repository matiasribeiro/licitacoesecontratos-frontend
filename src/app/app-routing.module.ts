import { LicitacaoComponent } from './paginas/licitacao/licitacao.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ContratoComponent } from './paginas/contrato/contrato.component';

const routes: Routes = [
  {
    path: '',
    component: LicitacaoComponent
    },
  {
    path: 'licitacao',
    component: LicitacaoComponent
  },
  {
    path: 'contrato',
    component: ContratoComponent
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
