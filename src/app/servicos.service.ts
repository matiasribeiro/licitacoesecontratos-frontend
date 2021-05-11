
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, of, ReplaySubject } from 'rxjs';
import { Licitacoes } from './modelos/licitacao';
import { withCache, CacheBucket, HttpCacheInterceptorModule } from '@ngneat/cashew';
import { map } from 'rxjs/operators';



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

      return this.httpClient.get<Licitacoes[]>( API_ENDPOINT + '/licitacoes', withCache() );
    }




}
