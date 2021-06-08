import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { convertToObject } from 'typescript';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})
export class RadarComponent implements OnInit {

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };

  radarChartLabels: Label[] = ['913085855', '813085855', '713085855', '613085855', '513085855'];

  @Input() dadosChartRadarGoverno: any[] = [];


  public radarChartData: ChartDataSets[] = [
    { data: [1,,2,3], label: 'Governo do Estado da Paraíba'},
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Prefeitura de João Pessoa' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor() {

  }

  ngOnInit(): void {


   console.log(this.dadosChartRadarGoverno)





  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
