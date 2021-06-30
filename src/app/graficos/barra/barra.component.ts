import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ServicosService } from 'src/app/servicos.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css'],
  providers: [ ServicosService ]
})
export class BarraComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  @Input() dadosChartBar: any[] = [];

  alturaChart = (screen.width < 500) ? 500 : 70;

  displayDataLabel = (screen.width < 500) ? false: true;

  constructor() {

  }

  ngOnInit(): void {


  }

  public barChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    tooltips: {

      callbacks: {
        label: (tooltipItem, data) => {

          data.datasets
          return this.formatarMoeda(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])
        },


      },
    },

    scales: {
      xAxes: [
        {

        }
      ],
      yAxes: [
        {
          ticks: {
            callback: function(value, index, values) {
              return value.toLocaleString("pt-BR",{style:"currency", currency:"BRL"});
            },
            fontColor: 'RGBA(0,106,130,1)',
          }
        }]
    },
    plugins: {
      datalabels: {
        display: this.displayDataLabel,
        color: 'RGBA(0,106,130,1)',
        formatter: function (value, ctx) {
          return value.toLocaleString("pt-BR",{style:"currency", currency:"BRL"});
        },
        anchor: 'end',
        align: 'end',
      }
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: false,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public barChartLabels: Label[] = ['2017', '2018', '2019', '2020', '2021'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {

  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {

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


}
