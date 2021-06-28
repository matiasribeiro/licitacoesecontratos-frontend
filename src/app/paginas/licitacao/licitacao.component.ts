import { element } from 'protractor';
import { DialogComponent } from './../dialog/dialog.component';
import { Contratos } from './../../modelos/contratos';
import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Chart, ChartDataSets } from 'chart.js';
import { Observable } from 'rxjs';
import { Color, Label } from 'ng2-charts';
import { ServicosService } from 'src/app/servicos.service';

@Component({
  selector: 'app-licitacao',
  templateUrl: './licitacao.component.html',
  styleUrls: ['./licitacao.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ ServicosService ]
})
export class LicitacaoComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns: any;
  ColumnMode = ColumnMode;

  renderizacao_tela = false;

  licitacoes$: Observable<any>;

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  rows = [];
  temp = [];
  selected = [];
  SelectionType = SelectionType;

  formulario: FormGroup;

  contratos: Contratos;

  @ViewChild('nameSummaryCell')
  nameSummaryCell: TemplateRef<any>;



  quantidadeLicitacaoGOV = '';
  quantidadeLicitacaoJP = '';

  somaLicitacaoGOV = '';
  somaLicitacaoJP = '';

  _governo_paraiba = 'Governo da Paraíba';
  _prefeitura_joao_pessoa = 'Prefeitura Municipal de João Pessoa';

  pizzaOrgaoChartLabels: Label[] = [];
  pizzaOrgaoChartData: any[] = [];

  pizzaOrgaoCovidChartLabels: Label[] = [];
  pizzaOrgaoCovidChartData: any[] = [];


  _entidade_gov_pb = 1;
  _entidade_jp = 2;

  dadosChartRadarGoverno: any = [];
  dadosjp: any = [];

  dadoslineChart: any = [];
  dadoslinhajp: any = [];

  constructor(
    private servicos : ServicosService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.columns = [
      { name: 'Número', prop: 'numero' },
      { name: 'Objetivo', prop:'objetivo' }
    ];
  }

  dadosbarraChart: any = [];


  ngOnInit() {



    this.dialog.open(DialogComponent,  {panelClass: 'myapp-no-padding-dialog'});


      this.servicos.getLicitacoes()
      .subscribe(dados => {
         // cache our list
         this.temp = [...dados];

         // push our inital complete list
         this.rows = dados;
         this.renderizacao_tela = true;
         this.dialog.closeAll();
      });

    this.formulario = this.formBuilder.group({

      numeroBusca: ['', [
                            Validators.maxLength(10),
      ] ],
      assuntoBusca: ['', [
                            Validators.maxLength(100),
      ] ],

    })

  // -------------------------------- Gráfico quantidade licitação ---------------------------------
  this.servicos.getlistarLicitacoesTotal()
  .subscribe(dados => {

    var quant_gov = 0;
    var quant_jp = 0;
    dados.forEach(element => {
      if(element.entidadeGovernamental === this._governo_paraiba){
        quant_gov = element.totalLicitacoes;
      }
      if(element.entidadeGovernamental === this._prefeitura_joao_pessoa){
        quant_jp = element.totalLicitacoes;
      }
    });
    this.quantidadeLicitacaoGOV = quant_gov.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
    this.quantidadeLicitacaoJP = quant_jp.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  });

  // -------------------------------- Gráfico valor licitação ---------------------------------
  this.servicos.getlistarLicitacoesSoma()
  .subscribe(dados => {

    var valores_gov = 0;
    var valores_jp = 0;
    dados.forEach(element => {
      if(element.entidadeGovernamental === this._governo_paraiba){
        valores_gov = element.valorTotal;
      }
      if(element.entidadeGovernamental === this._prefeitura_joao_pessoa){
        valores_jp = element.valorTotal;
      }
    });
    this.somaLicitacaoGOV = valores_gov.toLocaleString('de-DE', { maximumFractionDigits: 2 });
    this.somaLicitacaoJP = valores_jp.toLocaleString('de-DE', {  maximumFractionDigits: 2 });
  });



  // -------------------------------- Gráfico Linha ---------------------------------

      this.dadoslineChart = [];
      this.servicos.getAnosEntidadeGovernamentalValores()
      .subscribe(dados => {

        const mapGovValor = [];
        const mapJPValor = [];
        dados.forEach(element => {

          if(element.entidadeGovernamental === 'Governo da Paraíba'){
            mapGovValor.push(element.valorTotal)
          }
          else if(element.entidadeGovernamental === 'Prefeitura Municipal de João Pessoa'){
            mapJPValor.push(element.valorTotal)
          }

        });

        this.dadoslineChart = [ {data: mapGovValor, label: 'Governo do Estado da Paraíba'}, {data: mapJPValor, label: 'Prefeitura Municipal de João Pessoa' } ];
      })


    // -------------------------------- Gráfico Radar ---------------------------------
    this.servicos.getAnosVsValores(this._entidade_jp)
    .subscribe(dados => {

      const mapDados = dados.map((v, index, array) => {
        return v.valorTotal;
      })

      this.dadosjp = {data: mapDados, label:'JP'};

    })

    this.servicos.getAnosVsValores(this._entidade_gov_pb)
    .subscribe(dados => {

      const mapDados = dados.map((v, index, array) => {
        return v.valorTotal;
      })

      this.dadosChartRadarGoverno = [ {data: mapDados, label:'Gov'}, this.dadosjp ];

    })


    // -------------------------------- Gráfico de Pizza ---------------------------------
    this.servicos.getOrgaoVsValor()
    .subscribe(dados => {

      for (let index = 0; index < 5; index++) {
        this.pizzaOrgaoChartLabels.push(dados[index].nomeJuridicionado);
        this.pizzaOrgaoChartData.push(dados[index].valorTotal);
      }
    })

    this.servicos.getOrgaoVsValorCovid()
    .subscribe(dados => {

      for (let index = 0; index < dados.length; index++) {
        this.pizzaOrgaoCovidChartLabels.push(dados[index].nomeJuridicionado);
        this.pizzaOrgaoCovidChartData.push(dados[index].valorTotal);
      }
    })


  }

  updateFilterNumero() {

    this.formulario.markAllAsTouched();
    if(this.validarDadosFiltro(this.formulario.controls.numeroBusca.status)){
      const val = this.formulario.controls.numeroBusca.value.toLowerCase();
      const temp = this.temp.filter(function (d) {
        return d.numero.toLowerCase().indexOf(val) !== -1 || !val;
      });
      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }

  }

  validarDadosFiltro(dados){
    if(dados === 'VALID'){
      return true;
    } else{
      return false;
    }
  }


  updateFilterObjetivo() {

    this.formulario.markAllAsTouched();
    if(this.validarDadosFiltro(this.formulario.controls.assuntoBusca.status)){
      const val = this.formulario.controls.assuntoBusca.value.toLowerCase();
      const temp = this.temp.filter(function (d) {
        return d.objetivo.toLowerCase().indexOf(val) !== -1 || !val;
      });
      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  }


  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  formatarMoeda(moeda): any {

    if(moeda === ''){
      return '';
    }
    if((moeda != undefined)){
      const intl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
      moeda = intl.format(moeda);
    }
    return moeda;
  }


  get formGroup(){
    return this.formulario.controls;
  }


  onDetailToggle(event) {
  }






}

