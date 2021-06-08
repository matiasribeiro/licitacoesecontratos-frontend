import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ServicosService } from 'src/app/servicos.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ ServicosService ]
})
export class ContratoComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  formulario: FormGroup;

  rows = [];
  tempDados = [];
  selected = [];
  SelectionType = SelectionType;
  columns: any;
  ColumnMode = ColumnMode;
  renderizacao_tela = false;

  _entidade_gov_pb = 1;
  _entidade_jp = 2;

  dadosChartBar: any[] = [];
  dadosbarrajp: any = [];
  dadosbarragov: any = [];

  constructor(
    private servicos : ServicosService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.columns = [
      { name: 'Número', prop: 'numeroContrato' },
      { name: 'Objetivo', prop:'objeto' }
    ];
  }

  ngOnInit(): void {


    this.dialog.open(DialogComponent,  {panelClass: 'myapp-no-padding-dialog'});


    this.servicos.getContratos()
    .subscribe(dados => {

       // cache our list
       this.tempDados = [...dados];

       // push our inital complete list
       this.rows = dados;
       this.renderizacao_tela = true;
       this.dialog.closeAll();
    });


    this.formulario = this.formBuilder.group({

      numeroBusca: ['', [
                            Validators.maxLength(15)
      ] ],
      assuntoBusca: ['', [
                            Validators.maxLength(100),
      ] ],

    })

    this.dadosChartBar = []
    this.dadosbarrajp = []
    this.servicos.getAnosVsValoresContratos(this._entidade_jp)
    .subscribe(dados => {

      const mapDados = dados.map((v, index, array) => {
        return v.valorTotal;
      })

      this.dadosbarrajp = {data: mapDados, label:'Prefeitura Municipal de João Pessoa'};

    })

    this.servicos.getAnosVsValoresContratos(this._entidade_gov_pb)
    .subscribe(dados => {

      const mapDados = dados.map((v, index, array) => {
        return v.valorTotal;
      })

      this.dadosChartBar = [ {data: mapDados, label:'Governo da Paraíba'}, this.dadosbarrajp ];

    })




  }



  updateFilterNumero() {

    this.formulario.markAllAsTouched(); // simular click para validar dados de entrado do usuário
    if(this.validarDadosFiltro(this.formulario.controls.numeroBusca.status)){
      const val = this.formulario.controls.numeroBusca.value;

      const temp = this.tempDados.filter(function (d) {
        if(d.numeroContrato === null){
          return
        } else {
          return d.numeroContrato.toLowerCase().indexOf(val) !== -1 || !val;
        }

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


  updateFilterObjeto() {

    this.formulario.markAllAsTouched();
    if(this.validarDadosFiltro(this.formulario.controls.assuntoBusca.status)){
      const val = this.formulario.controls.assuntoBusca.value.toLowerCase();
      const temp = this.tempDados.filter(function (d) {
        if(d.objeto === null){
          return
        } else{

          return d.objeto.toLowerCase().indexOf(val) !== -1 || !val;
        }
      });
      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  }


  formatarMoeda(moeda): any {

    /* alguns valores vem errado na casa de Bilhões do GOV, desconsidere esse valor no IF */
    if((moeda === '') || (moeda.length >= 16)){
      return '';
    }
    if((moeda != undefined)){
      const intl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
      moeda = intl.format(moeda);

    }
    return moeda;
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  get formGroup(){
    return this.formulario.controls;
  }



}
