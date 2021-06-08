import { SomaLicitacao } from './modelos/soma_licitacao';
import { HomologacaoValor } from './modelos/homologacao_valor';
import { OrgaoValor } from './modelos/orgao_valor';

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, of, ReplaySubject } from 'rxjs';
import { Licitacoes } from './modelos/licitacao';
import { withCache, CacheBucket, HttpCacheInterceptorModule } from '@ngneat/cashew';
import { map } from 'rxjs/operators';
import { Contratos } from './modelos/contratos';
import { QuantidadeLicitacao } from './modelos/quantidade_licitacao';
import { HomologacaoValorContrato } from './modelos/ano_valor_contrato';




const API_ENDPOINT = 'https://apilicitacoesecontratos.herokuapp.com';
/* const API_ENDPOINT = 'http://localhost:8080'; */



@Injectable({
  providedIn: 'root'
})
export class ServicosService {


  configs: Observable<any>;
  result: Observable<any>;

  todosBucket = new CacheBucket();


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

    constructor(
                private httpClient: HttpClient
    ) { }


    getLicitacoes(){
      return this.httpClient.get<Licitacoes[]>( API_ENDPOINT + '/licitacoes');
    }


    getContratos(){
      return this.httpClient.get<Contratos[]>( API_ENDPOINT + '/contratos' );
    }

    getOrgaoVsValor(){
      return this.httpClient.get<OrgaoValor[]>( API_ENDPOINT + '/licitacoes/orgaos' );
    }

    getOrgaoVsValorCovid(){
      return this.httpClient.get<OrgaoValor[]>( API_ENDPOINT + '/licitacoes/orgaos/covid' );
    }

    getAnosVsValores(id_entidade_governamental){
      return this.httpClient.get<HomologacaoValor[]>( API_ENDPOINT + '/licitacoes/'+id_entidade_governamental+'/anos' );
    }

    getAnosVsValoresContratos(id_entidade_governamental){
      return this.httpClient.get<HomologacaoValorContrato[]>( API_ENDPOINT + '/licitacoes/'+id_entidade_governamental+'/contratos/anos' );
    }

    getlistarLicitacoesTotal(){
      return this.httpClient.get<QuantidadeLicitacao[]>( API_ENDPOINT + '/licitacoes/total' );
    }

    getlistarLicitacoesSoma(){
      return this.httpClient.get<SomaLicitacao[]>( API_ENDPOINT + '/licitacoes/soma' );
    }
}
