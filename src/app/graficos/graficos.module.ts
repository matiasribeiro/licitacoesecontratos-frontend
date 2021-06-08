import { PizzaComponent } from './pizza/pizza.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinhaComponent } from './linha/linha.component';
import { ChartsModule } from 'ng2-charts';
import { CirculosComponent } from './circulos/circulos.component';
import { BarraComponent } from './barra/barra.component';
import { RadarComponent } from './radar/radar.component';




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
