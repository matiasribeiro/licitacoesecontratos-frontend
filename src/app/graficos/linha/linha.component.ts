import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
//import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-linha',
  templateUrl: './linha.component.html',
  styleUrls: ['./linha.component.css']
})
export class LinhaComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  @Input() dadoslineChart: any[] = [];
  @Input() titulo: string;

  // altura do gráfico para renderizar melhor em tela de celular
  alturaChart = (screen.width < 500) ? 250 : 70;
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  public lineChartLabels: Label[] = ['2017', '2018', '2019', '2020', '2021'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    tooltips: {

      callbacks: {
        label: (tooltipItem, data) => {
          return this.formatarMoeda(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])
        },
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        gridLines: {
          color: 'RGBA(0,106,130,1)',
        },
        ticks: {
          fontColor: 'RGBA(0,106,130,1)'
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: 'RGBA(0,106,130,1)',
          },
          ticks: {
            callback: function(value, index, values) {
              return value.toLocaleString("pt-BR",{style:"currency", currency:"BRL"});
            },
            fontColor: 'RGBA(0,106,130,1)',
          }
        },

      ]
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
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // azul - Governo
      backgroundColor: 'RGBA(23,114,255,0.16)', // background transparencia
      borderColor: 'RGBA(0,26,255,1)', // cor da linha
      pointBackgroundColor: 'RGBA(0,26,255,1)',
      pointBorderColor: 'RGBA(0,26,255,1)',
      pointHoverBackgroundColor: 'RGBA(0,26,255,1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // vermelho - JP
      backgroundColor: 'RGBA(219,0,17,0.11)', // background transparencia
      borderColor: 'RGBA(185,0,17,1)', // cor da linha
      pointBackgroundColor: 'RGBA(185,0,17,1)',
      pointBorderColor: 'RGBA(185,0,17,1)',
      pointHoverBackgroundColor: 'RGBA(185,0,17,1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }


  public randomize(): void {
    for (let i = 0; i < this.dadoslineChart.length; i++) {
      for (let j = 0; j < this.dadoslineChart[i].data.length; j++) {
        this.dadoslineChart[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {

  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {

  }

  public hideOne(): void {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  // public pushOne(): void {
  //   this.dadoslineChart.forEach((x, i) => {
  //     const num = this.generateNumber(i);
  //     const data: number[] = x.data as number[];
  //     data.push(num);
  //   });
  //   this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  // }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  public changeColor(): void {

    this.lineChartColors[0].borderColor = 'RGBA(0,0,0,1)';
    this.lineChartColors[0].backgroundColor = 'rgba('+this.getRandomArbitrary(1,254)+','+this.getRandomArbitrary(1,254)+','+this.getRandomArbitrary(1,254)+', 0.3)';

    this.lineChartColors[1].borderColor = 'RGBA(255,111,0,1)';
    this.lineChartColors[1].backgroundColor = 'rgba('+this.getRandomArbitrary(1,254)+','+this.getRandomArbitrary(1,254)+','+this.getRandomArbitrary(1,254)+', 0.5)';

  }

  public changeLabel(): void {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
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
