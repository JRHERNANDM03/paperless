import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Rutas
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/login/index.component';
import { HomeComponent } from './viajero/home/home.component';

import { RouterModule } from '@angular/router';
import { MostrarViajeComponent } from './viajero/mostrar-viaje/mostrar-viaje.component';
import { MostrarGastoComponent } from './viajero/mostrar-gasto/mostrar-gasto.component';
import { DetallesGastoComponent } from './viajero/detalles-gasto/detalles-gasto.component';
import { RegistrarGastoComponent } from './viajero/registrar-gasto/registrar-gasto.component';
import { EditarGastoComponent } from './viajero/editar-gasto/editar-gasto.component';
import { NumeroViajeComponent } from './viajero/filtros/numero-viaje/numero-viaje.component';
import { FechaComponent } from './viajero/filtros/fecha/fecha.component';
import { EstadoComponent } from './viajero/filtros/estado/estado.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    MostrarViajeComponent,
    MostrarGastoComponent,
    DetallesGastoComponent,
    RegistrarGastoComponent,
    EditarGastoComponent,
    NumeroViajeComponent,
    FechaComponent,
    EstadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
