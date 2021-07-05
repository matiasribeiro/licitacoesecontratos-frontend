
import { LicitacaoComponent } from './paginas/licitacao/licitacao.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ContratoComponent } from './paginas/contrato/contrato.component';
import { SobreComponent } from './paginas/sobre/sobre.component';

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
  {
    path: 'sobre',
    component: SobreComponent
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
