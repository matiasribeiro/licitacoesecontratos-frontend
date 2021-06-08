import { map } from 'rxjs/operators';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ServicosService } from 'src/app/servicos.service';

@Component({
  selector: 'app-circulos',
  templateUrl: './circulos.component.html',
  styleUrls: ['./circulos.component.css'],
  providers: [ ServicosService ]
})
export class CirculosComponent implements OnInit {

  doughnutChartLabels: Label[] = [];
  //doughnutChartData: MultiDataSet[] = []
  doughnutChartColors: Color[] = [{
    backgroundColor:
      [
      'red',
      'rgba(92, 184, 92,1)',
      'rgba(154, 184, 92,1)',
      'rgba(121, 184, 92,1)',
      'rgba(31, 184, 92,1)',
      'rgba(221, 184, 92,1)',
      'rgba(128, 184, 92,1)',
      'rgba(110, 184, 92,1)',
      'rgba(108, 184, 92,1)',
      'rgba(182, 184, 92,1)',
      'rgba(190, 184, 92,1)',
      'rgba(167, 184, 92,1)',
      'rgba(220, 184, 92,1)',
      'rgba(172, 184, 92,1)',
      'rgba(143, 184, 92,1)'
      ],
  }]

  public doughnutChartData: any[] = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private servicos : ServicosService,
  ) { }

  ngOnInit(): void {

    this.servicos.getOrgaoVsValor()
    .subscribe(dados => {

      // const linhas = Math.ceil(numero_elementos/colunas)
      // const index = Array.from(Array(numero_elementos).keys())

      let nomes = [];
      let valor = [];

      for (let i = 0; i < dados.length; i++) {
        nomes.push(dados[i].nomeJuridicionado)
        valor.push(dados[i].valorTotal)
      }




      this.doughnutChartLabels = nomes;
      const m = this.listToMatrix(dados, 4);

      var arr: number[] = []
      for (let i = 0; i < m.length; i++) {

        for (let j = 0; j < m[i].length; j++) {

          this.doughnutChartData.push([
            { data: m[i][j].valorTotal, label: m[i][j].nomeJuridicionado}
          ])
        }



        //this.doughnutChartData = [m[i]];
      }



      // let array2=[];

      // array2 = dados.map(function(item, keys) {
      //   //var mixarrayy = Object.keys(item).concat(Object.values(item));
      //   console.log(Object.keys(item.valorTotal).concat())

      // });

      //this.doughnutChartData = [[1,2,3]]




    })



  }



  listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }


}
