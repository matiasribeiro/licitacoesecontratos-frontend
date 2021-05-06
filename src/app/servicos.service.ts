import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Licitacoes } from './modelos/licitacao';


@Injectable({
  providedIn: 'root'
})
export class ServicosService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  #url: string = 'https://apilicitacoesecontratos.herokuapp.com'
  url: string = "http://localhost:8080"

    constructor(
                private httpClient: HttpClient
    ) { }


    consultarLicitacoes(): Observable<any>{
      return this.httpClient.get<Licitacoes[]>( this.url + '/licitacoes');
    }



}
