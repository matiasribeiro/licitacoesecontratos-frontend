
import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ServicosService } from 'src/app/servicos.service';


@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css'],
  providers: [ ServicosService ]
})
export class PizzaComponent implements OnInit {


  @Input() titulo: string;



  @Input() pizzaOrgaoChartLabels: Label[] = [];
  @Input() pizzaOrgaoChartData: any[] = [];

  legend = (screen.width < 575) ? false : true;
  font = (screen.width < 1200) ? 10 : 12;


  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [ChartDataLabels];
  pieChartColors = [
    {
      backgroundColor:
      [
      'RGBA(80,170,247,0.7)',
      'RGBA(240,120,0,0.7)',
      'RGBA(46,40,148,0.92)',
      'RGBA(37,131,79,1)',
      'RGBA(159,217,53,0.4)',
      'RGBA(255,194,108,0.48)',
      'RGBA(255,141,255,0.49)',
      'RGBA(50,51,224,1)',
      'RGBA(233,232,92,1)',
      'RGBA(0,105,88,1)',
      'RGBA(183,255,255,1)',
      'RGBA(105,119,135,1)',
      'RGBA(182,76,79,1)',
      'RGBA(255,55,113,0.49)'
      ],
    },
  ];

  constructor(
    private servicos : ServicosService,
  ) {

  }


  ngOnInit(): void {

  }


  public pieChartOptions: ChartOptions = {

    responsive: true,
    spanGaps: false,

    legend: {

      position: 'left',
      align: "center",
      display: this.legend,
      labels: {
        fontSize: this.font,
        boxWidth: 10,
        usePointStyle: true
      }
    },

    tooltips: {

      callbacks: {
        label: (tooltipItem, data) => {
          return this.formatarMoeda(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])
        },
        beforeLabel : function(tooltipItem, data) {
          return  data.labels[tooltipItem.index]+'';
       },

      },
    },
    plugins: {

      boxHeight: 10,
      datalabels: {
        formatter: (value, ctx) => {
          let soma = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.forEach(element => {
            soma += element;
          });
          let porcentagem = (value*100 / soma).toFixed(2)+"%";
          return porcentagem;

          //return ctx.chart.data.labels[ctx.dataIndex];

        },
        color: '#000000',
      },
    }

  };


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

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels(): void {

  }

  addSlice(): void {
    // this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    // this.pieChartData.push(400);
    // this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice(): void {
    this.pizzaOrgaoChartLabels.pop();
    this.pizzaOrgaoChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

}
