import { element } from 'protractor';
import { Contratos } from './../../modelos/contratos';
import { ServicosService } from './../../servicos.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  rows = [];
  temp = [];
  selected = [];
  SelectionType = SelectionType;

  formulario: FormGroup;

  contratos: Contratos;

  constructor(
    private servicos : ServicosService,
    private formBuilder: FormBuilder,
  ) {
    this.columns = [
      { name: 'Número', prop: 'numero' },
      { name: 'Objetivo', prop:'objetivo' }
    ];


  }


  myFunction(a,b,c){


    const teste = a.concat({a,b, c});
    console.log(teste)

  }
  ngOnInit(): void {

    this.servicos.consultarLicitacoes()
    .subscribe(dados => {

       // cache our list
       this.temp = [...dados];

       // push our inital complete list
       this.rows = dados;
    });

    this.formulario = this.formBuilder.group({

      numeroBusca: ['', [
                            Validators.maxLength(10),
      ] ],
      assuntoBusca: ['', [
                            Validators.maxLength(40),
      ] ],



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
