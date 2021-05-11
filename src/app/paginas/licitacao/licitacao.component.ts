import { Licitacoes } from './../../modelos/licitacao';
import { DialogComponent } from './../dialog/dialog.component';
import { element } from 'protractor';
import { Contratos } from './../../modelos/contratos';
import { ServicosService } from './../../servicos.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { from, Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

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

  rows = [];
  temp = [];
  selected = [];
  SelectionType = SelectionType;

  formulario: FormGroup;

  contratos: Contratos;

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




  ngOnInit(): void {

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
  }

  openDialog() {


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

