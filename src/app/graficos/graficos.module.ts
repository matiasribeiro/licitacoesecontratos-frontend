
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinhaComponent } from './linha/linha.component';
import { ChartsModule } from 'ng2-charts';
import { BarraComponent } from './barra/barra.component';
import { RadarComponent } from './radar/radar.component';
import { PizzaComponent } from './pizza/pizza.component';
import { CirculosComponent } from './circulos/circulos.component';


@NgModule({
  declarations: [PizzaComponent, LinhaComponent, CirculosComponent, BarraComponent, RadarComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    PizzaComponent,
    LinhaComponent,
    CirculosComponent,
    BarraComponent,
    RadarComponent
  ]
})
export class GraficosModule { }
